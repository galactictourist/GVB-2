import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { getAllCollections } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'

// const placeholder = [
//   {
//     name: 'My first collection',
//     description: 'Animals',
//     status: 'PUBLISHED',
//     ownerId: 'John Doe',
//   },
//   {
//     name: 'Another collection',
//     description: 'Environment',
//     status: '100',
//     ownerId: 'Jane Doe',
//   },
//   // More people...
// ]

const Collections: NextPage = () => {
  const dispatch = useDispatch()
  const { loading, allCollections } = useSelector((state: RootState) => state.collections)

  useEffect(() => {
    dispatch(getAllCollections())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AdminContainer>
        {loading ? (
          <div>LOADING</div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Collections</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all collections and including their ownerIds and name.
                </p>
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
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Creator
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allCollections.map((collection) => (
                    <tr key={collection.id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {collection.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Description</dt>
                          <dd className="mt-1 truncate text-gray-700">{collection.description}</dd>
                          <dt className="sr-only sm:hidden">Status</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {collection.name}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {collection.description}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {collection.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">{collection.ownerId}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Details<span className="sr-only">, {collection.name}</span>
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

export default Collections
