import { Tab } from '@headlessui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import MyCollectionsTab from '~/components/Profile/MyCollectionsTab'
import MyNftsTab from '~/components/Profile/MyNftsTab'
import { useHandleUpdateUser } from '~/handlers/useHandleUpdateUser'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'
import { useProfile } from '~/hooks/useProfile'
import { RootState } from '~/types'
import Avatar from '../../../public/img/avatar.png'
import FacebookIcon from '../../../public/img/facebook.svg'
import InstagramIcon from '../../../public/img/instagram.svg'
import TwitterIcon from '../../../public/img/twitter.svg'
import Header from '../../components/Header'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const socialIcons = [
  {
    icon: <Image src={FacebookIcon} alt="facebook" width={30} height={30} />, name: 'facebook',
  },
  {
    icon: <Image src={TwitterIcon} alt="twitter" width={30} height={30} />, name: 'twitter',
  },
  {
    icon: <Image src={InstagramIcon} alt="instagram" width={30} height={30} />, name: 'instagram',
  },
]

const Profile: NextPage = () => {
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  const { id, wallet } = useSelector((state: RootState) => state.auth)

  const { data: prof } = useProfile({ id })

  const [walletAddress, setWalletAddress] = useState<string>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any | null>()
  const [previewAvatar, setPreviewAvatar] = useState<any>(Avatar)
  const [profile, setProfile] = useState<any>()

  const handleUpdateUser = useHandleUpdateUser()
  const handleUploadImage = useHandleUploadImage()

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

  const onSelectAvatar = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar(Avatar)
    }
    else {
      const previewUrl = URL.createObjectURL(e.target.files[0])
      setAvatar(e.target.files[0])
      setPreviewAvatar(previewUrl)
    }
  }

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
        router.push("/profile")
        setIsEdit(false)
      }
    })
  }

  const onSubmit = (data: any) => {
    if (!avatar) {
      updateUser(data, profile?.imageUrl)
      return
    }
    handleUploadImage.mutate({ image: avatar, postUrl: '/storage/profile/image' }, {
      onSuccess(resp) {
        const imgUrl = resp.url
        updateUser(data, imgUrl)
      },
      onError(error: any) {
        console.log(error)
        const errorMsg = error.message ?? 'Upload avatar failed.'
        toast.error(errorMsg)
      },
    })
  }

  const getSocialUrl = (data: any, key: string) => {
    if (data && data.socialMedia) {
      return data.socialMedia[key]
    }
    return '/'
  }

  return (
    <>
      <Head>
        <title>GivaBit | Profile </title>
        <meta name="description" content="Support charities by buying an NFT" />
      </Head>

      <Header />

      <div className="mx-auto max-w-2xl px-10 pt-32 lg:max-w-7xl">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex p-4">
              <div className="group relative h-40 w-40 rounded-full shadow-lg xl:h-56 xl:w-56 overflow-hidden">
                <Image
                  src={profile?.imageUrl || previewAvatar}
                  alt="Avatar"
                  className="rounded-full"
                  layout="fill"
                />
                {isEdit && (<>
                  <div
                    className="absolute flex h-full w-full items-center justify-center inset-0 group-hover:opacity-75 opacity-0 bg-[#546198]"
                    key="editIcon"
                  >
                    <BiEdit fontSize={30} color='white' />
                  </div>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="absolute w-full h-full inset-0 opacity-0 cursor-pointer"
                    onChange={onSelectAvatar}
                  />
                </>)}
              </div>
              <div className="flex flex-col p-8 justify-center">
                <h2 className="text-4xl font-semibold p-3">{profile?.name || 'Unnamed'}</h2>
                <h3 className="text-xl px-3 text-blue-700">{walletAddress}</h3>
                <div className="w-full px-3 pt-3">
                  <div className="text-md text-gray-400">{profile?.description || ''}</div>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-5 items-end">
                <div>
                  {!isEdit && <button className="text-xl bg-n4gMediumTeal px-2 py-1 rounded text-white" onClick={() => setIsEdit(true)}>Edit</button>}
                  {isEdit && <button type="submit" className="text-xl bg-n4gMediumTeal px-2 py-1 rounded text-white mr-2" onClick={() => { }}>Save</button>}
                  {isEdit && <button className="text-xl bg-n4gMediumTeal px-2 py-1 rounded text-white ml-2" onClick={() => setIsEdit(false)}>Cancel</button>}
                </div>
                <div className="social-group">
                  <div className="flex divide-x divide-gray-300 rounded-lg border border-gray-300">
                    {socialIcons.map((item, index) => (
                      <Link href={getSocialUrl(profile, item.name)} key={index}>
                        <a target='_blank'>
                          <div
                            className="flex cursor-pointer items-center justify-center p-3"
                          >
                            {item.icon}
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-2 sm:px-0">
              {!isEdit &&
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
                    <Tab.Panel>
                      <MyNftsTab />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>}
              {isEdit &&
                <>
                  <div className="p-4 bg-white rounded-lg">
                    <label htmlFor="email" className="block text-md font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1 mb-2">
                      <input defaultValue={profile?.name} required type="text" className="n4gForm h-10" {...register('name')} />
                    </div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea required rows={3} className="n4gForm" {...register('description')} defaultValue={profile?.description} />
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="mb-6 flex items-center justify-center">
                      <Image src={FacebookIcon} width={20} height={20} />
                      <label className="text-md font-medium text-gray-700 p-2 w-[20%]"> Facebook</label>
                      <input
                        type="text"
                        className="n4gForm h-10"
                        placeholder='https://www.facebook.com'
                        {...register('facebook')}
                        defaultValue={getSocialUrl(profile, 'facebook')}
                      />
                    </div>
                    <div className="mb-6 flex items-center justify-center">
                      <Image src={InstagramIcon} width={20} height={20} />
                      <label className="text-md font-medium text-gray-700 p-2 w-[20%]">Instagram</label>
                      <input
                        type="text"
                        className="n4gForm h-10"
                        placeholder='https://www.instagram.com'
                        {...register('instagram')}
                        defaultValue={getSocialUrl(profile, 'instagram')}
                      />
                    </div>
                    <div className="mb-6 flex items-center justify-center">
                      <Image src={TwitterIcon} width={20} height={20} />
                      <label className="mb-2 text-md font-medium text-gray-700 p-2 w-[20%]">Twitter</label>
                      <input
                        type="text"
                        className="n4gForm h-10"
                        placeholder='https://www.twitter.com'
                        {...register('twitter')}
                        defaultValue={getSocialUrl(profile, 'twitter')}
                      />
                    </div>
                  </div>
                </>
              }
            </div>
          </form>
        </div>
      </div >
    </>
  )
}

export default Profile
