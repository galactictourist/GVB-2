import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { CollectionEntity } from '~/types/entity/collection.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type MyCausesResp = CollectionEntity[]

export const useMyCauses = () => {
  return useQuery<MyCausesResp>(['my-causes'], async () => {
    const { data: resp } = await mainClient.post('/nfts/_search/causes')
    return resp.data
  })
}
