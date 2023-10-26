import { useQuery } from 'react-query'
import { NftBatch } from '~/components/Nfts/BatchPanel'
import { userClient } from '~/pages/api/userClient.api'
import { CharityTopicEntity } from '~/types/entity/charity-topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useCharitiesByTopic = (batch: NftBatch) => {
  const id = batch.cause[0]?.id;
  return useQuery<CharityTopicEntity[]>(
    ['charity', id],
    async () => {
      const { data: resp } = await mainClient.get(`/topics/${id}/charities`)
      return resp.data
    },
    {
      enabled: !!id,
    }
  )
}
