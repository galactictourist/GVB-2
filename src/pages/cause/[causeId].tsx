import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { useCause } from '~/hooks/useCause'
import { getCauseBgColor, getCauseTextColor } from '~/utils'

const CausePage: NextPage = () => {
  const router = useRouter()
  const causeId = router.query.causeId

  const { data: cause } = useCause({
    id: causeId as string,
  })

  return (
    <>
      <Header />
      <div className="mx-auto min-h-[calc(100vh-320px)] max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {cause && (
          <>
            <div className="flex items-center justify-center p-4 text-4xl text-gray-900">
              <h2
                className="rounded-3xl py-3 px-6 text-center font-bold"
                style={{
                  color: getCauseTextColor(cause.name),
                  background: getCauseBgColor(cause.name),
                  width: '400px'
                }}>
                {cause.name}
              </h2>
            </div>
            <h3 className="mb-8 flex items-center justify-center  text-xl text-gray-900">
              These are all NFT collections belonging to {cause.name}. Please click on any of them
              for additional information.
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {cause.collections.map((collection) => (
                <Link href={`/collection/${collection.id}`} key={collection.id}>
                  <div className="group relative cursor-pointer">
                    <div className="relative h-48 overflow-hidden rounded-lg">
                      <Image
                        src={`${collection.imageUrl}`}
                        alt={`${collection.name}`}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                        layout="fill"
                      />
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-48 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <div className="flex-col">
                        <p className="relative text-lg font-semibold text-white">
                          {collection.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default CausePage
