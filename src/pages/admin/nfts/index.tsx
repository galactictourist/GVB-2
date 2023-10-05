import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import AdminContainer from '~/components/Admin/AdminContainer'
import ListNftsForm from '~/components/Nfts/ListNftsForm'
import NftTabNavigation from '~/components/Nfts/NftTabNavigation'
import UploadNftsForm from '~/components/Nfts/UploadNftsForm'

const Nfts: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabHandler = (tabIndex: number) => {
    setActiveTab(tabIndex);
  }

  return (
    <>
      <Head>
        <title>GivaBit | Admin | Nfts </title>
        <meta name="description" content="Show NFTs" />
      </Head>
      <AdminContainer>
        <NftTabNavigation activeTab={activeTab} setActiveTab={tabHandler} />
        {activeTab === 0 && <UploadNftsForm />}
        {activeTab === 1 && <ListNftsForm />}
      </AdminContainer >
    </>
  )
}

export default Nfts
