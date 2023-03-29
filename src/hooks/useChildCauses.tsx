import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { SubCauseTopicEntity } from '~/types/entity/topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useChildCauses = () => {
  return useQuery<SubCauseTopicEntity[]>(['child-causes'], async () => {
    const { data: resp } = await mainClient.get('/topics/causes/childs')

    return resp.data
  })
}
