import { useEffect, useState } from 'react';
import { useAllCollections } from '~/hooks/useAllCollections';
import { useBatchesByCollection } from '~/hooks/useBatchesByCollection';
import { useChildCauses } from '~/hooks/useChildCauses';
import { userClient } from '~/pages/api/userClient.api';
import { BatchEntity } from '~/types/entity/batch.entity';
import { NftEntity } from '~/types/entity/nft.entity';
import DisabledButton from '../Core/DisabledButton';
import GenerateCsvButton from '../Core/GenerateCsvButton';
import UploadCsvButton from '../Core/UploadCsvButton';
import BatchPanel, { NftBatch } from './BatchPanel';

type RawBatchData = {
  id: number
  name: string
  collection: string
  cause: string
  batch: number
  rank: number
  price: number
}

const ListNftsForm = () => {
  const { data: collections, isLoading } = useAllCollections()
  const { data: batchList, isLoading: isBatchListLoading } = useBatchesByCollection(collections![0])
  const { data: childCauses, isLoading: isCausesLoading } = useChildCauses()
  const causes = childCauses?.reduce((arr: any, cause) => [...arr, ...cause.children], [])


  const [collectionId, setCollectionId] = useState<string>("")
  const [batches, setBatches] = useState<NftBatch[]>([])
  const [nfts, setNfts] = useState<NftEntity[]>([])

  const selectCollectionId = (e: any) => {
    setCollectionId(e.target.value)
    setBatches([])
    getNfts(e.target.value)
  }

  const updateBatch = (index: number, property: string, value: any) => {
    let newBatches = [...batches];
    newBatches[+index][property] = value;
    setBatches(newBatches);
  }

  const csvHandler = async (data: RawBatchData[]) => {
    const newBatches = await _batchDataProcessing(data);
    setBatches([...batches, ...newBatches]);
  }

  const _batchDataProcessing = async (data: RawBatchData[]) => {
    const { data: resp } = await userClient(process.env.NEXT_PUBLIC_API!).get(`/collections/${collectionId}/nfts`)

    const nfts = resp.data.reduce((obj: any, d: any) => {
      obj[d.id] = d;
      return obj;
    }, {})

    if (!isLoading) {
      const newBatchesObj = data.reduce((obj: any, d: any) => {
        if (!obj.hasOwnProperty(d.batch)) {
          const cause = causes?.find((c: any) => c.name === d.cause)
          obj[d.batch] = {
            collectionId,
            collection: d.collection,
            cause: [cause],
            nfts: [],
            percentage: 0
          }
        }

        obj[d.batch].nfts.push({
          id: d.id,
          name: d.name,
          rank: d.rank !== "" ? d.rank : 0,
          price: d.price !== "" ? d.price : 0,
          src: nfts[d.id]?.imageUrl ? nfts[d.id].imageUrl : "",
          type: nfts[d.id]?.type
        });

        return obj;
      }, {});

      return Object.keys(newBatchesObj).map(key => newBatchesObj[key]);
    }

    return [];
  }

  const generateCsvCallback = () => {
    if (collections) {
      const headers = "id,name,collection,cause,batch,rank,price";
      if (!isLoading) {
        const collection = collections?.find(collection => collection.id === collectionId);
        const cause = causes?.find((c: any) => c.id === collection?.topicId)

        let dataString = "";

        if (nfts.length > 0 && cause) {
          dataString = nfts.map(nft => {
            return `${nft.id},${nft.name},${collection?.name},${cause.name},,,`;
          }).join("\n");

        }
        return headers + "\n" + dataString;

      }

    }
    return "";
  }

  const getNfts = async (id: string) => {
    const { data: resp } = await userClient(process.env.NEXT_PUBLIC_API!.toString()).get(`/collections/${id}/nfts`)
    setNfts(resp.data);
  }

  const processBatchList = (batchList: BatchEntity[]) => {
    const collection = collections?.find((c: any) => c.id === collectionId);
    const cause = causes?.find((c: any) => c.id === collection?.topicId);
    return batchList.map(batch => ({
      cause: [cause],
      collection: collection?.name,
      collectionId: batch.collectionId,
      charityId: batch.charityId,
      percentage: batch.charityShare / 100,
      nfts: batch.nfts.map(nft => ({
        id: nft.nftId,
        name: nft.nft?.name,
        price: (+nft.price).toFixed(0),
        rank: 0,
        src: nft.nft?.imageUrl,
        type: nft.nft?.type
      }))
    }))
  }

  useEffect(() => {
    if (collections) {
      setCollectionId(collections[0].id)
      getNfts(collections[0].id)
    }
  }, [collections])

  useEffect(() => {
    if (!isLoading && !isBatchListLoading && !isCausesLoading) {
      const batches = processBatchList(batchList!);
      setBatches(batches)
    }
  }, [isLoading, isBatchListLoading, isCausesLoading])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">List Nfts</h1>
          <p className="mt-2 text-sm text-gray-700">List NFTs by batches associated with cause and charity</p>
        </div>
        {collections === undefined ? <DisabledButton buttonLabel="Generate List CSV Template" /> :
          <GenerateCsvButton dataCallback={generateCsvCallback} />}

      </div>
      <div className="mt-4">
        <p className="text-md font-semibold">Collections</p>
        <select className="n4gForm h-10 capitalize" onChange={selectCollectionId}>
          {collections &&
            collections.map((collection) => (
              <option label={collection.name} key={collection.id} value={collection.id} />
            ))}
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <p className="text-md font-semibold">NFTs Batches</p>
          <UploadCsvButton csvHandler={csvHandler} />
        </div>
        <div>
          {!batches.length && "No NFTs batches are associated with this collection."}
          {batches.length > 0 && collections && causes && batches.map((batch, i) => (
            <BatchPanel key={i} index={i} batch={batch} changeHandler={updateBatch} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListNftsForm
