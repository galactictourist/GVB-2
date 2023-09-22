import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMyNfts } from '~/hooks/useMyNfts'
import { NftEntity } from '~/types/entity/nft.entity'
import { Loader } from '../Loader'
import NftItem from '../NftItem'

const MyNftsTab = () => {
  const [nfts, setNfts] = useState<NftEntity[]>()

  const limit = 12
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>()

  const { data: resp, isLoading } = useMyNfts(page, limit)

  const handleNext = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (resp) {
      if (nfts && page > 1) {
        setNfts([...nfts, ...resp.data])
      } else {
        setNfts(resp.data)
      }

      setTotal(resp.total)
    }
  }, [resp])

  return (
    <div className="relative pt-4 pb-8">
      {nfts && total && (
        <InfiniteScroll
          dataLength={nfts.length}
          next={handleNext}
          hasMore={nfts.length < total}
          loader={<Loader />}
        >
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {nfts.map((nft) => (
              <NftItem key={nft.id} nft={nft} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default MyNftsTab
