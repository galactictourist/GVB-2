import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { HomeTopicEntity } from '~/types/entity/topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type HomeCollectionsResp = HomeTopicEntity[]

export const useHomeCollections = () => {
  return useQuery<HomeCollectionsResp>(['home-collections'], async () => {
    const { data: resp } = await mainClient.post('/topics/causes/collections')

    return resp.data
  })
}
