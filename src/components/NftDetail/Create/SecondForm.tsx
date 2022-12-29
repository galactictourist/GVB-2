import { FormWrapper } from './FormWrapper'

type DescriptionData = {
  name: string
  description: string
}

type DescriptionFormProps = DescriptionData & {
  updateFields: (fields: Partial<DescriptionData>) => void
}

export function SecondForm({ name, description, updateFields }: DescriptionFormProps) {
  return (
    <FormWrapper title="Description" page={2} pages={3}>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6 md:col-span-4">
          <label htmlFor="name" className="block text-base font-medium text-gray-700">
            NFT name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              required
              autoComplete="name"
              className="n4gForm h-10"
              onChange={(e) => updateFields({ name: e.target.value })}
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-base font-medium text-gray-700">
            NFT Description
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
              onChange={(e) => updateFields({ description: e.target.value })}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
