import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import NftItem from '~/components/NftItem'
import { useCollection } from '~/hooks/useCollection'
import { useCollectionNfts } from '~/hooks/useCollectionNfts'

export default function CollectionPage() {
  const router = useRouter()
  const { collectionId } = router.query

  const { data: collection, isLoading: collectionLoading } = useCollection({
    id: collectionId as string,
  })
  const { data: nfts, isLoading } = useCollectionNfts({
    id: collectionId as string,
  })

  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {collectionLoading ? (
            <p className="py-4 text-center text-xl text-gray-900">Loading...</p>
          ) : (
            <>
              <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">
                {collection?.name}
              </h2>
              <h3 className="flex items-center justify-center text-gray-900">
                {collection?.description}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {isLoading && (
                  <p className="py-4 text-center text-xl text-gray-900">Loading NFTs...</p>
                )}

                {nfts && nfts.map((nft) => <NftItem nft={nft} key={nft.id} />)}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
