import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { BigNumber, Contract, Signer, ethers } from 'ethers'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Footer from '~/components/Footer'
import { CharityList } from '~/components/Form/CharityList'
import Header from '~/components/Header'
import NFTDetails from '~/components/NftDetail/NftDetails'
import { useNft } from '~/hooks/useNft'
import { givabitApi } from '~/services/givabit/api'

import { TransactionResponse } from '@ethersproject/abstract-provider'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import { marketAbi } from '~/abi/market'
import NftImage from '~/components/Core/NftImage'
import { useHandleSaleStatus } from '~/handlers/useHandleSaleStatus'
import { useCharity } from '~/hooks/useCharity'
import { useListNft } from '~/hooks/useListNft'
import { useProfile } from '~/hooks/useProfile'
import { RootState } from '~/redux/store'
import { SaleEntity } from '~/types/entity/sale.entity'
import { getCauseBgColor, getCauseTextColor, getEtherscan, shortify, sleep } from '~/utils'
import GivabitHeart from '../../../public/img/givabit_heart.svg'

const style = {
  wrapper: `flex-col space-y-4 lg:py-8`,
  nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
  leftElement: `hidden lg:block`,
  rightContainer: `flex flex-1 flex-col space-y-4`,
  icon: `h-6 w-6 text-gray-500`,
}

