import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { useChildCauses } from '~/hooks/useChildCauses'
import { createCharity } from '~/redux/slices/adminSlice'
import { SubCauseTopicEntity } from '~/types/entity/topic.entity'

const CreateCharity: NextPage = () => {
  const { data: resp, isLoading } = useChildCauses()

  const dispatch = useDispatch()
  const router = useRouter()

  const [name, setName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [causeId, setCauseId] = useState<string>()
  const [causes, setCauses] = useState([])

  const successMessage = () => {
    toast.success('Charity created', {
      position: 'bottom-center',
    })
  }

  const submitHandler = (name: string) => {
    dispatch(
      createCharity({
        name
      })
    )
    router.push('/admin/charities')
    successMessage()
  }

  useEffect(() => {
    if (resp) {
      const causes = resp.reduce((arr: any, cause) => [...arr, ...cause.children], [])
      setCauses(causes)
      setCauseId(causes[0].id)
    }
  }, [resp])

  return (
    <>
      <AdminContainer>
        <div className="space-y-8">
          <div>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">New Charity</h1>
              <p className="mt-2 text-sm text-gray-700">
                Add a Charity that Givabit is going to partnered with.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="collection-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="n4gForm h-10"
                  />
                </div>
              </div>
              <div className="sm:col-span-6 md:col-span-4">
                <p className="text-md font-semibold">Causes</p>
                <select className="n4gForm h-10 capitalize" onChange={(e) => setCauseId(e.target.value)}>
                  {causes &&
                    causes.map((cause: SubCauseTopicEntity) => (
                      <option label={cause.name} key={cause.id} value={cause.id} />
                    ))}
                </select>
              </div>
              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Wallet Address
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="n4gForm h-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => submitHandler(name)}>
            <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              Create
            </div>
          </button>
        </div>
      </AdminContainer>
    </>
  )
}

export default CreateCharity
