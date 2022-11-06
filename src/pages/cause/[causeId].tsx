import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import nfts from '../../../content/meta.json'
import { NftItem } from '~/components/NftList'

const CausePage: NextPage = () => {
  const router = useRouter()
  const cause = router.query.causeId

  const showNfts = () => {
    return nfts
      .filter((nft) => nft.cause === cause)
      .map((nft) => <NftItem key={nft.name} nft={nft} single={false} />)
  }

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <>
            <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">{cause}</h2>
            <h3 className="flex items-center justify-center  text-gray-900">
              These are all NFT collections belonging to {cause}. Please click on any of them for
              additional information.
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {showNfts()}
            </div>
          </>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CausePage