const NftPage: NextPage = () => {
  const router = useRouter()
  const { nftId } = router.query
  const { data: nft, refetch: loadNft } = useNft({
    id: nftId as string,
  })

  const { id: userId } = useSelector((state: RootState) => state.auth)

  const { data: prof } = useProfile({ id: userId })

  const { listNft, isListOpen, signedData, address, signer, serverSignature, saleData, setListOpen } = useListNft();
  const handleSaleStatus = useHandleSaleStatus()

  const [sale, setSale] = useState<SaleEntity>()
  const [additionalAmount, setAdditionalAmount] = useState<string>()

  // range slider
  const [rangeValue, setRangeValue] = useState<number>(0)
  const [rangeMaxValue, setRangeMaxValue] = useState<number>(0)

  const { data: charity } = useCharity(sale?.charityId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setRangeMaxValue(Number(sale?.price ?? 0))
  }, [sale])

  useEffect(() => {
    if (nft) {
      setValue('id', nft.id)

      const listedSales = nft.sales.filter((s) => s.status == 'LISTING')

      if (listedSales.length > 0) {
        setSale(listedSales[0])
      } else {
        setSale(undefined)
      }
    }
  }, [nft])

  // const getSocialUrl = (data: any, key: string) => {
  //   if (data && data.socialMedia) {
  //     return data.socialMedia[key]
  //   }
  //   return ''
  // }
  // const [isListOpen, setListOpen] = useState<boolean>(false)
  const [isShowImage, setIsShowImage] = useState<boolean>(false)

  const handleListOpen = () => {
    setListOpen(true)
  }

  const handleRangeValue = (val: any) => {
    setRangeValue(Number(val))
    setRangeMaxValue(Number(sale?.price ?? 0) + Number(val))
  }

  const calcCharityPercent = () => {
    const charity = (Number(sale?.price) * Number(sale?.charityShare)) / 10000
    return (charity / rangeMaxValue) * 100
  }

  const calcArtPercent = () => {
    const charity = (Number(sale?.price) * Number(sale?.charityShare)) / 10000
    return ((rangeMaxValue - charity - rangeValue) / rangeMaxValue) * 100
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
          loadNft()
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message ?? 'List nft failed.')
        })
    }
  }, [signedData, serverSignature, saleData])

  const handleUnlist = async () => {
    if (!address) {
      toast.error('You need to connect wallet')
      return
    }

    if (!sale) {
      toast.error('NFT is not on sale')
      return
    }

    let toastId = toast.loading('Unlist is in progress')
    const marketContractAddress = sale.signedData?.domain.verifyingContract || '0x0'
    const contractMp = new Contract(marketContractAddress, marketAbi, signer as Signer)

    try {
      const response = await (
        (await contractMp.cancelOrders([sale.signedData.message])) as TransactionResponse
      ).wait()

      toastId = toast.loading('Confirming unlist transaction', {
        id: toastId,
      })

      for (let i = 0; i < 30; i++) {
        const isFinished = await handleSaleStatus.mutateAsync({
          nftId: nftId as string,
          actionStatus: 'UNLIST',
        })
        if (isFinished) {
          toast.success('Unlist successed.', {
            id: toastId,
            duration: 10000,
            position: 'top-right',
          })
          loadNft()
          return
        }

        await sleep(3000)
      }

      toast.error('Unlist confirmation failed.', {
        id: toastId,
      })
    } catch (ex) {
      console.log(ex)
      toast.error('Unlist NFT failed.', {
        id: toastId,
      })
    }
  }

  const artValueValidator = (price: number, charityShare: number) => {
    const value = (price * (1 - charityShare / 10000));
    return value >= 0 ? value.toFixed(3) : 0;
  }

  const handleBuy = async () => {
    if (!address) {
      toast.error('You need to connect wallet')
      return
    }

    if (!sale) {
      toast.error('NFT is not on sale')
      return
    }

    let toastId = toast.loading('Buy NFT is in progress')

    const marketContractAddress = sale.signedData.domain.verifyingContract || '0x0'
    const contractMp = new Contract(marketContractAddress, marketAbi, signer as Signer)

    try {
      const itemPrice = BigNumber.from(sale.signedData.message.itemPrice)
      const additionalPrice = rangeValue ? ethers.utils.parseEther(rangeValue.toString()) : 0
      const value = itemPrice.add(additionalPrice)

      const response = await (
        (await contractMp.buyItems(
          [
            {
              signature: sale.signature,
              additionalAmount: additionalPrice,
              orderItem: sale.signedData.message,
            },
          ],
          {
            gasLimit: 100000,
            value,
          }
        )) as TransactionResponse
      ).wait()

      toastId = toast.loading('Confirming buy transaction', {
        id: toastId,
      })

      for (let i = 0; i < 30; i++) {
        const isFinished = await handleSaleStatus.mutateAsync({
          nftId: nftId as string,
          actionStatus: 'BUY',
        })
        if (isFinished) {
          toast.success('Buy NFT successed.', {
            id: toastId,
            duration: 10000,
            position: 'top-right',
          })
          loadNft()
          return
        }

        await sleep(3000)
      }

      toast.error('Buy confirmation failed.', {
        id: toastId,
      })
    } catch (ex) {
      console.log(ex)
      toast.error('Buy NFT failed.', {
        id: toastId,
      })
    }
  }
  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
        <div className="flex h-[10vh]" />

        {nft ? (
          <div className={style.wrapper}>
            <div className={style.nftContainer}>
              <div className="flex w-[480px] flex-col space-y-4">
                <div>
                  <div
                    className="relative h-[480px] cursor-pointer"
                    onClick={() => setIsShowImage(true)}
                  >
                    {nft.imageUrl &&
                      <NftImage name={nft.name} type={nft.type} src={nft.imageUrl} size={600} style="absolute rounded-b-lg" />
                    }
                  </div>
                  <Transition.Root show={isShowImage}>
                    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen bg-n4gBlack opacity-75" />

                    <Transition.Child
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        className="none fixed top-[50%] left-[50%] z-50"
                        style={{
                          transform: 'translate(-50%, -50%)',
                          width: '650px',
                          height: '650px',
                        }}
                      >
                        <NftImage name={nft.name} type={nft.type} src={nft.imageUrl} size={600} style="absolute rounded-b-lg" />
                        <span className="fixed top-0 right-0 z-40 mt-[-50px] mr-[-50px] cursor-pointer">
                          <XMarkIcon
                            className="h-[32px] w-[32px] font-bold text-white"
                            aria-hidden="true"
                            onClick={() => setIsShowImage(false)}
                            fontSize={'30px'}
                          />
                        </span>
                      </div>
                    </Transition.Child>
                  </Transition.Root>
                </div>

                <div className={style.leftElement}>
                  <NFTDetails nft={nft} />
                </div>
              </div>

              <div className={style.rightContainer}>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-n4gMediumTeal">
                    <Link href={`/collection/${nft.collection?.id}`}>
                      {nft.collection?.name ?? ''}
                    </Link>
                  </div>
                  <div className="itemoks-center flex justify-center p-4 text-xl text-gray-900">
                    <Link href={`/cause/${nft.cause?.id}`}>
                      <h2
                        className={`cursor-pointer rounded-full py-1 px-4 text-center ${getCauseBgColor(
                          nft.cause?.name || ''
                        )}`}
                        style={{
                          color: getCauseTextColor(nft.cause?.name || ''),
                        }}
                      >
                        {nft.cause?.name ?? ''}
                      </h2>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 text-4xl text-gray-900">{nft.name}</div>

                <div className="hidden justify-between lg:flex">
                  <div className="flex items-center space-x-2 py-2 text-lg font-medium">
                    <div className="text-gray-500">Owned by</div>
                    <Link href={getEtherscan(nft.owner?.wallet)}>
                      <a target="_blank">
                        <div className="text-n4gMediumTeal hover:text-gray-600">
                          {nft.owner?.name ?? shortify(nft.owner?.wallet)}
                        </div>
                      </a>
                    </Link>
                  </div>
                  {nft.ownerId == userId && (
                    <div className="flex gap-1">
                      <FacebookShareButton
                        // url={window.location.href}
                        url={"https://givabit2.vercel.app/nft/189b7ee3-a361-47ba-bcea-8bba3a96d989"}
                        quote={"Welcome, hello"}
                      >
                        <FacebookIcon size={40} round={true} />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={window.location.href}
                      >
                        <TwitterIcon size={40} round={true} />
                      </TwitterShareButton>
                    </div>
                  )}
                  {/* <div className="flex divide-x divide-gray-300 rounded-lg border border-gray-300">
                    {actionItems.map((item, index) => (
                      <Link key={index} href={getSocialUrl(prof, item.name)}>
                        <a target="_blank">
                          <div
                            className="flex cursor-pointer items-center justify-center p-3"
                          >
                            {item.icon}
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div> */}
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  {nft.ownerId == userId ? (
                    sale ? (
                      <div className="flex w-full">
                        <div className="flex flex-col items-center justify-between">
                          <div className="py-1">
                            <span className="text-2xl font-semibold">
                              {(+sale?.price >= 0 ? +sale?.price : Math.abs(+sale?.price)).toFixed(3)} MATIC
                            </span>
                          </div>
                          <button
                            type="button"
                            className="mt-2 flex w-32 items-center justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                            onClick={handleUnlist}
                          >
                            <span className="text-xl">Unlist</span>
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="relative flex flex-1 flex-row items-center justify-between pl-3">
                            <div className="invisible flex h-full items-end p-2 pb-0">
                              <Image
                                src={GivabitHeart}
                                alt="givabit heart small"
                                className="cursor-pointer"
                                onClick={() => handleRangeValue(0)}
                                width={'50px'}
                                height={'40px'}
                              />
                            </div>
                            <div className="flex h-full flex-1 flex-col justify-between">
                              <div className="flex justify-between py-2">
                                <div className="flex items-center text-xl">
                                  <span className="pr-3 text-lg font-bold text-gray-600">
                                    Charity:
                                  </span>

                                  <span className="font-bold text-n4gMediumTeal">
                                    {(
                                      (Number(sale?.price) * Number(sale?.charityShare)) /
                                      10000
                                    ).toFixed(3)}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="pr-2 text-xl font-bold text-black">Art:</span>
                                  <span className="text-xl text-black">
                                    {artValueValidator(+sale?.price, +sale?.charityShare)}
                                  </span>
                                </div>
                              </div>
                              <span className="pr-3 text-lg text-gray-600">
                                {charity?.name}
                              </span>
                              <div className="relative flex items-center justify-center">
                                <div className="flex w-full overflow-hidden rounded-full bg-transparent">
                                  <div
                                    className="text-primary flex justify-center rounded-l-full bg-n4gMediumTeal py-3 text-xs font-medium leading-none text-white"
                                    style={{ width: `${calcCharityPercent()}%` }}
                                  />
                                  <div
                                    className="text-primary flex justify-center rounded-r-full bg-black py-3 text-xs font-medium leading-none text-white"
                                    style={{ width: `${calcArtPercent()}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="invisible flex h-full items-end p-2 pb-0">
                              <Image
                                src={GivabitHeart}
                                alt="givabit heart small"
                                className="cursor-pointer"
                                onClick={() => handleRangeValue(rangeValue + 1)}
                                width={'60px'}
                                height={'50px'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="flex w-32 items-center justify-center gap-4 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                        onClick={handleListOpen}
                      >
                        <span className="text-xl">List</span>
                      </button>
                    )
                  ) : sale ? (
                    <div className="flex w-full">
                      <div className="flex flex-col justify-between">
                        <div className="py-1">
                          <span className="text-2xl font-semibold">
                            {(rangeMaxValue >= 0 ? rangeMaxValue : Math.abs(rangeMaxValue)).toFixed(3)} MATIC
                          </span>
                        </div>
                        <button
                          type="button"
                          className="mt-2 flex w-32 items-center justify-center gap-4 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800"
                          onClick={handleBuy}
                        >
                          <span className="text-xl">Buy</span>
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="relative flex flex-1 flex-row items-center justify-between">
                          <div className="flex h-full items-end p-2 pb-0">
                            <Image
                              src={GivabitHeart}
                              alt="givabit heart small"
                              className="cursor-pointer"
                              onClick={() => handleRangeValue(0)}
                              width={'50px'}
                              height={'40px'}
                            />
                          </div>
                          <div className="flex h-full flex-1 flex-col justify-between">
                            <div className="flex justify-between gap-5">
                              <div className="flex items-center text-xl">
                                <span className="pr-2 font-bold">Charity:</span>
                                <input
                                  type="number"
                                  step=".01"
                                  min={0}
                                  value={rangeValue}
                                  onChange={(e) => handleRangeValue(e.target.value)}
                                  className="n4gForm w-[110px] p-[5px] text-green-600 text-xl"
                                />
                                <span>
                                  &nbsp;&nbsp;+&nbsp;&nbsp;
                                </span>
                                <span className="text-n4gMediumTeal">
                                  {(
                                    (Number(sale?.price) * Number(sale?.charityShare)) /
                                    10000
                                  ).toFixed(3)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="pr-2 text-xl font-bold text-black">Art:</span>
                                <span className="text-xl text-black">
                                  {artValueValidator(+sale?.price, +sale?.charityShare)}
                                </span>
                              </div>
                            </div>
                            <div className="flex">
                              <span className="text-md -mt-3 text-gray-600">{charity?.name}</span>
                            </div>
                            <div className="relative flex items-center justify-center">
                              <div className="flex w-full overflow-hidden rounded-full bg-transparent">
                                <div
                                  className="text-primary flex justify-center rounded-l-full bg-n4gGreen py-3 text-xs font-medium leading-none"
                                  style={{ width: `${(rangeValue / rangeMaxValue) * 100}%` }}
                                />
                                <div
                                  className="text-primary flex justify-center bg-n4gMediumTeal py-3 text-xs font-medium leading-none text-white"
                                  style={{ width: `${calcCharityPercent()}%` }}
                                />
                                <div
                                  className="text-primary flex justify-center rounded-r-full bg-black py-3 text-xs font-medium leading-none text-white"
                                  style={{ width: `${calcArtPercent()}%` }}
                                />
                              </div>
                              <input
                                className="range-silder absolute w-full appearance-none bg-transparent"
                                type="range"
                                step={0.001}
                                min={0}
                                max={rangeMaxValue}
                                value={rangeValue}
                                onChange={(e) => handleRangeValue(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex h-full items-end p-2 pb-0">
                            <Image
                              src={GivabitHeart}
                              alt="givabit heart small"
                              className="cursor-pointer"
                              onClick={() => handleRangeValue(rangeValue + 1)}
                              width={'60px'}
                              height={'50px'}
                            />
                          </div>
                        </div>
                        <div className="flex"></div>
                      </div>
                    </div>
                  ) : (
                    <h1>Nft not listed</h1>
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
        ) : (
          <div className="h-96 w-full text-center text-2xl">Loading...</div>
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
                            <CharityList causeId={nft?.cause?.id} onChange={(val: string) => setValue('charityId', val)} />
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
                                type="number"
                                step=".01"
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
                                type="number"
                                step=".01"
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
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
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

      {/* <Transition.Root show={isBuyOpen} as={Fragment}>
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
                  <div className="space-y-4 divide-y divide-gray-200">
                    <div className="">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Buy {nft?.name}
                        </h3>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="additionalAmount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Donate Amount
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="additionalAmount"
                            value={additionalAmount}
                            onChange={(e) => setAdditionalAmount(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => handleBuy()}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setBuyOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
    </>
  )
}

export default NftPage
