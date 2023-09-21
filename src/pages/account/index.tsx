import { Tab } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MyCausesTab from '~/components/Profile/MyCausesTab'
import MyCollectionsTab from '~/components/Profile/MyCollectionsTab'
import MyNftsTab from '~/components/Profile/MyNftsTab'
import MyProfileTab from '~/components/Profile/MyProfleTab'
import NavTab from '~/components/Profile/NavTab'
import { useHandleUpdateUser } from '~/handlers/useHandleUpdateUser'
import { useProfile } from '~/hooks/useProfile'
import { RootState } from '~/types'
import Avatar from '../../../public/img/avatar.png'
import Header from '../../components/Header'

const Profile: NextPage = () => {
  const router = useRouter()
  const { id, wallet } = useSelector((state: RootState) => state.auth)

  const { data: prof } = useProfile({ id })

  const [walletAddress, setWalletAddress] = useState<string>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any | null>()
  const [previewAvatar, setPreviewAvatar] = useState<any>(Avatar)
  const [profile, setProfile] = useState<any>()

  const handleUpdateUser = useHandleUpdateUser()

  const updateUser = (data: any, imgUrl: string | undefined) => {
    handleUpdateUser.mutate({
      id: id,
      data: {
        name: data.name,
        description: data.description,
        imageUrl: imgUrl,
        socialMedia: {
          facebook: data.facebook,
          twitter: data.twitter,
          instagram: data.instagram
        }
      }
    }, {
      onSuccess(resp) {
        setProfile(resp.data)
        router.push("/account")
        setIsEdit(false)
      }
    })
  }


  useEffect(() => {
    setWalletAddress(wallet ?? "-")
  }, [wallet])

  useEffect(() => {
    if (!id) {
      router.push('/')
    }
  }, [id])

  useEffect(() => {
    setProfile(prof)
  }, [prof])




  return (
    <>
      <Head>
        <title>GivaBit | Account </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <div className="">
          <div className="flex p-4 lg:flex-row flex-col items-center">
            <div className="group relative h-40 w-40 rounded-full shadow-lg xl:h-56 xl:w-56 overflow-hidden">
              <Image
                src={profile?.imageUrl || previewAvatar}
                alt="Avatar"
                className="rounded-full"
                layout="fill"
              />
            </div>
            <div className="flex flex-col p-8 justify-center">
              <h2 className="text-3xl lg:text-4xl font-semibold p-3">{profile?.name || 'Unnamed'}</h2>
              <h3 className="text-md lg:text-xl px-3 text-blue-700">{walletAddress}</h3>
              <div className="w-full px-3 pt-3">
                <div className="text-md text-gray-400">{profile?.description || ''}</div>
              </div>
            </div>
          </div>

          <div className="w-full px-2 sm:px-0">
            {!isEdit &&
              <Tab.Group>
                <Tab.List className="flex border-b border-gray-200">
                  <NavTab title="My Profile" />
                  <NavTab title="My Items" />
                  <NavTab title="My Causes" />
                  <NavTab title="My Collections" />
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel>
                    {profile && <MyProfileTab profile={profile} updateUser={updateUser} />}
                  </Tab.Panel>
                  <Tab.Panel>
                    <MyNftsTab />
                  </Tab.Panel>
                  <Tab.Panel>
                    <MyCausesTab />
                  </Tab.Panel>
                  <Tab.Panel>
                    <MyCollectionsTab />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>}
          </div>
        </div>
      </div >
    </>
  )
}

export default Profile
