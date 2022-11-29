import { NextPage } from 'next'
import Header from '~/components/Header'

const home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tl from-n4gLightTeal to-white">
        <div className="flex justify-center p-48 text-4xl">ADMIN HOME</div>
      </div>
    </>
  )
}

export default home
