import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FormWrapper } from './FormWrapper'

type ImageData = {
  image: File
  imageString: string
}

type ImageFormProps = ImageData & {
  updateFields: (fields: Partial<ImageData>) => void
}

export function FirstForm({ image, imageString, updateFields }: ImageFormProps) {
  //const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        console.log(preview)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  useEffect(() => {
    updateFields({ imageString: preview })
    console.log('IMAGE STRING')
    console.log(preview)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview])

  return (
    <FormWrapper title="Image" page={1} pages={3}>
      <div className="mt-6 flex justify-center">
        <div className="">
          <label htmlFor="cover-photo" className="text-mf block p-2 font-medium text-gray-700">
            Select NFT image
            {/* {preview} */}
          </label>
          {preview ? (
            <Image
              src={preview}
              alt="nft image"
              height="300"
              width="300"
              onClick={(e) => updateFields({ image: undefined })}
            />
          ) : (
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              required
              onChange={(event) => {
                const file = event.target.files![0]
                if (file && file.type.substring(0, 5) === 'image') {
                  updateFields({ image: file })
                  console.log(image)
                  console.log(file)
                } else {
                  updateFields({ image: undefined })
                  console.log('hej')
                }
              }}
            />
          )}
          <p className="mt-2 text-sm text-gray-500">This is the image that will be your NFT.</p>
        </div>
      </div>
    </FormWrapper>
  )
}
