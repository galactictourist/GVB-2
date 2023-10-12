import { useMutation } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

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
