import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '~/components/Header'
import { FirstForm } from '~/components/NftDetail/Create/FirstForm'
import { SecondForm } from '~/components/NftDetail/Create/SecondForm'
import { ThirdForm } from '~/components/NftDetail/Create/ThirdForm'
import { useMultistepForm } from '~/components/NftDetail/Create/useMultiStepForm'
import { RootState } from '~/redux/store'

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
  image: any
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
  image: '',
}

const CollectionNfts: NextPage = () => {
  const router = useRouter()
  const collectionId = router.query.collectionId
  const { loading, myCollections } = useSelector((state: RootState) => state.collections)
  //const collection = myCollections.filter((collection) => collection.id === collectionId)[0]

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
  ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!isLastStep) return next()
    alert('Successful account creation')
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
        Create NFT
        <div>
          <form onSubmit={onSubmit}>
            <div>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div className="flex justify-between">
              {!isFirstStep ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              ) : (
                <> </>
              )}
              <button
                type="submit"
                className="rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <span className="sr-only">{isLastStep ? 'Finish' : 'Next'}</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CollectionNfts
