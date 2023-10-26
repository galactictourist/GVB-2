import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { BatchEntity } from '~/types/entity/batch.entity'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useBatchesByCollection = ({ id }: CollectionEntity) => {
  return useQuery<BatchEntity[]>(
    ['batch', id],
    async () => {
      const { data: resp } = await mainClient.get(`/batches/${id}`)
      return resp.data
    },
    {
      enabled: !!id
    }
  )
}


