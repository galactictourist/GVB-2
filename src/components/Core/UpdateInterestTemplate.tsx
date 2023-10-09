import { useEffect, useState } from 'react'
import AdminContainer from '~/components/Admin/AdminContainer'

interface Labels {
  interestLabel: string
  description: string
}

interface Props {
  loading: boolean
  labels: Labels
  value: string
  submitHandler: (value: string) => void
}

const UpdateInterestTemplate = ({ loading, labels, value, submitHandler }: Props) => {
  const [name, setName] = useState(value)

  useEffect(() => {
    setName(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <>
      <AdminContainer>
        {loading ? (
          <div>LOADING</div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">{labels.interestLabel}</h1>
                <p className="mt-2 text-sm text-gray-700">{labels.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6 md:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="collection-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="n4gForm h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={(e) => submitHandler(name)}>
              <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                Update
              </div>
            </button>
          </div>
        )}
      </AdminContainer>
    </>
  )
}

export default UpdateInterestTemplate
