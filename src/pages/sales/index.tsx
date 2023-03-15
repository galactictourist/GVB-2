import type { NextPage } from 'next'
import Head from 'next/head'
import { SaleList } from '~/components/SaleList/SaleList'
import Header from '../../components/Header'

const Sales: NextPage = () => {
  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <div className="border-t">
          <h2 className="py-4 text-2xl">Sales</h2>
          <SaleList />
        </div>
      </div>
    </>
  )
}

export default Sales
