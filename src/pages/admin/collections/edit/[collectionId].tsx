import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import AdminContainer from '~/components/Admin/AdminContainer'
import CollectionForm from '~/components/Collections/CollectionForm'
import { useHandleUpdateCollection } from '~/handlers/useHandleUpdateCollection'
import { useHandleUploadImage } from '~/handlers/useHandleUploadImage'
import { useCollection } from '~/hooks/useCollection'
import { ADMIN_PAGES } from '~/utils/constants'

export default function EditCollection() {
  const router = useRouter()
  const { collectionId } = router.query

  const { data: collection, isLoading } = useCollection({
    id: collectionId as string,
  })

  let toastId = ''

  const handleUpdateCollection = useHandleUpdateCollection()
  const handleUploadImage = useHandleUploadImage()

  const updateCollection = (formData: any, imgId: string) => {
    handleUpdateCollection.mutate(
      {
        id: collectionId as string,
        data: {
          imageStorageId: imgId,
          name: formData.name,
          artistAddress: formData.artistAddress,
          description: formData.description,
          topicId: formData.cause,
          status: formData.status
        },
      },
      {
        onSuccess: () => {
          toast.success('Update collection successed.', {
            id: toastId,
          })
          router.push(ADMIN_PAGES.COLLECTIONS.INDEX)
        },
        onError(error: any) {
          console.log(error)
          const errorMsg = error.message ?? 'Update collection failed.'
          toast.error(errorMsg, {
            id: toastId,
          })
        },
      }
    )
  }

  const onSubmit = (data: any) => {
    toastId = toast.loading('Update collection in progress...')
    if (data.file.length > 0) {
      handleUploadImage.mutate(
        { image: data.file[0], postUrl: '/storage/collection/image' },
        {
          onSuccess(resp) {
            updateCollection(data, resp.id)
          },
          onError(error: any) {
            console.log(error)
            const errorMsg = error.message ?? 'Upload image failed.'
            toast.error(errorMsg)
          },
        }
      )
    } else {
      updateCollection(data, collection?.imageStorageId || '')
    }
  }

  return (
    <>
      <AdminContainer>
        <Head>
          <title>GivaBit | Collection </title>
          <meta name="description" content="Edit your own NFT collection" />
        </Head>

        <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
          {isLoading ? (
            <p className="py-4 text-center text-xl text-gray-900">Loading...</p>
          ) :
            <CollectionForm formLabelTexts={{ header: "Edit collection", submitButton: "Update" }} collection={collection} isLoading={isLoading} submitHandler={onSubmit} />
          }
        </div>
      </AdminContainer>
    </>
  )
}
