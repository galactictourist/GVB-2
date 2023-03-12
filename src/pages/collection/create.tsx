import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCauses } from '~/redux/slices/causesSlice'
import { createCollection } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'
import Header from '../../components/Header'

const CollectionCreate: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { causes } = useSelector((state: RootState) => state.causes)
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    dispatch(getAllCauses())
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const files = watch('file')

  useEffect(() => {
    if (files && files.length > 0) {
      const file = files[0]
      setPreview(URL.createObjectURL(file))
    }
  }, [files])

  const onSumbit = (data: any) => {
    const formData = new FormData()

    if (data.file.length > 0) {
      formData.append('file', data.file[0])
    }

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('contractAddress', data.contract_address)
    formData.append('topicId', data.cause)

    dispatch(createCollection(formData))
    router.push('/profile')
  }

  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Create your own NFT collection" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-24 lg:max-w-7xl">
        <form className="space-y-8" onSubmit={handleSubmit(onSumbit)}>
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create collection</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will displayed publicly related to your collection
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="px relative mt-1 h-48 w-48 rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="mt-4 space-y-1 text-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview Image"
                        className="-z-1 absolute inset-0 z-[-1]"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer rounded-md bg-white font-medium text-n4gDarkTeal focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          id="file-upload"
                          multiple={false}
                          className="sr-only"
                          {...register('file')}
                        />
                      </label>
                    </div>
                    {!preview && <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Collection name
                </label>
                <div className="mt-1">
                  <input required type="text" className="n4gForm h-10" {...register('name')} />
                </div>
              </div>

              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Collection address
                </label>
                <div className="mt-1">
                  <input type="text" className="n4gForm h-10" {...register('contract_address')} />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-2">
                  <textarea required rows={3} className="n4gForm" {...register('description')} />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  How would you describe this collection?
                </p>
              </div>

              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Cause
                </label>
                <div className="mt-1">
                  <select className="n4gForm h-10" {...register('cause')}>
                    {causes.map((cause, idx) => (
                      <option key={idx} value={cause.id}>
                        {cause.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Each NFT collection will be listed under a specific cause. This does not limit
                  which charities that will benefit from the sales of your NFTs
                </p>
              </div>
            </div>
          </div>
          <button type="submit">
            <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              Create
            </div>
          </button>
        </form>
      </div>
    </>
  )
}

export default CollectionCreate
