import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CollectionRow from '~/components/Profile/CollectionRow'
import ProfileOverview from '~/components/Profile/ProfileOverview'
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
  const router = useRouter()

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
          {collections.map((collection) => (
            <CollectionRow
              key={collection.name}
              name={collection.name}
              description={collection.description}
              cause={collection.cause}
              image={collection.image}
            />
          ))}
        </div>
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
