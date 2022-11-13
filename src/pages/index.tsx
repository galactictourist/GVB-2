import type { NextPage } from 'next'
import Head from 'next/head'
import NftList from '~/components/NftList/NftList'
import Footer from '../components/Footer'
import Header from '../components/Header'

const causes = [
  {
    id: '1',
    name: 'Education',
    description:
      'The future of the world depends on the children of today, so investing in them is to take care of humanities future',
  },
  {
    id: '2',
    name: 'Animals',
    description:
      'Many animals across the world are in danger, whether it is from direct human intervention or climate change. Lets help them',
  },
  {
    id: '3',
    name: 'Environment',
    description:
      'We have only one earth, and it is our responsibility for our future grandchildren to take care of it',
  },
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GivaBit NFT Marketplace</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header />
      <div className="bg-gradient-to-tl from-n4gLightTeal to-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {causes.map((cause) => (
            <NftList key={cause.id} cause={cause.name} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
