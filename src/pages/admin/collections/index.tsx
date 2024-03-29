import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AdminContainer from '~/components/Admin/AdminContainer'
import SortButton from '~/components/Core/SortButton'
import { useAllCollections } from '~/hooks/useAllCollections'
import { useChildCauses } from '~/hooks/useChildCauses'
import { useSort } from '~/hooks/useSort'
import { CollectionEntity } from '~/types/entity/collection.entity'
import { ADMIN_PAGES } from '~/utils/constants'

const Collections: NextPage = () => {
  const { data, isLoading } = useAllCollections()
  const { data: childCauses, isLoading: isCausesLoading } = useChildCauses()
  const [collections, setCollections] = useState<CollectionEntity[]>();

  const causes = childCauses?.reduce((obj: any, cause: any) => {
    let newObj = { ...obj };
    cause.children.forEach((c: any) => newObj[c.id] = cause.name);
    return newObj;
  }, {})

  const { sort, handler } = useSort((newData: any) => setCollections(newData));

  const sortHandler = (e: any) => {
    handler(e.target, collections)
  }

  useEffect(() => {
    if (data && causes) {
      const collections = data?.map((ce: CollectionEntity) => ({ ...ce, cause: causes[ce.topicId] }))
        .sort((a: any, b: any) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1);
      setCollections(collections);
    }
  }, [data])

  return (
    <>
      <Head>
        <title>GivaBit | Admin | Collection </title>
        <meta name="description" content="Show NFT collections" />
      </Head>
      <AdminContainer>
        {isLoading ? (
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
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href={ADMIN_PAGES.COLLECTIONS.CREATE}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Create Collection
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                    >
                      Cause
                      <SortButton name="cause" sortOrder={sort.orderBy} sortHandler={sortHandler} />
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                    >
                      Status
                      <SortButton name="status" sortOrder={sort.orderBy} sortHandler={sortHandler} />
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Artist
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {collections &&
                    collections.map((collection) => (
                      <tr key={collection.id}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                          {collection.name}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Description</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {collection.description}
                            </dd>
                            <dt className="sr-only sm:hidden">Status</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {collection.name}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {collection.cause}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {collection.description}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {collection.status}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">{collection.artistName}</td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href={`${ADMIN_PAGES.COLLECTIONS.EDIT}/${collection.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {collection.name}</span>
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
