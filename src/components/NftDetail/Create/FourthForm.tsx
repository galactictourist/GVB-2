import { FormWrapper } from './FormWrapper'

type MetaData = {
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
  name,
  description,
  external_url,
  youtube_url,
  animation_url,
}: //updateFields,
MetaData) {
  return (
    <FormWrapper title="Properties" page={4} pages={4}>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="name" className="block text-base font-medium text-gray-700">
            NFT name
          </label>
          <div className="mt-1">{name}</div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-base font-medium text-gray-700">
            NFT Description
          </label>
          <div className="mt-2">{description}</div>
        </div>
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="external_url" className="block text-base font-medium text-gray-700">
            External URL
          </label>
          <div className="mt-1">{external_url}</div>
        </div>

        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="animation_url" className="block text-base font-medium text-gray-700">
            Animation URL
          </label>
          <div className="mt-2">{animation_url}</div>
        </div>
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="youtube_url" className="block text-base font-medium text-gray-700">
            Youtube URL
          </label>
          <div className="mt-2">{youtube_url}</div>
        </div>
      </div>
    </FormWrapper>
  )
}
