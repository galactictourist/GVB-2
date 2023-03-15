import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

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
