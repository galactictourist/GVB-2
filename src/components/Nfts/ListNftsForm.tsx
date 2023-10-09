import { useState } from 'react';
import { useAllCollections } from '~/hooks/useAllCollections';
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
  const [collectionId, setCollectionId] = useState<string>("")
  const [batches, setBatches] = useState<NftBatch[]>([])

  const selectCollectionId = (e: any) => {
    setCollectionId(e.target.value)
  }

  const updateBatch = (index: number, batch: NftBatch) => {
    const newBatches = [...batches];
    newBatches[index] = batch;
    setBatches(newBatches);
  }

  const csvHandler = (data: RawBatchData[]) => {
    // fetch all uploaded nfts data
    const newBatches = _batchDataProcessing(data);
    setBatches([...batches, ...newBatches]);
  }

  const _batchDataProcessing = (data: RawBatchData[]) => {
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
        price: d.price
      });

      return obj;
    }, {});

    return Object.keys(newBatchesObj).map(key => newBatchesObj[key]);
  }

  const generateCsvCallback = (): string => {
    const headers = "uuid,name,collection,cause,charity,percentage,rank,price";
    return headers;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">List Nfts</h1>
          <p className="mt-2 text-sm text-gray-700">List NFTs by batches associated with cause and charity</p>
        </div>
        <GenerateCsvButton dataCallback={generateCsvCallback} />
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
