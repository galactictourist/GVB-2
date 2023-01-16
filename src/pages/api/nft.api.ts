import { BigNumberish } from 'ethers'
import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const nftApi = {
  async mint(nftId: string, nonce: BigNumberish) {
    //   const { data: result } = await this.instance.post(`/nfts/${nftId}/mint`, {
    //     nonce: nonce.toString(),
    //   })
    //   return {
    //     data: result.data,
    //   }
  },

  // async nftSearchMine(page: number, limit: number) {
  //   const { data: result } = await this.instance.post('/nfts/_search/mine', {
  //     pagination: {
  //       page,
  //       limit,
  //     },
  //   })
  //   return {
  //     data: result.data as NftEntity[],
  //     pagination: {
  //       total: result.meta.pagination.total,
  //       limit: result.meta.pagination.limit,
  //       page: result.meta.pagination.page,
  //       maxPage: result.meta.pagination.maxPage,
  //     },
  //   }
  // }
}
