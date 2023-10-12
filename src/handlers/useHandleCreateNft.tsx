import { useMutation } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

type CreateNftResponse = {
  data: NftEntity
}

export const useHandleCreateNft = () => {
  return useMutation(async ({ data }: { data: any }): Promise<CreateNftResponse> => {
    const { data: resp } = await mainClient.post('/nfts', data)

    return {
      data: resp.data,
    }
  })
}
