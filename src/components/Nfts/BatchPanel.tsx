import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useListNftBatch } from '~/hooks/useListNftBatch';
import { usePagination } from '~/hooks/usePagination';
import { givabitApi } from '~/services/givabit/api';
import { CharityTopicEntity } from '~/types/entity/charity-topic.entity';
import { maxDisplayedNfts } from '~/utils/constants';
import { SimplePagination } from '../Pagination/SimplePagination';
import NftPanel from './NftPanel';

export interface NftBatch { [key: string]: any; }

export interface BatchNftData {
  id: number
  name: string
  rank: number
  price: number
  src?: string
  type: string
}

interface Props {
  index: number
  batch: NftBatch,
  charityTopics: CharityTopicEntity[],
  changeHandler: (index: number, property: string, value: any) => void
}

const BatchPanel = ({ index, batch, charityTopics, changeHandler }: Props) => {
  const { listNftBatch, isListOpen, signedData, address, signer, serverSignature, saleData, setListOpen } = useListNftBatch();

  const pagination = usePagination();
  const { pageSetter, limitSetter, totalSetter, changePage } = pagination;
  const { page, limit, total } = pagination;

  const [showNfts, setShowNfts] = useState(false);
  const [nfts, setNfts] = useState<BatchNftData[]>([]);
  const [count, setCount] = useState(0);
  const [charityId, setCharityId] = useState(batch.charityId !== undefined ? batch.charityId : "");
  const showNftsHandler = () => {
    setShowNfts(!showNfts);
  }

  const listBatchHandler = async () => {
    const listBatchData = {
      collectionId: batch.collectionId,
      charityId: charityId,
      charityShare: batch.percentage,
      nfts: batch.nfts.filter((nft: any) => nft.price > 0)
    }

    await listNftBatch(listBatchData);
  }

  const nftChangeHandler = (nftIndex: number, property: string, value: string) => {
    const batchNftIndex = ((page - 1) * maxDisplayedNfts) + nftIndex;
    let updatedNfts = batch.nfts;
    updatedNfts[batchNftIndex][property] = property !== "name" ? +(isNaN(+value) ? 0 : +value) : value;
    changeHandler(index, "nfts", updatedNfts)
  }

  const pageHandler = (newPage: number) => {
    const end = newPage * maxDisplayedNfts;
    const start = end - maxDisplayedNfts;
    setNfts(batch.nfts.slice(start, end))
    pageSetter(newPage)
    changePage(newPage);
  }

  const _loadInitialPage = () => {
    const defaultPage = 1;
    setCount(defaultPage * maxDisplayedNfts);
    limitSetter(maxDisplayedNfts)
    totalSetter(batch.nfts.length)
    pageHandler(1);
  }

  useEffect(() => {
    _loadInitialPage();
  }, [])

  useEffect(() => {
    if (signedData && serverSignature && saleData) {
      givabitApi
        .createBatchSale({
          clientSignature: signedData,
          serverSignature,
          saleData,
        })
        .then((ret) => {
          toast.success('List nft successed.')
          // loadNft()
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message ?? 'List nft failed.')
        })
    }
  }, [signedData, serverSignature, saleData])

  return (
    <div key={1} className='flex flex-col gap-5 h-50 w-100 p-3 mt-3 rounded-md border border-solid border-sky-500'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>Cause: {batch.cause[0]?.name}</div>
          <div>
            <select className="n4gForm h-10 capitalize" value={charityId} onChange={(e) => setCharityId(e.target.value)}>
              <option label="Select Charity" key="" />
              {charityTopics?.map((charityTopic) => (
                <option label={charityTopic.name} key={charityTopic.id} value={charityTopic.id} />
              ))}
            </select>
          </div>
          <div className='flex items-center gap-1'>Percent:
            <input className="w-20 rounded-md" type="number" value={batch.percentage} max="99" onChange={(e) => changeHandler(index, "percentage", e.target.value)} />
          </div>
        </div>
        <div className="flex gap-5">
          <button
            type="button" onClick={showNftsHandler}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            View NFTs List
          </button>
          {!batch.isListed && <button onClick={listBatchHandler}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            List Batch
          </button>}
        </div>

      </div>
      {showNfts && <div>
        <div className="text-md font-semibold mb-3">NFTs List</div>
        <div className="flex flex-wrap gap-2">
          {!batch.nfts.length && "No NFTs have been assigned to this batch yet."}
          {nfts.length > 0 && nfts.map((nft, i) => <NftPanel key={i} index={i} nft={nft} changeHandler={nftChangeHandler} />)}
        </div>
        <SimplePagination
          page={page}
          count={count}
          limit={limit}
          total={total}
          pageSelect={pageHandler}
        />
      </div>}
    </div>
  )
}

export default BatchPanel
