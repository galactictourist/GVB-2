import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { updateTopic } from '~/redux/slices/adminSlice'
import { getTopicById } from '~/redux/slices/topicsSlice'
import { RootState } from '~/redux/store'

const CreateCause: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const topicId = router.query.id

  const { loading, currentTopic } = useSelector((state: RootState) => state.topics)
  const { name } = currentTopic
  const [newName, setName] = useState(name)

  useEffect(() => {
    if (topicId) {
      dispatch(
        getTopicById({
          id: topicId,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setName(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const successMessage = () => {
    toast.success(`Collection ${newName} updated`, {
      position: 'bottom-center',
    })
  }

  const submitHandler = () => {
    dispatch(
      updateTopic({
        id: topicId,
        payload: {
          name: newName,
        },
      })
    )
    successMessage()
    router.push('/admin/causes')
  }

  return (
    <>
      <AdminContainer>
        {loading ? (
          <div>LOADING</div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Update cause</h1>
                <p className="mt-2 text-sm text-gray-700">Update an existing cause.</p>
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
                      value={newName}
                      onChange={(e) => setName(e.target.value)}
                      className="n4gForm h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={submitHandler}>
              <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                Update
              </div>
            </button>
          </div>
        )}
      </AdminContainer>
    </>
  )
}

export default CreateCause
