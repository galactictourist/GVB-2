import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const storageApi = {
  async postImage(data: any) {
    try {
      mainClient.defaults.headers['Content-Type'] = 'multipart/form-data'
      const res = await mainClient.post('/storage/nft/image', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}
