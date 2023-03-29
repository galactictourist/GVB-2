import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CauseTopicEntity } from '~/types/entity/topic.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type CauseResp = CauseTopicEntity

export const useCause = ({ id }: { id: string | undefined }) => {
  return useQuery<CauseResp>(
    [`cause-${id}/collections`],
    async () => {
      const { data: resp } = await mainClient.post('/topics/causes/collections', {
        topicId: id,
      })

      return resp.data.length > 0 ? resp.data[0] : null
    },
    {
      enabled: !(!id || id.length === 0),
    }
  )
}
