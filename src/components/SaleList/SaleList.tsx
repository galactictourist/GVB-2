import { PhoneIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { usePagination } from '~/hooks/usePagination'
import { givabitApi } from '~/services/givabit/api'
import { SaleEntity } from '~/types/entity/sale.entity'
import { SimplePagination } from '../Pagination/SimplePagination'

export function SaleList() {
  const pagination = usePagination();
  const { pageSetter, limitSetter, totalSetter, changePage } = pagination;
  const { page, limit, total, navPage } = pagination;
  const [sales, salesSetter] = useState<SaleEntity[] | undefined>(undefined)

  const fetch = async (page: number, limit: number) => {
    const sales = await givabitApi.saleSearch({}, page, limit)
    const nftIds = sales.data.map((sale) => sale.nftId)
    const nfts = await givabitApi.nftSearch({ ids: nftIds }, 1, nftIds.length)
    sales.data.forEach((sale) => {
      sale.nft = nfts.data.find((nft) => nft.id === sale.nftId)
      console.log('sale.nft', sale.nft)
    })
    salesSetter(sales.data)
    pageSetter(sales.pagination.page)
    limitSetter(sales.pagination.limit)
    totalSetter(sales.pagination.total)
  }

  useEffect(() => {
    ; (async () => {
      fetch(navPage, limit)
    })()
  }, [navPage, limit])

  const buy = async (sale: SaleEntity) => {
    /*
    if (connectedAccount) {
      const connected = await connectWallet()
      if (connected) {
        const marketContractAddress = sale.signedData.domain.verifyingContract || '0x0'
        console.log('sale', sale)
        const contractMp = new Contract(marketContractAddress, marketAbi, web3Provider.getSigner())

        const txResponse = (await contractMp.buyItems(
          [
            {
              signature: sale.signature,
              additionalAmount: 0,
              orderItem: sale.signedData.message,
            },
          ],
          {
            gasLimit: 1000000,
            // gasPrice: 13000000000,
            value: BigNumber.from(sale.signedData.message.itemPrice).toString(),
          }
        )) as providers.TransactionResponse
        console.log('buy txResponse', txResponse)
        const txReceipt = await txResponse.wait()
        console.log('buy txReceipt', txReceipt)
      }
    }
    */
  }

  return (
    <>
      <SimplePagination
        page={page}
        count={sales?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {sales?.map((sale) => (
          <li
            key={sale.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              {/* {sale.nft.imageUrl && (
                <Image
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={sale.imageUrl}
                  alt=""
                  layout="fill"
                />
              )} */}
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                [{sale.nft?.tokenId}] {sale.nft?.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Price</dt>
                <dd className="text-sm text-gray-500">
                  {+sale.price} {sale.currency} {sale.network}
                </dd>
              </dl>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Charity wallet</dt>
                <dd className="text-sm text-gray-500">{sale.charityWallet}</dd>
              </dl>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Charity share</dt>
                <dd className="text-sm text-gray-500">{sale.charityShare}</dd>
              </dl>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">ID</dt>
                <dd className="text-sm text-gray-500">{sale.nftId}</dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  {/* <a
                    href={`#`}
                    onClick={(e) => {
                      mint(sale.id)
                      e.preventDefault()
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Mint</span>
                  </a> */}
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`#`}
                    onClick={(e) => {
                      buy(sale)
                      e.preventDefault()
                    }}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Buy</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <SimplePagination
        page={page}
        count={sales?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      />
    </>
  )
}
