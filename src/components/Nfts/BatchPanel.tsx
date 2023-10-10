import { useEffect, useState } from 'react';
import { usePagination } from '~/hooks/usePagination';
import { maxDisplayedNfts } from '~/utils/constants';
import { SimplePagination } from '../Pagination/SimplePagination';
import NftPanel from './NftPanel';

export interface NftBatch {
  collection: string
  cause: string[]
  charity: string
  percentage: number
  nfts: BatchNftData[]
}

export interface BatchNftData {
  id: number
  name: string
  rank: number
  price: number
  src?: string
}

interface Props {
  index: number
  batch: NftBatch
  updateBatch: (index: number, batch: NftBatch) => void
}

const BatchPanel = ({ index, batch, updateBatch }: Props) => {
  const pagination = usePagination();
  const { pageSetter, limitSetter, totalSetter, changePage } = pagination;
  const { page, limit, total } = pagination;

  const [showNfts, setShowNfts] = useState(false);
  const [nfts, setNfts] = useState<BatchNftData[]>([]);
  const [count, setCount] = useState(0);

  const showNftsHandler = () => {
    setShowNfts(!showNfts);
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

  return (
    <div key={1} className='flex flex-col gap-5 h-50 w-100 p-3 mt-3 rounded-md border border-solid border-sky-500'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>Cause: {batch.cause}</div>
          <div className='flex items-center gap-1'>Charity:{batch.charity}</div>
          <div className='flex items-center gap-1'>Percent:
            <input className="w-20 rounded-md" type="number" value={batch.percentage} min="1" max="99" onChange={(e) => updateBatch(index, { ...batch, percentage: +e.target.value })} />
          </div>
        </div>
        <div className="flex gap-5">
          <button
            type="button" onClick={showNftsHandler}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            View NFTs List
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            List Batch
          </button>
        </div>

      </div>
      {showNfts && <div>
        <div className="text-md font-semibold mb-3">NFTs List</div>
        <div className="flex flex-wrap gap-2">
          {!batch.nfts.length && "No NFTs have been assigned to this batch yet."}
          {nfts.length > 0 && nfts.map((nft, i) => <NftPanel key={i} nft={nft} />)}
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
