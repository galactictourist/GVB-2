import { FolderPlusIcon } from '@heroicons/react/24/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CollectionItem from '~/components/CollectionItem'
import { useMyCollections } from '~/hooks/useMyCollections'
import { RootState } from '~/types'
import Header from '../../components/Header'

const MyCollections: NextPage = () => {
  const router = useRouter()
  const { id } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!id) {
      router.push('/')
    }
  }, [id])

  const { data: collections } = useMyCollections(id)

  return (
    <>
      <Head>
        <title>GivaBit | My Collections </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <div className="">
          <div className="mb-8 flex items-center justify-between gap-4 py-4">
            <h2 className="text-2xl font-semibold">My collections</h2>
            <Link href={'/collection/create'}>
              <button className="flex h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                <FolderPlusIcon width={16} height={16} />
                Create
              </button>
            </Link>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {collections &&
              collections.map((collection) => (
                <CollectionItem
                  id={collection.id}
                  key={collection.id}
                  name={collection.name}
                  cause={collection.topicId}
                  image={collection.imageUrl}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCollections
