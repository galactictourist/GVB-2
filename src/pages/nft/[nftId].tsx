import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import nfts from '../../../content/meta.json'
import { NftSingleItem } from '~/components/NftList'
import { useEffect } from 'react'
import Image from 'next/image'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.nftId

  const showNft = () => {
    return nfts
      .filter((nft) => nft.name === id)
      .map((nft) => <NftSingleItem key={nft.name} nft={nft} />)
  }

  return (
    <>
      <Header />
      <div className="">{showNft()}</div>
      <Footer />
    </>
  )
}

export default CollectionPage
