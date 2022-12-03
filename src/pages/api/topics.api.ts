import { adminClient } from './adminClient.api'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

export const topicsApi = {
  async getAll() {
    try {
      const res = await mainClient.get('/topics')
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async getTopicById(id: string) {
    try {
      const res = await mainClient.get(`/topics/${id}`)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
