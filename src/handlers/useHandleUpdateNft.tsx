import { useMutation } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

type UpdateNftResponse = {
  data: NftEntity
}

export const useHandleUpdateNft = () => {
  return useMutation(async ({ id, data }: { id: string | undefined; data: any }): Promise<UpdateNftResponse> => {
    const { data: resp } = await mainClient.put(`/nfts/${id}`, data)

    return {
      data: resp.data,
    }
  })
}
