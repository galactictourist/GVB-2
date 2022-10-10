import type { NextPage } from 'next'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ItemGrid } from '../components/ItemGrid'
import { Partner } from '../components/Partner'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ItemGrid />
      <Partner />
      <Footer />
    </>
  )
}

export default Home
