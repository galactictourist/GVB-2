import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { givabitApi } from '~/services/givabit/api'
import { NftEntity } from '~/types/entity/nft.entity'
import { SaleEntity } from '~/types/entity/sale.entity'
import { SimplePagination } from '../Pagination/SimplePagination'
import SellNftDialog from './SellNftDialog'

export function UserNftList() {
  const [total, totalSetter] = useState(0)
  const [limit, limitSetter] = useState(20)
  const [page, pageSetter] = useState(1)
  const [navPage, navPageSetter] = useState(1)
  const [nfts, nftsSetter] = useState<NftEntity[] | undefined>(undefined)
  const [sellingNfts, sellingNftsSetter] = useState<NftEntity[]>([])
  const [sales, salesSetter] = useState<SaleEntity[]>([])

  const fetch = async (page: number, limit: number) => {
    const nfts = await givabitApi.nftSearchMine(page, limit)
    nftsSetter(nfts.data)
    pageSetter(nfts.pagination.page)
    limitSetter(nfts.pagination.limit)
    totalSetter(nfts.pagination.total)
  }

  const fetchSales = async (nftIds: string[], page: number, limit: number) => {
    const sales = await givabitApi.saleSearchMine({ nftIds }, 1, nftIds.length)
    salesSetter(sales.data)
  }

  useEffect(() => {
    ;(async () => {
      fetch(navPage, limit)
    })()
  }, [navPage, limit])

  useEffect(() => {
    ;(async () => {
      if (nfts) {
        fetchSales(
          nfts.map((nft) => nft.id),
          navPage,
          limit
        )
      }
    })()
  }, [nfts])

  const changePage = (page: number) => {
    navPageSetter(page)
  }

  const cancel = async (nft: any) => {
    /*
    console.log('nft', nft)
    const sale = sales.find((sale) => sale.nftId === nft.id)
    if (sale) {
      console.log('sale', sale)
      const item = sale.signedData.message
      const marketContractAddress = sale.signedData.domain.verifyingContract || '0x0'
      console.log(
        'keccak256("MARKETPLACE_ROLE")',
        utils.keccak256(utils.toUtf8Bytes('MARKETPLACE_ROLE'))
      )
      // utils.solidityKeccak256()
      console.log(
        "defaultAbiCoder.encode('MARKETPLACE_ROLE')",
        defaultAbiCoder.encode(['string'], ['MARKETPLACE_ROLE'])
      )
      // ethers.utils.AbiCoder.

      const ORDER_ITEM_TYPEHASH = utils.keccak256(
        utils.toUtf8Bytes(
          'OrderItem(address nftContract,address seller,bool isMinted,uint256 tokenId,string tokenURI, uint256 quantity,uint256 itemPrice,address charityAddress,uint96 charityShare,uint96 royaltyFee,uint256 deadline,uint256 salt)'
        )
      )

      const hash = utils.keccak256(
        utils.defaultAbiCoder.encode(
          [
            'bytes32',
            'address',
            'address',
            'bool',
            'uint256',
            'bytes32',
            'uint256',
            'uint256',
            'address',
            'uint96',
            'uint96',
            'uint256',
            'uint256',
          ],
          [
            ORDER_ITEM_TYPEHASH,
            item.nftContract,
            item.seller,
            item.isMinted,
            item.tokenId,
            utils.keccak256(utils.toUtf8Bytes(item.tokenURI)),
            item.quantity,
            item.itemPrice,
            item.charityAddress,
            item.charityShare,
            item.royaltyFee,
            item.deadline,
            item.salt,
          ]
        )
      )
      console.log('hash', hash)

      // return keccak256(
      //   abi.encode(
      //     ORDER_ITEM_TYPEHASH,
      //     item.nftContract,
      //     item.seller,
      //     item.isMinted,
      //     item.tokenId,
      //     keccak256(bytes(item.tokenURI)),
      //     item.quantity,
      //     item.itemPrice,
      //     item.charityAddress,
      //     item.charityShare,
      //     item.royaltyFee,
      //     item.deadline,
      //     item.salt
      //   )
      // );
      const contractMp = new Contract(marketContractAddress, marketAbi, web3Provider.getSigner())
      const txResponse = (await contractMp.cancelOrders([
        sale.signedData.message,
      ])) as providers.TransactionResponse
      console.log('txResponse', new Date(), txResponse)
      const txReceipt = await txResponse.wait()
      console.log('txReceipt', new Date(), txReceipt)
    }
    */
  }

  const mint = async (nftId: string) => {
    /*
    const result = await givabitApi.mint(nftId)
    console.log('result', result.data.data, result.data.signature)
    if (connectedAccount) {
      const connected = await connectWallet()
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
    */
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
                  //layout="fill"
                  height={200}
                  width={200}
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
                  {sales.find((sale) => sale.nftId === nft.id) && (
                    <a
                      href={`#`}
                      onClick={(e) => {
                        cancel(nft)
                        e.preventDefault()
                      }}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3">Cancel</span>
                    </a>
                  )}
                  {/* <a
                    href={`#`}
                    onClick={(e) => {
                      mint(nft.id)
                      e.preventDefault()
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Mint</span>
                  </a> */}
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  {nft.tokenId && (
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
                  )}
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
