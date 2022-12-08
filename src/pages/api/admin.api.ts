import { adminClient } from './adminClient.api'

const mainClient = adminClient(process.env.NEXT_PUBLIC_API || '')

export const adminApi = {
  async login(data: any) {
    try {
      const res = await mainClient.post('/admin/auth/signin', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
  async createTopic(data: any) {
    try {
      const res = await mainClient.post('/admin/topics', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log('API RESPONSE ERROR WHEN CREATE TOPIC')
      console.log(err)
      throw err
    }
  },
  async updateTopic(id: string, data: any) {
    console.log('HELLO FROM UPDATE TOPIC API')
    try {
      const res = await mainClient.put(`/admin/topics/${id}`, data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log('API RESPONSE ERROR WHEN UPDATE TOPIC')
      console.log(err)
      throw err
    }
  },
}
