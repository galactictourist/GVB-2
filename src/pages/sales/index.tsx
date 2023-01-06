import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SaleList } from '~/components/SaleList/SaleList'
import { getMyCollections } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'
import Header from '../../components/Header'

const Profile: NextPage = () => {
  const dispatch = useDispatch()
  const { id } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (id) {
      dispatch(
        getMyCollections({
          ownerIds: id,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
          <SaleList></SaleList>
        </div>
      </div>
    </>
  )
}

export default Profile
