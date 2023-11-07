
import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminContainer from '~/components/Admin/AdminContainer';
import { ITopic } from '~/redux/slices/topicsSlice';
import SortButton from './SortButton';

interface Labels {
  interestLabel: string
  createUrl: string
  updateUrl: string
  createBtnLabel: string
  description: string
}

interface Props {
  loading: boolean
  labels: Labels
  interests: ITopic[]
}

interface SortData {
  sortProperty: string
  orderBy: string
}

const InterestPageTemplate = ({ loading, labels, interests }: Props) => {
  const [data, setData] = useState<any>();
  const [sort, setSort] = useState<SortData>({
    sortProperty: "Name",
    orderBy: "ASC"
  });

  const sortHandler = (target: any) => {
    let sortProperty = !_.isUndefined(target.name) ? target.name : target.parentNode.name;
    sortProperty = _.isUndefined(sortProperty) ? target.parentNode.parentNode.name : sortProperty;

    let sortData = { ...sort };
    if (sortData.sortProperty !== sortProperty) {
      sortData.sortProperty = sortProperty;
    } else {
      sortData.orderBy = sortData.orderBy === "ASC" ? "DESC" : "ASC";
    }

    const newData = _sort(sortData);
    setData(newData);
    setSort(sortData);
  }

  const _sort = (sortData: SortData) => {
    let newData = [...data];


    newData = newData.sort((a: any, b: any) => {
      if (a[sortData.sortProperty] === "" && b[sortData.sortProperty] !== "") {
        return 1;
      } else if (a[sortData.sortProperty] !== "" && b[sortData.sortProperty] === "") {
        return -1;
      }
      return a[sortData.sortProperty] < b[sortData.sortProperty] ? -1 : 1;
    })

    if (sortData.orderBy === "DESC") {
      newData = newData.reverse();
    }

    return newData;
  }

  useEffect(() => {
    setData(interests)
  }, [interests])

  return (
    <>
      <AdminContainer>
        {loading ? (
          <div>LOADING</div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">{labels.interestLabel}</h1>
                <p className="mt-2 text-sm text-gray-700">
                  {labels.description}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link href={labels.createUrl}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {labels.createBtnLabel}
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                    >
                      Name
                      <SortButton name="name" sortOrder={sort.orderBy} sortHandler={sortHandler} />
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex items-center gap-2"
                    >
                      {labels.interestLabel === "Causes" ? "Parent Cause" : "Cause"}
                      <SortButton name="cause" sortOrder={sort.orderBy} sortHandler={sortHandler} />
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.length > 0 && data.map((interest: any) => (
                    <tr key={interest.name}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {interest.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">createdAt</dt>
                          <dd className="mt-1 truncate text-gray-700">{interest.createdAt}</dd>
                          <dt className="sr-only sm:hidden">updatedAt</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {interest.updatedAt}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {interest.createdAt}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {interest.updatedAt}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">{interest.cause}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={{
                          pathname: `${labels.updateUrl}/${interest.id}`,
                          query: {
                            id: interest.id,
                            name: interest.name,
                            causeId: interest.charityTopics?.length > 0 && interest.charityTopics[0].topicId,
                            walletAddress: interest.charityTopics?.length > 0 && interest.charityTopics[0].wallet
                          }
                        }}>
                          <div className="text-indigo-600 hover:text-indigo-900">Edit</div>
                        </Link>
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

export default InterestPageTemplate
