import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CharityEntity } from '~/types/entity/charities.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const useCharities = () => {
  return useQuery<CharityEntity[]>(['charities'], async () => {
    const { data: resp } = await mainClient.get('/charities')

    return resp.data
  })
}
