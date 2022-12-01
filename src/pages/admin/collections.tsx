import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminContainer from '~/components/Admin/AdminContainer'
import { getCollections } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'

const placeholder = [
  {
    name: 'My first collection',
    cause: 'Animals',
    nfts: '50',
    creator: 'John Doe',
  },
  {
    name: 'Another collection',
    cause: 'Environment',
    nfts: '100',
    creator: 'Jane Doe',
  },
  // More people...
]

const Collections: NextPage = () => {
  //const router = useRouter()

  const dispatch = useDispatch()
  const { loading, allCollections } = useSelector((state: RootState) => state.collections)
  console.log(loading)
  console.log(allCollections)

  useEffect(() => {
    dispatch(getCollections())
    //console.log(password)
  }, [])

  return (
    <>
      <AdminContainer>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Collections</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all collections and including their creators and NFTs.
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
                    Cause
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    NFTs
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
                {placeholder.map((collection) => (
                  <tr key={collection.nfts}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {collection.name}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">cause</dt>
                        <dd className="mt-1 truncate text-gray-700">{collection.cause}</dd>
                        <dt className="sr-only sm:hidden">nfts</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{collection.nfts}</dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {collection.cause}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {collection.nfts}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">{collection.creator}</td>
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
      </AdminContainer>
    </>
  )
}

export default Collections
