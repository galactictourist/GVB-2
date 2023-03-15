import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { TopicEntity } from '~/types/entity/topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type AllCausesResp = TopicEntity[]

export const useAllCauses = () => {
  return useQuery<AllCausesResp>(['all-causes'], async () => {
    const { data: resp } = await mainClient.get('/topics/causes')

    return resp.data
  })
}
