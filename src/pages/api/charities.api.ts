import { adminClient } from './adminClient.api'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

export const charitiesApi = {
  async getAll() {
    try {
      const res = await mainClient.get('/charities')
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async getCharityById(id: string) {
    try {
      const res = await mainClient.get(`/charities/${id}`)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
