import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import Header from '~/components/Header'
import { FirstForm } from '~/components/NftDetail/Create/FirstForm'
import { FourthForm } from '~/components/NftDetail/Create/FourthForm'
import { SecondForm } from '~/components/NftDetail/Create/SecondForm'
import { ThirdForm } from '~/components/NftDetail/Create/ThirdForm'
import { useMultistepForm } from '~/components/NftDetail/Create/useMultiStepForm'
import { useHandleCreateNft } from '~/handlers/useHandleCreateNft'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'

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

const CollectionAddPage: NextPage = () => {
  const router = useRouter()
  const collectionId = router.query.collectionId

  const handleCreateNft = useHandleCreateNft()
  const handleUploadImage = useHandleUploadImage()

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

    const toastId = toast.loading('Create nft in progress...')

    handleUploadImage.mutate(
      {
        image: data.image,
      },
      {
        onSuccess(resp) {
          const imageStorageId = resp.id

          handleCreateNft.mutate(
            {
              data: {
                name: data.name,
                description: data.description,
                network: 'POLYGON_MUMBAI',
                metadata: {
                  external_url: data.external_url,
                  youtube_url: data.youtube_url,
                  animation_url: data.animation_url,
                },
                royalty: 1,
                imageStorageId: imageStorageId,
              },
            },
            {
              onSuccess: () => {
                toast.success('Add nft successed.', {
                  id: toastId,
                })
                router.push(`/collection/${collectionId}`)
              },
              onError(error: any) {
                console.log(error)
                const errorMsg = error.message ?? 'Add nft failed.'
                toast.error(errorMsg, {
                  id: toastId,
                })
              },
            }
          )
        },
        onError(error: any) {
          console.log(error)
          const errorMsg = error.message ?? 'Upload image failed.'
          toast.error(errorMsg, {
            id: toastId,
          })
        },
      }
    )
  }

  return (
    <>
      <Head>
        <title>GivaBit | Create Nft </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

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

export default CollectionAddPage
