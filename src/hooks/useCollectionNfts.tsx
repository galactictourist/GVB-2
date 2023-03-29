import { useQuery } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export type CollectionNftsResp = NftEntity[]

export const useCollectionNfts = ({ id }: { id: string | undefined }) => {
  return useQuery<CollectionNftsResp>(
    [`collection-nfts-${id}`],
    async () => {
      const { data: resp } = await mainClient.get(`/collections/${id}/nfts`)

      return resp.data
    },
    {
      enabled: !(!id || id.length === 0),
    }
  )
}
