import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

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
