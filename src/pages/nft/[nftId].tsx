import { Dialog, Transition } from '@headlessui/react'
import { ShoppingBagIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { Contract, Signer } from 'ethers'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAccount, useConnect, useSigner, useSignTypedData } from 'wagmi'
import Footer from '~/components/Footer'
import { CharityList } from '~/components/Form/CharityList'
import Header from '~/components/Header'
import NFTDetails from '~/components/NftDetail/NftDetails'
import { useNft } from '~/hooks/useNft'
import { metamaskConnector } from '~/providers/Web3ContextProvider'
import { givabitApi } from '~/services/givabit/api'
import { CHAIN_ID } from '~/utils/constants'

import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useSelector } from 'react-redux'
import { nftAbi } from '~/abi/erc721'
import { RootState } from '~/redux/store'

const style = {
  wrapper: `flex-col space-y-4 lg:py-8`,
  nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
  leftElement: `hidden lg:block`,
  rightContainer: `flex flex-1 flex-col space-y-4`,
  icon: `h-6 w-6 text-gray-500`,
}

const actionItems = [
  {
    icon: <ArrowPathIcon className={style.icon} />,
  },
  {
    icon: <LinkIcon className={style.icon} />,
  },
  {
    icon: <ShareIcon className={style.icon} />,
  },
  {
    icon: <EllipsisVerticalIcon className={style.icon} />,
  },
]

