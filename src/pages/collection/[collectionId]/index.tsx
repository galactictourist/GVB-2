import { DocumentPlusIcon, PencilIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import NftItem from '~/components/NftItem'
import { useCollection } from '~/hooks/useCollection'
import { useCollectionNfts } from '~/hooks/useCollectionNfts'
import { RootState } from '~/types'
import { getCauseBgColor, getCauseTextColor, getEtherscan, shortify } from '~/utils'

export default function CollectionPage() {
  const router = useRouter()
  const { collectionId } = router.query

  const { id: userId } = useSelector((state: RootState) => state.auth)

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
            collection && (
              <>
                <div className="relative flex justify-center">
                  <div className="max-w-[calc(100%-350px)]">
                    <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">
                      {collection.name}
                    </h2>
                    <h3 className="flex items-center justify-center text-center text-2xl text-gray-900">
                      {collection.description}
                    </h3>
                  </div>
                  <div className="absolute right-0 bottom-0">
                    <Link href={getEtherscan(collection.artistAddress)}>
                      <a target="_blank">
                        <div className="cursor-pointer py-2 text-center text-xl text-gray-900">
                          Artist:{' '}
                          <span className="text-n4gMediumTeal hover:text-gray-600">
                            {shortify(collection.artistAddress)}
                          </span>
                        </div>
                      </a>
                    </Link>
                    <Link href={`/cause/${collection.topic.parentId}`}>
                      <h2
                        className={`flex cursor-pointer justify-center rounded-3xl p-2 text-xl ${getCauseBgColor(
                          collection.cause
                        )}`}
                        style={{
                          color: getCauseTextColor(collection.cause),
                        }}
                      >
                        {collection.cause}
                      </h2>
                    </Link>
                  </div>
                </div>

                {collection.ownerId == userId && (
                  <div className="my-4 flex items-center justify-center gap-4">
                    {nfts?.length! > 0 && <Link href={`/collection/${collection.id}/edit`}>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-n4gMediumTeal px-4 py-2 text-n4gMediumTeal text-white "
                      >
                        <PencilIcon className="h-8 w-8" />
                        Edit
                      </button>
                    </Link>}
                    <Link href={`/collection/${collection.id}/add`}>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-n4gMediumTeal px-4 py-2 text-n4gMediumTeal text-white "
                      >
                        <DocumentPlusIcon className="h-8 w-8" />
                        Add
                      </button>
                    </Link>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {isLoading && (
                    <p className="py-4 text-center text-xl text-gray-900">Loading NFTs...</p>
                  )}

                  {nfts && nfts.map((nft) => <NftItem nft={nft} key={nft.id} />)}
                </div>
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
