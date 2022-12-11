import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollectionRow from '~/components/User/CollectionRow'
import ProfileOverview from '~/components/User/ProfileOverview'
import { getMyCollections } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'
import Header from '../../components/Header'

const collections = [
  {
    name: 'First collection',
    description: 'My first awesome collection',
    cause: 'Education',
    image: '/img/1.png',
  },
  {
    name: 'Second collection',
    description: 'The just as great second collection',
    cause: 'Education',
    image: '/img/2.png',
  },
]

const Profile: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useSelector((state: RootState) => state.auth)
  const { loading, myCollections } = useSelector((state: RootState) => state.collections)

  useEffect(() => {
    if (id) {
      dispatch(
        getMyCollections({
          ownerIds: id,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //console.log(myCollections)
  //console.log(id)

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
          <h2 className="py-4 text-2xl">Current collections</h2>
          {myCollections.map((collection) => (
            <CollectionRow
              id={collection.id}
              key={collection.id}
              name={collection.name}
              description={collection.description}
              cause="Cause A"
              image="/img/1.png"
            />
          ))}
        </div>
        {/* <div className="border-t">
          <h2 className="py-4 text-2xl">NFTs</h2>
          <UserNftList></UserNftList>
        </div> */}

        <div className="flex justify-end pr-2">
          <button
            className="flex h-10 w-24 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
            onClick={() => router.push('/collection/create')}
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile
