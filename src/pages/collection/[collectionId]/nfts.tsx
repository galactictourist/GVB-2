import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '~/components/Header'
import { FirstForm } from '~/components/NftDetail/Create/FirstForm'
import { FourthForm } from '~/components/NftDetail/Create/FourthForm'
import { SecondForm } from '~/components/NftDetail/Create/SecondForm'
import { ThirdForm } from '~/components/NftDetail/Create/ThirdForm'
import { useMultistepForm } from '~/components/NftDetail/Create/useMultiStepForm'
import { postImage } from '~/redux/slices/storageSlice'
import { RootState } from '~/redux/store'

type FormData = {
  name: string
  description: string
  external_url: string
  youtube_url: string
  animation_url: string
  image: any
  imageString: string
}

const INITIAL_DATA: FormData = {
  name: '',
  description: '',
  external_url: '',
  youtube_url: '',
  animation_url: '',
  image: '',
  imageString: '',
}

const CollectionNfts: NextPage = () => {
  const router = useRouter()
  const collectionId = router.query.collectionId
  const { loading, myCollections } = useSelector((state: RootState) => state.collections)
  //const collection = myCollections.filter((collection) => collection.id === collectionId)[0]

  const dispatch = useDispatch()

  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <FirstForm {...data} updateFields={updateFields} key="first" />,
    <SecondForm {...data} updateFields={updateFields} key="second" />,
    <ThirdForm {...data} updateFields={updateFields} key="third" />,
    <FourthForm {...data} key="fourth" />,
  ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isLastStep) return next()

    console.log('DATA TO BE POSTED')
    console.log(data)
    console.log('IMAGE STRING')
    console.log(data.imageString)

    dispatch(postImage({ file: data.image }))
    alert('Successful NFT creation')
  }

  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        {/* <CollectionOverview id={collection.id} /> */}
      </div>

      <div className="mx-auto max-w-2xl p-4 px-10 text-xl lg:max-w-7xl ">
        {/* Create NFT */}
        <div>
          <form onSubmit={onSubmit}>
            <div>{/* {currentStepIndex + 1} / {steps.length} */}</div>
            {step}
            <div className="mt-6 flex justify-between">
              {!isFirstStep ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <div className="flex">
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="">Previous</span>
                  </div>
                </button>
              ) : (
                <> </>
              )}
              <button
                type="submit"
                className="rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <div className="flex">
                  <span className="">{isLastStep ? 'Finish' : 'Next'}</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CollectionNfts
