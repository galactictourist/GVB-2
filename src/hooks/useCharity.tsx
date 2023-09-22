import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CharityEntity } from '~/types/entity/charities.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useCharity = (chartityId: string | undefined) => {
  return useQuery<CharityEntity>(
    ['charity', chartityId],
    async () => {
      const { data: resp } = await mainClient.get(`/charities/${chartityId}`)

      return resp.data
    },
    {
      enabled: (chartityId ?? '').length > 0,
    }
  )
}
