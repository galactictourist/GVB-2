import { useEffect, useState } from 'react';
import { useAllCollections } from '~/hooks/useAllCollections';
import { useChildCauses } from '~/hooks/useChildCauses';
import { userClient } from '~/pages/api/userClient.api';
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
  charity: string
  percentage: number
  rank: number
  price: number
}

const ListNftsForm = () => {
  const { data: collections, isLoading } = useAllCollections()
  const { data: causes, isLoading: isCausesLoading } = useChildCauses()

  const [collectionId, setCollectionId] = useState<string>("")
  const [batches, setBatches] = useState<NftBatch[]>([])
  const [nfts, setNfts] = useState<NftEntity[]>([])

  const selectCollectionId = (e: any) => {
    setCollectionId(e.target.value)
    setBatches([])
    getNfts(e.target.value)
  }

  const updateBatch = (index: number, batch: NftBatch) => {
    const newBatches = [...batches];
    newBatches[index] = batch;
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
        if (!obj.hasOwnProperty(d.charity)) {
          obj[d.charity] = {
            collection: d.collection,
            cause: [d.cause],
            charity: d.charity,
            percentage: d.percentage,
            nfts: []
          }
        }

        obj[d.charity].nfts.push({
          id: d.id,
          name: d.name,
          rank: d.rank,
          price: d.price,
          src: nfts[d.id].imageUrl,
          type: nfts[d.id].type
        });

        return obj;
      }, {});

      return Object.keys(newBatchesObj).map(key => newBatchesObj[key]);
    }

    return [];
  }

  const generateCsvCallback = () => {
    if (collections) {
      const headers = "id,name,collection,cause,charity,percentage,rank,price";
      if (!isLoading) {
        const collection = collections?.find(collection => collection.id === collectionId);
        const cause: any = causes?.reduce((obj, cause) => {
          const child = cause.children.find(x => x.id === collection?.topicId);
          if (child) {
            return child
          }
          return obj
        }, {})

        const dataString = nfts.map(nft => `${nft.id},${nft.name},${collection?.name},${cause.name},,,,`).join("\n");
        return headers + "\n" + dataString;
      }

    }
    return "";
  }

  const getNfts = async (id: string) => {
    const { data: resp } = await userClient(process.env.NEXT_PUBLIC_API!.toString()).get(`/collections/${id}/nfts`)
    setNfts(resp.data);
  }

  useEffect(() => {
    if (collections) {
      setCollectionId(collections[0].id)
      getNfts(collections[0].id)
    }
  }, [collections])

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
          {batches.length > 0 && batches.map((batch, i) => (
            <BatchPanel key={i} index={i} batch={batch} updateBatch={updateBatch} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListNftsForm
