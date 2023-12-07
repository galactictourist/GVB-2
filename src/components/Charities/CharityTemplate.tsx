import { useEffect, useState } from 'react'
import AdminContainer from '~/components/Admin/AdminContainer'
import { useChildCauses } from '~/hooks/useChildCauses'
import { SubCauseTopicEntity } from '~/types/entity/topic.entity'

export interface CharityValues {
  name: string
  causeId: string
  wallet: string
  status: string
}

interface Labels {
  pageLabel: string
  submitBtnLabel: string
}

interface Props {
  labels: Labels
  // loading: boolean
  values?: CharityValues
  submitHandler: (values: CharityValues) => void
}

const defaultValues = {
  name: "",
  causeId: "",
  wallet: "",
  status: "active"
}

const CharityTemplate = ({ labels, values = defaultValues, submitHandler }: Props) => {
  const { data: resp, isLoading } = useChildCauses()

  const [name, setName] = useState(values.name)
  const [walletAddress, setWalletAddress] = useState(values.wallet)
  const [causeId, setCauseId] = useState<string>("Select Cause")
  const [causes, setCauses] = useState([])
  const [status, setStatus] = useState<string>(values.status)

  useEffect(() => {
    if (resp) {
      const causes = resp.reduce((arr: any, cause) => [...arr, ...cause.children], [])
      setCauses(causes)
      labels.pageLabel !== "Add Charity" && setCauseId(values.causeId !== "" ? values.causeId : causes[0].id)
    }
  }, [resp])

  return (
    <>
      <AdminContainer>
        <div className="space-y-8">
          <div>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">{labels.pageLabel}</h1>
              <p className="mt-2 text-sm text-gray-700">Charity that Givabit is going to partnered with.</p>
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
              <div className="sm:col-span-6 md:col-span-4">
                <p className="text-md font-semibold">Causes</p>
                <select className="n4gForm h-10 capitalize" defaultValue={causeId} onChange={(e) => setCauseId(e.target.value)}>
                  <option label="Select Cause" id="Select Cause" value="Select Cause" />
                  {causes &&
                    causes.map((cause: SubCauseTopicEntity) => (
                      <option label={cause.name} key={cause.id} value={cause.id} />
                    ))}
                </select>
              </div>
              <div className="sm:col-span-6 md:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Wallet Address
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="n4gForm h-10"
                  />
                </div>
              </div>
              <div className="sm:col-span-6 md:col-span-4">
                <p className="text-md font-semibold">Status</p>
                <select className="n4gForm h-10 capitalize" defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                  <option label="Active" id="active" value="active" />
                  <option label="Inactive" id="inactive" value="inactive" />
                </select>
              </div>
            </div>
          </div>
          <button onClick={(e) => submitHandler({ name, causeId, wallet: walletAddress, status: status.toUpperCase() })}>
            <div className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              {labels.submitBtnLabel}
            </div>
          </button>
        </div>
        {/* )} */}
      </AdminContainer>
    </>
  )
}

export default CharityTemplate
