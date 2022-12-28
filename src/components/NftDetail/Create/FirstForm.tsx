import { FormWrapper } from './FormWrapper'

type UserData = {
  firstName: string
  lastName: string
  age: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function FirstForm({ firstName, lastName, age, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="User Details" page={1} pages={3}>
      <div className="mt-6 flex justify-center">
        <div className="">
          <label htmlFor="cover-photo" className="text-mf block p-2 font-medium text-gray-700">
            Select NFT image
          </label>
          <div className="px mt-1 h-64 w-64 rounded-md border-2 border-dashed border-gray-300 px-6 pt-16 pb-6">
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
                  className="cursor-pointer rounded-md bg-white font-medium text-n4gDarkTeal focus-within:outline-none focus-within:ring-2 focus-within:ring-n4gMediumTeal focus-within:ring-offset-2 hover:text-n4gMediumTeal"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">This image will represent your collection.</p>
        </div>
      </div>
      {/* <label>First Name</label>
      <input
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        required
        type="text"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <label>Age</label>
      <input
        required
        min={1}
        type="number"
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      /> */}
    </FormWrapper>
  )
}
