import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { NftSingleItem } from '~/components/NftList'
import nfts from '../../../content/meta.json'

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
      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">{showNft()}</div>
      <Footer />
    </>
  )
}

export default CollectionPage
