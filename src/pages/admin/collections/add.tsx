import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import AdminContainer from '~/components/Admin/AdminContainer'
import CollectionForm from '~/components/Collections/CollectionForm'
import { useHandleCreateCollection } from '~/handlers/useHandleCreateCollection'
import { ADMIN_PAGES } from '~/utils/constants'

export default function CreateCollection() {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleCreateCollection = useHandleCreateCollection()

  const onSubmit = (data: any) => {
    const formData = new FormData()

    if (data.file.length > 0) {
      formData.append('file', data.file[0])
    }

    formData.append('name', data.name)
    formData.append('artistAddress', data.artistAddress)
    formData.append('description', data.description)
    formData.append('topicId', data.cause)
    setLoading(true)
    const toastId = toast.loading('Create collection in progress...')

    handleCreateCollection.mutate(
      {
        data: formData,
      },
      {
        onSuccess: () => {
          setLoading(false)
          toast.success('Create collection successed.', {
            id: toastId,
          })
          router.push(ADMIN_PAGES.COLLECTIONS.INDEX)
        },
        onError(error: any) {
          console.log(error)
          setLoading(false)
          const errorMsg = error.message ?? 'Create collection failed.'
          toast.error(errorMsg, {
            id: toastId,
          })
        },
      }
    )
  }

  return (
    <>
      <AdminContainer>
        <Head>
          <title>GivaBit | Admin | Create Collection </title>
          <meta name="description" content="Create your own NFT collection" />
        </Head>

        <div className="mx-auto max-w-2xl px-10 lg:max-w-7xl">
          <CollectionForm formLabelTexts={{ header: "Create collection", submitButton: "Create" }} isLoading={isLoading} submitHandler={onSubmit} />
        </div>
      </AdminContainer>
    </>
  )
}
