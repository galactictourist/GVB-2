import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { getTopics } from '~/redux/slices/topicsSlice'
import { RootState } from '~/redux/store'

const Causes: NextPage = () => {
  const dispatch = useDispatch()
  const { loading, allTopics } = useSelector((state: RootState) => state.topics)
  //console.log(allTopics)
  //console.log(loading)

  useEffect(() => {
    dispatch(getTopics())
  }, [dispatch])

  return (
    <>
      <AdminContainer>
        {loading ? (
          <div>LOADING</div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Causes</h1>
                <p className="mt-2 text-sm text-gray-700">
                  The list of causes are currently on master level, which mean that no subtopics
                  will be displayed at this point.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href={'/admin/createCause'}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Create cause
                  </button>
                </Link>
              </div>
            </div>
            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-gray-000 hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                    >
                      createdAt
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      updatedAt
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      parentId
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allTopics.map((topic) => (
                    <tr key={topic.name}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {topic.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">createdAt</dt>
                          <dd className="mt-1 truncate text-gray-700">{topic.createdAt}</dd>
                          <dt className="sr-only sm:hidden">updatedAt</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {topic.updatedAt}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {topic.createdAt}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {topic.updatedAt}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">{topic.parentId}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {topic.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </AdminContainer>
    </>
  )
}

export default Causes
