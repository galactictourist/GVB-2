import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

type CreateCollectionResponse = {
  data: CollectionEntity
}

export const useHandleCreateBatch = () => {
  return useMutation(async ({ collectionId, data }: { collectionId: string, data: any }) => {
    const { data: resp } = await mainClient.post(`/batches/${collectionId}`, data)
    return {
      data: resp.data,
    }
  })
}
