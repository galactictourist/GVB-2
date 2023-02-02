import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const nftApi = {
  async createNft(data: any) {
    try {
      const res = await mainClient.post('/nfts', data)
      const resBody = res.data
      console.log(resBody)
      return resBody
    } catch (err) {
      throw err
    }
  },
}
