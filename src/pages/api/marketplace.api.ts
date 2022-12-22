import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const marketplaceApi = {
  // async sellNfts(info: {
  //   nfts: string[]
  //   countryCode: string
  //   topicId: string
  //   charityId: string
  //   price: number
  //   network: string
  //   currency: string
  // }) {
  //   const { data: result } = await this.instance.post('/marketplace/sale', info)
  //   return {
  //     data: result.data,
  //   }
  // }
}
