import { useMutation } from 'react-query'
import { userClient } from '~/pages/api/userClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

type CreateNftBulkResponse = {
  data: NftEntity[]
}

export const useHandleUploadBulk = () => {
  return useMutation(async ({ data }: { data: any[] }): Promise<CreateNftBulkResponse> => {
    const { data: resp } = await mainClient.post('/nfts/bulk', data)
    return {
      data: resp.data,
    }
  })
}
