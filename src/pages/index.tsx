import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useCauseCollections } from '~/hooks/useCauseCollections'
import { getCauseBgColor, getCauseTextColor } from '~/utils'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {
  const { data } = useCauseCollections()
  const causesOrder = [
    "Education",
    "Health",
    "Animal Welfare",
    "Human Services",
    "Art & Culture",
    "Environment"
  ];

  let causes;
  if (data) {
    causes = causesOrder.map(name => data.find(d => d.name === name));
  }

  return (
    <>
      <Head>
        <title>GivaBit</title>
        <meta name="description" content="Engage for Change" />
      </Head>
      <Header />
      <div className="bg-gradient-to-tl from-n4gLightTeal to-white">
        <div className="mx-auto min-h-[calc(100vh-320px)] max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {data && causes ? (
            causes.map(
              (cause) =>
                cause!.collections.length > 0 && (
                  <div key={cause!.id}>
                    <div className="itemoks-center flex justify-center p-4 text-2xl text-gray-900">
                      <Link href={`/cause/${cause!.id}`}>
                        <h2
                          className={`cursor-pointer rounded-full py-2 px-4 text-center font-bold ${getCauseBgColor(
                            cause!.name
                          )}`}
                          style={{
                            color: getCauseTextColor(cause!.name),
                            minWidth: '250px',
                          }}
                        >
                          {cause!.name}
                        </h2>
                      </Link>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-y-12 pb-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                      {cause!.collections.map((collection) => (
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
                  </div>
                )
            )
          ) : (
            <div className="flex h-96 w-full items-center justify-center text-center text-2xl">
              Loading...
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
