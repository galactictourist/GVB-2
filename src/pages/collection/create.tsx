import Head from 'next/head'
import Header from '../../components/Header'
import NewCollection from '~/components/Collection/NewCollection'
import type { NextPage } from 'next'

const CollectionCreate: NextPage = () => {
  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Create your own NFT collection" />
      </Head>

      <Header />
      <div className="px-10 sm:px-24 md:px-56">
        <NewCollection />
      </div>
    </>
  )
}

export default CollectionCreate
