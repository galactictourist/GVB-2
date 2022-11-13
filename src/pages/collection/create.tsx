import type { NextPage } from 'next'
import Head from 'next/head'
import NewCollection from '~/components/Collection/NewCollection'
import Header from '../../components/Header'

const CollectionCreate: NextPage = () => {
  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Create your own NFT collection" />
      </Head>

      <Header />
      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
        <NewCollection />
      </div>
    </>
  )
}

export default CollectionCreate
