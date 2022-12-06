import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { givabitApi } from '~/services/givabit/api'
import { NftEntity } from '~/types/entity/nft.entity'
import { SimplePagination } from '../Pagination/SimplePagination'

export function UserNftList() {
  const [total, totalSetter] = useState(0)
  const [limit, limitSetter] = useState(20)
  const [page, pageSetter] = useState(1)
  const [navPage, navPageSetter] = useState(1)
  const [nfts, nftsSetter] = useState<NftEntity[] | undefined>(undefined)

  const fetch = async (page: number, limit: number) => {
    const nfts = await givabitApi.nftSearchMine(page, limit)
    nftsSetter(nfts.data)
    pageSetter(nfts.pagination.page)
    limitSetter(nfts.pagination.limit)
    totalSetter(nfts.pagination.total)
  }

  useEffect(() => {
    ;(async () => {
      fetch(navPage, limit)
    })()
  }, [navPage, limit])

  const changePage = (page: number) => {
    navPageSetter(page)
  }

  return (
    <>
      <SimplePagination
        page={page}
        count={nfts?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {nfts?.map((nft) => (
          <li
            key={nft.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              {nft.imageUrl && (
                <Image
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={nft.imageUrl}
                  alt=""
                />
              )}
              <h3 className="mt-6 text-sm font-medium text-gray-900">{nft.name}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Description</dt>
                <dd className="text-sm text-gray-500">{nft.description}</dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`#`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Details</span>
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`#`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Sell</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SimplePagination
        page={page}
        count={nfts?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      />
    </>
  )
}
