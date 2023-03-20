import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.nftId

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl"></div>
      <Footer />
    </>
  )
}

export default CollectionPage
