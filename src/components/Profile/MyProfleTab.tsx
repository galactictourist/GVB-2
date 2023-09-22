import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiEdit } from 'react-icons/bi'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'
import Avatar from '../../../public/img/avatar.png'
import FacebookIcon from '../../../public/img/facebook.svg'
import InstagramIcon from '../../../public/img/instagram.svg'
import TwitterIcon from '../../../public/img/twitter.svg'

interface Props {
  profile: any
  updateUser: (data: any, imageUrl: string) => void
}

const MyProfileTab = ({ profile, updateUser }: Props) => {
  const { handleSubmit, register } = useForm()

  const [avatar, setAvatar] = useState<any | null>()
  const [previewAvatar, setPreviewAvatar] = useState<any>()

  const handleUploadImage = useHandleUploadImage()

  const onSubmit = (data: any) => {
    console.log(data)
    if (!avatar) {
      updateUser(data, profile?.imageUrl)
      return
    }
    handleUploadImage.mutate(
      { image: avatar, postUrl: '/storage/profile/image' },
      {
        onSuccess(resp) {
          const imgUrl = resp.url
          updateUser(data, imgUrl)
        },
        onError(error: any) {
          console.log(error)
          const errorMsg = error.message ?? 'Upload avatar failed.'
          toast.error(errorMsg)
        },
      }
    )
  }

  const getSocialUrl = (data: any, key: string) => {
    if (data && data.socialMedia) {
      return data.socialMedia[key]
    }
    return ''
  }

  const onSelectAvatar = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar(Avatar)
    } else {
      const previewUrl = URL.createObjectURL(e.target.files[0])
      setAvatar(e.target.files[0])
      setPreviewAvatar(previewUrl)
    }
  }

  const getAvatar = () => {
    if (previewAvatar) return previewAvatar
    if (profile && profile.imageUrl) return profile.imageUrl
    return Avatar
  }

  return (
    <div className="relative pt-4 pb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-lg bg-n4gMediumTeal p-5">
          <p className="px-4 py-2 text-xl font-bold text-n4gWhite">Basic</p>
          <div className="flex justify-center">
            <div className="group relative h-[6rem] w-[6rem] overflow-hidden rounded-full bg-n4gWhite shadow-lg lg:h-40 lg:w-40">
              <Image src={getAvatar()} alt="Avatar" className="rounded-full" layout="fill" />
              <div
                className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#546198] opacity-0 group-hover:opacity-75"
                key="editIcon"
              >
                <BiEdit fontSize={30} color="white" />
              </div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={onSelectAvatar}
              />
            </div>
          </div>

          <div className="rounded-lg p-4">
            <label className="text-md block font-medium text-gray-700">
              Official Wallet Address
            </label>
            <div className="mt-1 mb-4">
              <input
                defaultValue={profile?.wallet}
                disabled
                type="text"
                className="n4gForm h-10"
                {...register('wallet')}
              />
            </div>
            <label className="text-md block font-medium text-gray-700">Username</label>
            <div className="mt-1 mb-4">
              <input
                required
                defaultValue={profile?.name}
                type="text"
                className="n4gForm h-10"
                {...register('name')}
              />
            </div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-2">
              <textarea
                required
                rows={3}
                className="n4gForm"
                {...register('description')}
                defaultValue={profile?.description}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-lg bg-n4gMediumTeal p-5">
          <p className="px-4 py-2 text-xl font-bold text-n4gWhite">Social Media</p>
          <div className="rounded-lg p-4">
            <div className="mb-6 flex items-center justify-center">
              <Image src={FacebookIcon} width={20} height={20} />
              <label className="text-md w-[20%] p-2 font-medium text-n4gWhite"> Facebook</label>
              <input
                type="text"
                className="n4gForm h-10"
                placeholder="https://www.facebook.com"
                {...register('facebook')}
                defaultValue={getSocialUrl(profile, 'facebook')}
              />
            </div>
            <div className="mb-6 flex items-center justify-center">
              <Image src={InstagramIcon} width={20} height={20} />
              <label className="text-md w-[20%]  p-2 font-medium text-n4gWhite">Instagram</label>
              <input
                type="text"
                className="n4gForm h-10"
                placeholder="https://www.instagram.com"
                {...register('instagram')}
                defaultValue={getSocialUrl(profile, 'instagram')}
              />
            </div>
            <div className="mb-6 flex items-center justify-center">
              <Image src={TwitterIcon} width={20} height={20} />
              <label className="text-md mb-2 w-[20%]  p-2 font-medium text-n4gWhite">Twitter</label>
              <input
                type="text"
                className="n4gForm h-10"
                placeholder="https://www.twitter.com"
                {...register('twitter')}
                defaultValue={getSocialUrl(profile, 'twitter')}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 min-w-[150px] rounded-full bg-n4gGreen p-3 font-bold text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default MyProfileTab
