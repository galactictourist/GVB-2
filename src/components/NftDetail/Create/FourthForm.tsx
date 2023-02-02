import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormWrapper } from './FormWrapper'

type MetaData = {
  image: File
  name: string
  description: string
  external_url: string
  youtube_url: string
  animation_url: string
}

// type MetaFormProps = MetaData & {
//   updateFields: (fields: Partial<MetaData>) => void
// }

export function FourthForm({
  image,
  name,
  description,
  external_url,
  youtube_url,
  animation_url,
}: //updateFields,
MetaData) {
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        //console.log(preview)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  return (
    <FormWrapper title="Properties" page={4} pages={4}>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="mx-auto sm:col-span-6 md:col-span-6">
          {preview ? <Image src={preview} alt="nft image" height="300" width="300" /> : null}
        </div>

        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="name" className="block text-base font-medium text-gray-700">
            NFT name
          </label>
          <div className="mt-1 text-base">{name}</div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-base font-medium text-gray-700">
            NFT Description
          </label>
          <div className="mt-1 text-base">{description}</div>
        </div>
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="external_url" className="block text-base font-medium text-gray-700">
            External URL
          </label>
          <div className="mt-1 text-base">
            <a target="_blank" rel="noopener noreferrer" href={external_url}>
              {external_url}
            </a>
          </div>
        </div>

        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="animation_url" className="block text-base font-medium text-gray-700">
            Animation URL
          </label>
          <div className="mt-1 text-base">
            <a target="_blank" rel="noopener noreferrer" href={animation_url}>
              {animation_url}
            </a>
          </div>
        </div>
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="youtube_url" className="block text-base font-medium text-gray-700">
            Youtube URL
          </label>
          <div className="mt-1 text-base">
            <a target="_blank" rel="noopener noreferrer" href={youtube_url}>
              {youtube_url}
            </a>
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
