import { FormWrapper } from './FormWrapper'

type MetaData = {
  external_url: string
  youtube_url: string
  animation_url: string
}

type MetaFormProps = MetaData & {
  updateFields: (fields: Partial<MetaData>) => void
}

export function ThirdForm({
  external_url,
  youtube_url,
  animation_url,
  updateFields,
}: MetaFormProps) {
  return (
    <FormWrapper title="Properties" page={3} pages={3}>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="external_url" className="block text-base font-medium text-gray-700">
            External URL
          </label>
          <div className="mt-1">
            <input
              id="external_url"
              name="external_url"
              type="url"
              value={external_url}
              className="n4gForm h-10"
              onChange={(e) => updateFields({ external_url: e.target.value })}
            />
          </div>
        </div>

        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="animation_url" className="block text-base font-medium text-gray-700">
            Animation URL
          </label>
          <div className="mt-2">
            <input
              id="animation_url"
              name="animation_url"
              type="url"
              value={animation_url}
              className="n4gForm"
              onChange={(e) => updateFields({ animation_url: e.target.value })}
            />
          </div>
        </div>
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="youtube_url" className="block text-base font-medium text-gray-700">
            Youtube URL
          </label>
          <div className="mt-2">
            <input
              id="youtube_url"
              name="youtube_url"
              type="url"
              value={youtube_url}
              className="n4gForm"
              onChange={(e) => updateFields({ youtube_url: e.target.value })}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
