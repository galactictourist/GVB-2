import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { createTopic } from '~/redux/slices/adminSlice'
import { RootState } from '~/redux/store'

const CreateCause: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState('')

  const { loading, allTopics } = useSelector((state: RootState) => state.topics)

  const successMessage = () => {
    toast.success('Collection created', {
      position: 'bottom-center',
    })
  }

  const submitHandler = () => {
    dispatch(
      createTopic({
        name: name,
      })
    )
    router.push('/admin/causes')
    console.log('SUBMITHANDLER')
    successMessage()
  }

  return (
    <>
      <AdminContainer>
        <div className="space-y-8">
          <div>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Causes</h1>
              <p className="mt-2 text-sm text-gray-700">
                The list of causes are currently on master level, which mean that no subtopics will
                be created or displayed to the users at this point.
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
            </div>
          </div>
          <button onClick={submitHandler}>
            <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              Create
            </div>
          </button>
        </div>
      </AdminContainer>
    </>
  )
}

export default CreateCause
