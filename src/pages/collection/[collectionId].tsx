import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import nfts from '../../../content/meta.json'
import { NftItem } from '~/components/NftList'
import Head from 'next/head'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  const collection = router.query.collectionId

  const showNfts = () => {
    return nfts
      .filter((nft) => nft.collection === collection)
      .map((nft) => <NftItem key={nft.name} nft={nft} single={true} />)
  }

  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <>
            <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">
              {collection}
            </h2>
            <h3 className="flex items-center justify-center  text-gray-900">
              These are all NFTs belonging to the {collection}. Please consider purchasing one of
              them to support a good cause. For more information about the respective NTF, please
              click on it.
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

export default CollectionPage
