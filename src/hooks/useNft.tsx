import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type NftResp = NftEntity

export const useNft = ({ id }: { id: string }) => {
  return useQuery<NftResp>([`nft-${id}`], async () => {
    const { data: resp } = await mainClient.get(`/nfts/${id}`)

    return resp.data
  })
}
