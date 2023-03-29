import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type MyCollectionsResp = CollectionEntity[]

export const useMyCollections = (ownerId: string | undefined) => {
  return useQuery<MyCollectionsResp>(
    ['my-collections'],
    async () => {
      if (!ownerId) {
        throw Error('Owner ids field empty')
      }

      const { data: resp } = await mainClient.post('/collections/_search', {
        ownerIds: [ownerId],
      })

      return resp.data
    },
    {
      enabled: !(!ownerId || ownerId.length === 0),
    }
  )
}
