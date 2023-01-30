import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
//import { givabitApi } from '~/services/givabit/api'
//import { NftEntity } from '~/types/entity/nft.entity'
//import { useAuthSlice } from '../Auth/slice'
//import { selectAuth } from '../Auth/slice/selectors'
//import { SimplePagination } from '../Pagination/SimplePagination'
//import { marketAbi } from './abi'
//import SellNftDialog from './SellNftDialog'

export function UserNftList() {
  //const { actions } = useAuthSlice()
  const dispatch = useDispatch()
  //const { signingIn } = useSelector(selectAuth)
  //const { connectedAccount, connectWallect } = useMetaMask()

  const [total, totalSetter] = useState(0)
  const [limit, limitSetter] = useState(20)
  const [page, pageSetter] = useState(1)
  const [navPage, navPageSetter] = useState(1)
  //const [nfts, nftsSetter] = useState<NftEntity[] | undefined>(undefined)
  //const [sellingNfts, sellingNftsSetter] = useState<NftEntity[]>([])

  const fetch = async (page: number, limit: number) => {
    // const nfts = await givabitApi.nftSearchMine(page, limit)
    // nftsSetter(nfts.data)
    // pageSetter(nfts.pagination.page)
    // limitSetter(nfts.pagination.limit)
    // totalSetter(nfts.pagination.total)
  }

  useEffect(() => {
    ;(async () => {
      fetch(navPage, limit)
    })()
  }, [navPage, limit])

  const changePage = (page: number) => {
    navPageSetter(page)
  }

  const mint = async (nftId: string) => {
    // const result = await givabitApi.mint(nftId, 0)
    // console.log('result', result.data.data, result.data.signature)
    // if (connectedAccount) {
    //   const connected = await connectWallect()
    //   if (connected) {
    //     const contract = new Contract(
    //       '0x2978606902693E7114e45e65CE25504611D5E24C',
    //       marketAbi,
    //       web3Provider.getSigner()
    //       // new providers.Web3Provider(library.currentProvider)
    //       // new providers.Web3Provider(connector as any)
    //     )
    //     const receipt = (await contract.addSingleItem(result.data.data, result.data.signature, {
    //       gasLimit: 10000000,
    //     })) as providers.TransactionResponse
    //     await receipt.wait()
    //     console.log('receipt', receipt)
    //   }
    // }
  }

  return (
    <>
      {/* <SellNftDialog nfts={sellingNfts} /> */}
      {/* <SimplePagination
        page={page}
        count={nfts?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      /> */}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {/* {nfts?.map((nft) => (
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
                    onClick={(e) => {
                      mint(nft.id)
                      e.preventDefault()
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Mint</span>
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`#`}
                    onClick={(e) => {
                      sellingNftsSetter([nft])
                      e.preventDefault()
                    }}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Sell</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))} */}
      </ul>
      {/* <SimplePagination
        page={page}
        count={nfts?.length}
        limit={limit}
        total={total}
        pageSelect={changePage}
      /> */}
    </>
  )
}
