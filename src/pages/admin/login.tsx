import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Header from '~/components/Header'
import { login } from '~/redux/slices/adminSlice'
import { RootState } from '~/redux/store'

const cookiesList: string[] = [
  'user_snmjwt',
  'user_givabit_wallet',
  'user_givabit_id',
  'admin_snmjwt'
];

const AdminLogin: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const dispatch = useDispatch()
  const { id, error, loading } = useSelector((state: RootState) => state.admin)

  const infoMessage = () => {
    toast.success('Trying to log in', {
      position: 'bottom-center',
    })
  }

  const successMessage = () => {
    toast.success(`Welcome ${id}`, {
      position: 'bottom-center',
    })
  }

  const errorMessage = () => {
    toast.error(`Error ${error}`, {
      position: 'bottom-center',
    })
  }

  const submitHandler = (e: any) => {
    dispatch(
      login({
        username: username,
        password: password,
      })
    )
  }

  useEffect(() => {
    if (loading) infoMessage()
    if (id && !loading) {
      successMessage()
      router.push('/admin/home')
    }
    if (error) errorMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, error, loading])

  useEffect(() => {
    cookiesList.forEach(cookie => Cookies.remove(cookie));
  }, []);

  return (
    <>
      <Header />

      <div className="flex min-h-screen flex-col justify-center bg-gradient-to-tl from-n4gLightTeal to-white py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
