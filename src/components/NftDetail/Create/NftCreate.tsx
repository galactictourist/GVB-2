import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
//import { givabitApi } from '~/services/givabit/api'
//import { NftEntity } from '~/types/entity/nft.entity'
//import { CharityList } from '../Form/CharityList'
//import { CountryList } from '../Form/CountryList'
//import { TopicList } from '../Form/TopicList'

interface Props {
  // nfts: NftEntity[]
}

//export default function SellNftDialog({ nfts }: Props) {
export default function NftCreate() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const submitHandler = () => {
    if (name && description) {
      const descr: string = description

      console.log('Creating nft')
      console.log()
      // dispatch(
      //   createCollection({
      //     name: name,
      //     description: descr,
      //   })
      // )
      router.push('/profile')
    } else {
      // errorMessage()
      console.log('Error when creating nft')
    }
  }

  // useEffect(() => {
  //   setOpen(nfts.length ? true : false)
  // }, [nfts])

  // const cancelButtonRef = useRef(null)
  return (
    <>
      <div className="mx-auto max-w-2xl px-10 pt-24 lg:max-w-7xl">
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

// console.log('SUBMITBUTTON')
// const sale = await givabitApi.sellNfts({
//   nfts: nfts.map((nft) => nft.id),
//   countryCode: 'VN',
//   charityId: 'be67c2c4-8620-41c0-9d1a-63f40521229e',
//   topicId: 'b1422b18-0bba-4054-9baf-eed8a19b3623',
//   network: 'POLYGON_TESTNET',
//   currency: 'NATIVE_CURRENCY',
//   price: 12.3,
// })
// sale

// return (

//   <Transition.Root show={open} as={Fragment}>
//     <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//       <Transition.Child
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//       </Transition.Child>

//       <div className="fixed inset-0 z-10 overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//               <div>
//                 <form className="space-y-8 divide-y divide-gray-200">
//                   <div className="space-y-8 divide-y divide-gray-200">
//                     <div className="pt-8">
//                       <div>
//                         <h3 className="text-lg font-medium leading-6 text-gray-900">
//                           Sell Information
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">Placeholder</p>
//                       </div>
//                       <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                         <div className="sm:col-span-6">
//                           {/* <CountryList /> */}
//                           <div className="mt-1"></div>
//                         </div>

//                         <div className="sm:col-span-6">
//                           {/* <TopicList /> */}
//                           <div className="mt-1"></div>
//                         </div>

//                         <div className="sm:col-span-6">
//                           {/* <CharityList /> */}
//                           <div className="mt-1"></div>
//                         </div>

//                         <div className="sm:col-span-3">
//                           <label
//                             htmlFor="network"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Network
//                           </label>
//                           <div className="mt-1">
//                             <select
//                               id="network"
//                               name="network"
//                               autoComplete="network-name"
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             >
//                               <option value="POLYGON_MUMBAI">Polygon Mumbai</option>
//                               <option value="BSC_TESTNET">BSC Testnet</option>
//                             </select>
//                           </div>
//                         </div>

//                         <div className="sm:col-span-3">
//                           <label
//                             htmlFor="currency"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Currency
//                           </label>
//                           <div className="mt-1">
//                             <select
//                               id="currency"
//                               name="currency"
//                               autoComplete="currency-name"
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             >
//                               <option value="NATIVE_CURRENCY">Polygon</option>
//                               <option value="ETH">ETH</option>
//                             </select>
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2">
//                           <label
//                             htmlFor="city"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Price
//                           </label>
//                           <div className="mt-1">
//                             <input
//                               type="number"
//                               name="city"
//                               id="city"
//                               autoComplete="address-level2"
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2">
//                           <label
//                             htmlFor="region"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Charity percentage
//                           </label>
//                           <div className="mt-1">
//                             <input
//                               type="number"
//                               name="region"
//                               id="region"
//                               autoComplete="address-level1"
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
//                 <button
//                   type="button"
//                   className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
//                   onClick={submit}
//                 >
//                   Sell
//                 </button>
//                 <button
//                   type="button"
//                   className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
//                   onClick={() => setOpen(false)}
//                   ref={cancelButtonRef}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </Dialog>
//   </Transition.Root>
// )
// }
