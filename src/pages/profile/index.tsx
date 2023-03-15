import { FolderPlusIcon } from '@heroicons/react/24/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CollectionRow from '~/components/User/CollectionRow'
import ProfileOverview from '~/components/User/ProfileOverview'
import { useMyCollections } from '~/hooks/useMyCollections'
import { RootState } from '~/types'
import Header from '../../components/Header'

const Profile: NextPage = () => {
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
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <ProfileOverview />
        <div className="border-t">
          <div className="flex items-center justify-between gap-4 py-4">
            <h2 className="text-2xl">Current collections</h2>
            <Link href={'/collection/create'}>
              <button className="flex h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                <FolderPlusIcon width={16} height={16} />
                Create
              </button>
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4">
            {collections &&
              collections.map((collection) => (
                <CollectionRow
                  id={collection.id}
                  key={collection.id}
                  name={collection.name}
                  description={collection.description}
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

export default Profile
