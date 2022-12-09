import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toaster from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createCollection } from '~/redux/slices/collectionsSlice'
import { RootState } from '~/redux/store'
import Header from '../../components/Header'

const CollectionCreate: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { loading } = useSelector((state: RootState) => state.collections)

  const errorMessage = () => {
    toaster.error('Please include a collection name and description', {
      position: 'bottom-center',
    })
  }

  const submitHandler = () => {
    if (name && description) {
      const descr: string = description
      dispatch(
        createCollection({
          name: name,
          description: descr,
        })
      )
      router.push('/profile')
    } else {
      errorMessage()
    }
  }

  return (
    <>
      <Head>
        <title>GivaBit | Collection </title>
        <meta name="description" content="Create your own NFT collection" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
        <div className="space-y-8">
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
                <div className="px mt-1 h-48 w-48 rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="mt-4 space-y-1 text-center">
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
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer rounded-md bg-white font-medium text-n4gDarkTeal focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  This image will represent your collection.
                </p>
              </div>

              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Collection name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    required
                    autoComplete="collection-name"
                    className="n4gForm h-10"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    rows={3}
                    required
                    autoComplete="description"
                    className="n4gForm"
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                  <select
                    id="cause"
                    name="cause"
                    autoComplete="cause-name"
                    className="n4gForm h-10"
                  >
                    <option>Education</option>
                    <option>Animals</option>
                    <option>Environment</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Each NFT collection will be listed under a specific cause. This does not limit
                  which charities that will benefit from the sales of your NFTs
                </p>
              </div>
            </div>
          </div>
          <button onClick={submitHandler}>
            <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              Create
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default CollectionCreate
