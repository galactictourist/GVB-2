import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { NftItem } from '~/components/NftList'
import nfts from '../../content/meta.json'

const causes = [
  {
    name: 'Education',
    description:
      'The future of the world depends on the children of today, so investing in them is to take care of humanities future',
  },
  {
    name: 'Animals',
    description:
      'Many animals across the world are in danger, whether it is from direct human intervention or climate change. Lets help them',
  },
  {
    name: 'Environment',
    description:
      'We have only one earth, and it is our responsibility for our future grandchildren to take care of it',
  },
]

const Home: NextPage = () => {
  const showNfts = (cause: string) => {
    return nfts
      .filter((nft) => nft.cause === cause)
      .map((nft) => <NftItem key={nft.name} nft={nft} single={false} />)
  }

  return (
    <>
      <Head>
        <title>GivaBit NFT Marketplace</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {causes.map((cause) => (
          <>
            <h2 className="flex items-center justify-center p-4 text-4xl text-gray-900">
              {cause.name}
            </h2>
            <h3 className="flex items-center justify-center  text-gray-900">{cause.description}</h3>
            <div className="mt-8 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {showNfts(cause.name)}
            </div>
          </>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Home
