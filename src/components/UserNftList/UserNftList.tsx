import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { BigNumber, Contract, providers } from 'ethers'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMetaMask } from '~/lib/ethers-react/useMetaMask'
import { useWeb3 } from '~/lib/ethers-react/useWeb3'
import { givabitApi } from '~/services/givabit/api'
import { NftEntity } from '~/types/entity/nft.entity'
import { SimplePagination } from '../Pagination/SimplePagination'
import { marketAbi } from './abi'
import { nftAbi } from './erc721'
import SellNftDialog from './SellNftDialog'

export function UserNftList() {
  const { connectedAccount, connectWallect } = useMetaMask()
  const { web3Provider } = useWeb3()

  const [total, totalSetter] = useState(0)
  const [limit, limitSetter] = useState(20)
  const [page, pageSetter] = useState(1)
  const [navPage, navPageSetter] = useState(1)
  const [nfts, nftsSetter] = useState<NftEntity[] | undefined>(undefined)
  const [sellingNfts, sellingNftsSetter] = useState<NftEntity[]>([])

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

  const mint = async (nftId: string) => {
    const result = await givabitApi.mint(nftId)
    console.log('result', result.data.data, result.data.signature)
    if (connectedAccount) {
      const connected = await connectWallect()
      if (connected) {
        console.log(await web3Provider.getSigner().getChainId())
        const nftContractAddress = '0x91d4Ad404E2363ae7FFDf7C8909dFEB24B1727f9'
        const marketContractAddress = '0xC540ae1D4c0013034B42720172e19c7803e94826'
        const contractMp = new Contract(
          // '0x219495d9af748fb11227a4a69141c01fea844218',
          marketContractAddress,
          marketAbi,
          web3Provider.getSigner()
          // new providers.Web3Provider(library.currentProvider)
          // new providers.Web3Provider(connector as any)
        )
        const contractNft = new Contract(
          nftContractAddress,
          nftAbi,
          web3Provider.getSigner()
          // new providers.Web3Provider(library.currentProvider)
          // new providers.Web3Provider(connector as any)
        )
        const nftEntity = result.data.data
        const data = {
          account: nftEntity.account,
          collection: nftEntity.collection,
          tokenId: BigNumber.from(nftEntity.tokenId),
          royaltyFee: BigNumber.from(nftEntity.royaltyFee),
          tokenURI: nftEntity.tokenURI,
          deadline: BigNumber.from(nftEntity.deadline),
          nonce: BigNumber.from(nftEntity.nonce),
        }
        // const signature =
        //   '0x73d7acb54b4e4218c3ad1a80785ee7eed24e8f4cd653cec9ac9aec7e6c38993953a1aad5c71cd91f3384a7bfbcc829e3a22c491b4ef934402b5f2297dc9791d01b'
        let signature = String(result.data.signature)
        // signature = signature.slice(2)
        console.log('data', data)
        console.log('signature', signature)
        const result1 = await contractMp.checkSignatureMint(nftEntity, signature)
        console.log('result1', result1)

        const result12 = await contractNft.MARKETPLACE_ROLE()
        console.log('result12', result12)

        // 0x0ea61da3a8a09ad801432653699f8c1860b1ae9d2ea4a141fadfd63227717bc8
        // 0x0ea61da3a8a09ad801432653699f8c1860b1ae9d2ea4a141fadfd63227717bc8

        const result2 = await contractNft.hasRole(result12, marketContractAddress)
        console.log('result2', result2)

        const receipt = (await contractMp.addSingleItem2(data, signature, {
          gasLimit: 1000000,
          gasPrice: 13000000000,
        })) as providers.TransactionResponse
        await receipt.wait()
        console.log('receipt', receipt)
      }
    }
  }

  return (
    <>
      <SellNftDialog nfts={sellingNfts} />
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
