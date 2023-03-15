import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type AllCollectionsResp = CollectionEntity[]

export const useAllCollections = () => {
  return useQuery<AllCollectionsResp>(['all-collections'], async () => {
    const { data: resp } = await mainClient.post('/collections/_search', {
      ownerIds: [],
    })

    return resp.data
  })
}
