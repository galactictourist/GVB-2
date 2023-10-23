import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useChildCauses } from '~/hooks/useChildCauses'
import { CollectionEntity, CollectionStatus } from '~/types/entity/collection.entity'
import { ADMIN_PAGES } from '~/utils/constants'

interface Props {
  formLabelTexts: {
    header: string
    submitButton: string
  }
  isLoading: boolean
  submitHandler: (data: any) => void
  collection?: CollectionEntity
}

const CollectionForm = ({ formLabelTexts, submitHandler, isLoading, collection }: Props) => {
  const { data: causes } = useChildCauses()
  const [preview, setPreview] = useState<string>()
  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (formLabelTexts.header === "Edit collection" && collection) {
      setValue('name', collection.name)
      setValue('artistAddress', collection.artistAddress)
      setValue('description', collection.description)
      setValue('cause', collection.topicId)
      setValue('status', collection.status)
      setPreview(collection.imageUrl)
    }
  }, [collection])

  return (
    <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">{formLabelTexts.header}</h3>
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
              <div className="space-y-1 text-center">
                {preview ? (
                  <img src={preview} alt="Preview Image" className="h-full object-cover" />
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
                    className="z-[100] cursor-pointer rounded-md bg-white font-medium text-n4gDarkTeal focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                {!preview && (
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                )}
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
              Artist address
            </label>
            <div className="mt-1">
              <input
                required
                type="text"
                className="n4gForm h-10"
                {...register('artistAddress')}
              />
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
              <select className="n4gForm h-10 capitalize" {...register('cause')}>
                {formLabelTexts.submitButton === "Create" && <option className="capitalize">
                  Choose cause
                </option>}
                {causes &&
                  causes.map((cause) => (
                    <optgroup label={cause.name} key={cause.id}>
                      {cause.children.map((subcause) => (
                        <option key={subcause.id} value={subcause.id} className="capitalize">
                          {subcause.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
              </select>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Each NFT collection will be listed under a specific cause. This does not limit
              which charities that will benefit from the sales of your NFTs
            </p>
          </div>
          <br />
          {formLabelTexts.header === "Edit collection" && <div className="sm:col-span-2 md:col-span-2">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="n4gForm h-10 capitalize" defaultValue={collection?.status} {...register('status')}>
              {Object.keys(CollectionStatus).map((status) => (
                <option label={status} key={status} value={status} />
              ))}
            </select>
          </div>}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
          disabled={isLoading}
        >
          {formLabelTexts.submitButton}
        </button>
        <Link href={ADMIN_PAGES.COLLECTIONS.INDEX}>
          <button
            className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
            type="button"
          >
            Back
          </button>
        </Link>
      </div>
    </form>
  )
}

export default CollectionForm
