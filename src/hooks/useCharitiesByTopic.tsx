import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CharityTopicEntity } from '~/types/entity/charity-topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useCharitiesByTopic = (causeId: string) => {
  return useQuery<CharityTopicEntity[]>(
    ['charity', causeId],
    async () => {
      const { data: resp } = await mainClient.get(`/topics/${causeId}/charities`)
      return resp.data
    },
    {
      enabled: true,
    }
  )
}
