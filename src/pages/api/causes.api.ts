import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const causesApi = {
  async getAll() {
    try {
      const res = await mainClient.post('/topics/causes', {
        ownerIds: [],
      })
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
