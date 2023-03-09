import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const causesApi = {
  async getAll() {
    try {
      const res = await mainClient.get('/topics/causes')
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
