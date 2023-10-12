import { useQuery } from 'react-query'
import { adminClient } from '~/pages/api/adminClient.api'
import { NftEntity } from '~/types/entity/nft.entity'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

export type MyNftsResp = {
  data: NftEntity[]
  total: number
}

export const useMyNfts = (page: number, limit: number) => {
  return useQuery<MyNftsResp>(['my-nfts', page, limit], async () => {
    const { data: resp } = await mainClient.post('/nfts/_search/mine', {
      pagination: {
        limit,
        page,
      },
    })

    return {
      data: resp.data,
      total: resp.meta.pagination.total,
    }
  })
}
