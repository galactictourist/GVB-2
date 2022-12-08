import { NextPage } from 'next'
import AdminContainer from '~/components/Admin/AdminContainer'

const Home: NextPage = () => {
  return (
    <>
      <AdminContainer>
        <nav className="bg-white shadow"></nav>
        <div className="flex min-h-screen">
          <div>PLACEHOLDER FOR THE DASHBOARD</div>
        </div>
      </AdminContainer>
    </>
  )
}

export default Home
