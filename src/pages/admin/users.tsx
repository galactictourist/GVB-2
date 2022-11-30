import { NextPage } from 'next'
import AdminContainer from '~/components/Admin/AdminContainer'

const users: NextPage = () => {
  return (
    <>
      <AdminContainer>
        <nav className="bg-white shadow"></nav>
        <div className="flex min-h-screen">
          <div>PLACEHOLDER FOR THE USERS PAGE</div>
        </div>
      </AdminContainer>
    </>
  )
}

export default users
