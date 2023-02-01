import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const nftApi = {
  async createNft(data: any) {
    console.log('CREATE NFT API')
    console.log(data)
    console.log(mainClient)
    try {
      const res = await mainClient.post('/collections', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
