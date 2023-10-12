import { useMutation } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

type UpdateCollectionResponse = {
  data: CollectionEntity
}

export const useHandleUpdateCollection = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: any }): Promise<UpdateCollectionResponse> => {
      const { data: resp } = await mainClient.put(`/collections/${id}`, data)

      return {
        data: resp.data,
      }
    }
  )
}
