import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const storageApi = {
  async postImage(data: any) {
    console.log('POST IMAGE API')
    console.log(data)
    try {
      const res = await mainClient.post('/storage/nft/image', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
