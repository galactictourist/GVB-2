import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type CollectionResp = CollectionEntity

export const useCollection = ({ id }: { id: string | undefined }) => {
  return useQuery<CollectionResp>(
    [`collection-${id}`],
    async () => {
      const { data: resp } = await mainClient.get(`/collections/${id}`)

      return resp.data
    },
    {
      enabled: !(!id || id.length === 0),
    }
  )
}
