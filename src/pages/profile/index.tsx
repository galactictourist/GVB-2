import { Tab } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MyCollectionsTab from '~/components/Profile/MyCollectionsTab'
import { RootState } from '~/types'
import Header from '../../components/Header'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: NextPage = () => {
  const router = useRouter()
  const { id, wallet } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!id) {
      router.push('/')
    }
  }, [id])

  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <div className="">
          <div className="relative h-40 w-40 rounded-full shadow-lg xl:h-56 xl:w-56">
            <Image
              src={'/img/avatar.png'}
              alt="Avatar"
              className="absolute inset-0 rounded-full p-6"
              layout="fill"
            />
          </div>
          <div className="py-8">
            <h2 className="text-2xl font-semibold">Unnamed</h2>
            <p className="text-xl">{wallet ?? '-'}</p>
          </div>

          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex border-b border-gray-200">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'border-b px-8 py-2.5 text-lg font-medium leading-5 focus:outline-none',
                      selected
                        ? 'border-gray-900'
                        : 'border-gray-200 text-gray-500 hover:border-gray-900'
                    )
                  }
                >
                  My Collections
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'border-b px-8 py-2.5 text-lg font-medium leading-5 focus:outline-none',
                      selected ? 'border-gray-900' : 'text-gray-500 hover:border-gray-900'
                    )
                  }
                >
                  My Items
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel>
                  <MyCollectionsTab />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
