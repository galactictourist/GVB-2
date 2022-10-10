import type { NextPage } from 'next'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header></Header>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  )
}

export default Home
