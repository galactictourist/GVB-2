import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProfileOverview from '~/components/User/ProfileOverview'
import { RootState } from '~/types'
import Header from '../../components/Header'

const Profile: NextPage = () => {
  const router = useRouter()
  const { id } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!id) {
      router.push('/')
    }
  }, [id])

  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <ProfileOverview />
        <div className="border-t">
          <div className="flex items-center justify-between gap-4 py-4">
            <h2 className="text-2xl">My Nfts</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
