import { useMutation } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

type CreateCollectionResponse = {
  data: CollectionEntity
}

export const useHandleCreateCollection = () => {
  return useMutation(async ({ data }: { data: any }): Promise<CreateCollectionResponse> => {
    const { data: resp } = await mainClient.post('/collections', data)

    return {
      data: resp.data,
    }
  })
}
