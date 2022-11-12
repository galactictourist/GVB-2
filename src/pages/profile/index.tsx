import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="p-20">PROFILE PAGE</div>
    </>
  )
}

export default Profile
