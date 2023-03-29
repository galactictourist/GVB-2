import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CauseTopicEntity } from '~/types/entity/topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type CauseCollectionsResp = CauseTopicEntity[]

export const useCauseCollections = () => {
  return useQuery<CauseCollectionsResp>(['cause-collections'], async () => {
    const { data: resp } = await mainClient.post('/topics/causes/collections')

    return resp.data
  })
}
