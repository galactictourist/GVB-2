import { NftItem } from '~/components/NftList'
import nfts from '../../../content/meta.json'

interface Props {
  cause: string
}

const NftList = ({ cause }: Props) => {
  const showNfts = (cause: string) => {
    return nfts
      .filter((nft) => nft.cause === cause)
      .map((nft) => <NftItem key={nft.name} nft={nft} single={false} />)
  }

  return (
    <>
      <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">{cause}</h2>
      {/* <h3 className="flex items-center justify-center  text-gray-900">{cause.description}</h3> */}
      <div className="mt-4 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {showNfts(cause)}
      </div>
    </>
  )
}

export default NftList
