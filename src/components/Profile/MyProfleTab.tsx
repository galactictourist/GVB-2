import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiEdit } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'
import { useMyCollections } from '~/hooks/useMyCollections'
import { RootState } from '~/types'
import Avatar from '../../../public/img/avatar.png'
import FacebookIcon from '../../../public/img/facebook.svg'
import InstagramIcon from '../../../public/img/instagram.svg'
import TwitterIcon from '../../../public/img/twitter.svg'

interface Props {
  profile: any,
  updateUser: (data: any, imageUrl: string) => void
}

const MyProfileTab = ({ profile, updateUser }: Props) => {

  const { handleSubmit, register } = useForm()
  const { id } = useSelector((state: RootState) => state.auth)
  const { data: collections } = useMyCollections(id)
  const [avatar, setAvatar] = useState<any | null>()
  const [previewAvatar, setPreviewAvatar] = useState<any>()

  const handleUploadImage = useHandleUploadImage()


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
    return ''
  }

  const onSelectAvatar = (e: any) => {
    console.log("Asdfsd")
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar(Avatar)
      console.log("daqfa")
    }
    else {
      const previewUrl = URL.createObjectURL(e.target.files[0])
      setAvatar(e.target.files[0])
      setPreviewAvatar(previewUrl)
      console.log(previewUrl)
    }
  }

  const getAvatar = () => {
    if (previewAvatar) return previewAvatar
    if (profile && profile.imageUrl) return profile.imageUrl
    return Avatar
  }

  return (
    <div className="relative pt-4 pb-8">
      <form onSubmit={onSubmit}>
        <div className="p-5 bg-n4gMediumTeal rounded-lg">
          <p className="px-4 py-2 text-n4gWhite font-bold text-xl">Basic</p>
          <div className="flex justify-center">
            <div className="group relative h-[6rem] w-[6rem] rounded-full shadow-lg lg:h-40 lg:w-40 overflow-hidden bg-n4gWhite">
              <Image
                src={getAvatar()}
                alt="Avatar"
                className="rounded-full"
                layout="fill"
              />
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
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <label className="block text-md font-medium text-gray-700">
              Officail Wallet Address
            </label>
            <div className="mt-1 mb-4">
              <input defaultValue={profile?.wallet} disabled type="text" className="n4gForm h-10" />
            </div>
            <label className="block text-md font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 mb-4">
              <input defaultValue={profile?.name} required type="text" className="n4gForm h-10" {...register('name')} />
            </div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-2">
              <textarea required rows={3} className="n4gForm" {...register('description')} defaultValue={profile?.description} />
            </div>
          </div>
        </div>
        <div className="p-5 bg-n4gMediumTeal rounded-lg mt-6">
          <p className="px-4 py-2 text-n4gWhite font-bold text-xl">Social Media</p>
          <div className="p-4 rounded-lg">
            <div className="mb-6 flex items-center justify-center">
              <Image src={FacebookIcon} width={20} height={20} />
              <label className="text-md font-medium text-n4gWhite p-2 w-[20%]"> Facebook</label>
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
              <label className="text-md font-medium  text-n4gWhite p-2 w-[20%]">Instagram</label>
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
              <label className="mb-2 text-md font-medium  text-n4gWhite p-2 w-[20%]">Twitter</label>
              <input
                type="text"
                className="n4gForm h-10"
                placeholder='https://www.twitter.com'
                {...register('twitter')}
                defaultValue={getSocialUrl(profile, 'twitter')}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="text-white font-bold rounded-full bg-n4gGreen p-3 mt-4 min-w-[150px]">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default MyProfileTab
