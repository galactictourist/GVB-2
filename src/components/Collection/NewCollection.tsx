import Link from 'next/link'
import toast from 'react-hot-toast'

const NewCollection = () => {
  const successMessage = () => {
    toast.success('Collection created', {
      position: 'bottom-center',
    })
  }

  return (
    <>
      <div className="flex h-[10vh]" />
      <form className="space-y-8">
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
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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
              <div className="mt-1 focus:border-red-500">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="collection-name"
                  className="n4gForm h-10"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-2">
                <textarea id="about" name="about" rows={3} className="n4gForm" defaultValue={''} />
              </div>
              <p className="mt-2 text-sm text-gray-500">How would you describe this collection?</p>
            </div>

            <div className="sm:col-span-6 md:col-span-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Cause
              </label>
              <div className="mt-1">
                <select id="cause" name="cause" autoComplete="cause-name" className="n4gForm h-10">
                  <option>Education</option>
                  <option>Animals</option>
                  <option>Environment</option>
                </select>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Each NFT collection will be listed under a specific cause. This does not limit which
                charities that will benefit from the sales of your NFTs
              </p>
            </div>
          </div>
        </div>
        <button onClick={successMessage}>
          <Link href="/">
            <a className="flex w-32 items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              Create
            </a>
          </Link>
        </button>
      </form>
    </>
  )
}

export default NewCollection
