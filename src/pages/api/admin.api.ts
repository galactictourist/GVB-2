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
    console.log('HELLO FROM CREATE TOPIC API')
    try {
      const res = await mainClient.post('/admin/topics', data)
      const resBody = res.data
      console.log('API RESPONDE')
      console.log(resBody)
      return resBody
    } catch (err) {
      console.log('API RESPONDE ERROR')
      throw err
    }
  },
}
