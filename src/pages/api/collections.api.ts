import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const collectionsApi = {
  async getAll() {
    try {
      const res = await mainClient.post('/collections/_search', {
        ownerIds: [],
      })
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
