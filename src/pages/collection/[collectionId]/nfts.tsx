import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CollectionOverview from '~/components/Collection/CollectionOverview'
import Header from '~/components/Header'
import { RootState } from '~/redux/store'

const CollectionNfts: NextPage = () => {
  const router = useRouter()
  const collectionId = router.query.collectionId
  const { loading, myCollections } = useSelector((state: RootState) => state.collections)
  const collection = myCollections.filter((collection) => collection.id === collectionId)[0]

  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <CollectionOverview id={collection.id} />
      </div>
    </>
  )
}

export default CollectionNfts