const NftPage: NextPage = () => {
  const router = useRouter()
  const { nftId } = router.query
  const { data: nft } = useNft({
    id: nftId as string,
  })
  const { id: userId } = useSelector((state: RootState) => state.auth)

  const { connect } = useConnect({
    chainId: CHAIN_ID,
    connector: metamaskConnector,
  })
  const { address } = useAccount()
  const { data: signer } = useSigner({
    chainId: CHAIN_ID,
  })
  const { data: signedData, signTypedData } = useSignTypedData()

  const [serverSignature, setServerSignature] = useState()
  const [saleData, setSaleData] = useState()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (nft) {
      setValue('id', nft.id)
    }
  }, [nft])

  const [isListOpen, setListOpen] = useState<boolean>(false)

  const handleListOpen = () => {
    setListOpen(true)
  }

  const onSubmitList = (data: any) => {
    // if (!data.topicId) {
    //   toast.error('You need to choose topic')
    //   return
    // }

    if (!data.charityId) {
      toast.error('You need to choose charity')
      return
    }

    listNft(data)
  }

  const listNft = async (data: any) => {
    if (!address) {
      toast.error('You need to connect wallet')
      return
    }

    let signResp
    try {
      signResp = await givabitApi.signingNftSale({
        nftId: data.id,
        charityId: data.charityId,
        topicId: data.topicId,
        network: data.network,
        currency: data.currency,
        price: data.price,
        charityShare: data.charityShare,
        expiryInMinutes: 30 * 24 * 60,
        quantity: 1,
        countryCode: 'US',
      })

      setServerSignature(signResp.data.serverSignature)
      setSaleData(signResp.data.saleData)
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.response.data.message ?? 'Get error while prepare listing.')
      return
    }

    // Make sign
    const typedData = JSON.parse(signResp.data.signingData)
    console.log('typedData', typedData)

    const nftContract = new Contract(typedData.message.nftContract, nftAbi, signer as Signer)

    // if (typedData.message.isMinted)
    // const isApproved = (await nftContract.getApproved(
    //   typedData.message.tokenId
    // )) as providers.TransactionResponse
    // console.log('isApproved', isApproved)
    // if (!isApproved) {
    // const txResponse = (await nftContract.approve(
    //   typedData.domain.verifyingContract,
    //   typedData.message.tokenId,
    //   {
    //     from: connectedAccount,
    //   }
    // )) as TransactionResponse
    // const txReceipt = await txResponse.wait()
    // }
    // OR

    try {
      const approvedAll = await nftContract.isApprovedForAll(
        address,
        typedData.domain.verifyingContract
      )
      console.log('approvedAll', approvedAll)
      if (!approvedAll) {
        const txResponse = (await nftContract.setApprovalForAll(
          typedData.domain.verifyingContract,
          true,
          {
            from: address,
          }
        )) as TransactionResponse
        const txReceipt = await txResponse.wait()
        console.log('approved successful', txReceipt)
      }
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.message ?? 'Get error while approve')
      return
    }

    try {
      await signTypedData({
        domain: typedData.domain,
        types: typedData.types,
        value: typedData.message,
      })
    } catch (ex: any) {
      console.log(ex)
      toast.error(ex.message ?? 'Get error while sign data')
      return
    }
  }

  useEffect(() => {
    if (signedData && serverSignature && saleData) {
      givabitApi
        .createSale({
          clientSignature: signedData,
          serverSignature,
          saleData,
        })
        .then((ret) => {
          toast.success('List nft successed.')
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message ?? 'List nft failed.')
        })
    }
  }, [signedData, serverSignature, saleData])

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
        <div className="flex h-[10vh]" />

        {nft && (
          <div className={style.wrapper}>
            <div className={style.nftContainer}>
              <div className="flex w-[480px] flex-col space-y-4">
                <div className="rounded-lg border">
                  <div className="flex items-center justify-between p-4">
                    <Image height={20} width={20} src="/img/eth-logo.svg" alt="eth" />
                  </div>

                  <div className="relative h-96 w-full">
                    {nft.imageUrl && (
                      <Image
                        className="absolute inset-0 rounded-b-lg"
                        src={`${nft.imageUrl}`}
                        layout="fill"
                        alt={nft.name}
                      />
                    )}
                  </div>
                </div>

                <div className={style.leftElement}>
                  <NFTDetails nft={nft} />
                </div>
              </div>

              <div className={style.rightContainer}>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-n4gMediumTeal">
                    {nft.collection?.name ?? ''}
                  </div>

                  <div className="flex divide-x divide-gray-300 rounded-lg border border-gray-300">
                    {actionItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center justify-center p-3"
                      >
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 text-4xl text-gray-900">{nft.name}</div>

                <div className="hidden lg:block">
                  <div className="flex space-x-6 py-6">
                    <div className="text-lg font-medium text-gray-500">
                      Owned by{' '}
                      <span className="text-n4gMediumTeal">
                        {nft.owner?.name ?? nft.owner?.wallet}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  {nft.ownerId == userId ? (
                    <button
                      type="button"
                      className="flex w-32 items-center justify-center gap-4 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                      onClick={handleListOpen}
                    >
                      <ShoppingBagIcon className="h-8 w-8" />
                      <span className="text-xl">List</span>
                    </button>
                  ) : (
                    <h1>Only owner can list nft</h1>
                  )}
                </div>

                <div className="rounded-md border border-gray-200">
                  <div className="p-4">
                    <p className="text-lg">Item Activity</p>
                  </div>
                  <div className="border-t border-gray-200 p-4">
                    <span className="text-base">No activities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />

      <Transition.Root show={isListOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setListOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit(onSubmitList)}>
                    <div className="space-y-4 divide-y divide-gray-200">
                      <div className="">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            List your NFT
                          </h3>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* <div className="sm:col-span-6">
                            <TopicList onChange={(val: string) => setValue('topicId', val)} />
                            <div className="mt-1"></div>
                          </div> */}

                          <div className="sm:col-span-6">
                            <CharityList onChange={(val: string) => setValue('charityId', val)} />
                            <div className="mt-1"></div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="network"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Network
                            </label>
                            <div className="mt-1">
                              <select
                                id="network"
                                {...register('network')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="POLYGON_MUMBAI">Polygon Mumbai</option>
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="currency"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Currency
                            </label>
                            <div className="mt-1">
                              <select
                                id="currency"
                                {...register('currency')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="NATIVE_CURRENCY">Polygon</option>
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <div className="mt-1">
                              <input
                                id="price"
                                type="text"
                                {...register('price', {
                                  valueAsNumber: true,
                                })}
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="charityShare"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Charity percentage
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="charityShare"
                                {...register('charityShare', {
                                  valueAsNumber: true,
                                })}
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      >
                        List
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setListOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default NftPage
