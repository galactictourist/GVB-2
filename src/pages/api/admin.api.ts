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
  async createInterest(interest: string, data: any) {
    try {
      const res = await mainClient.post(`/admin/${interest}`, data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log('API RESPONSE ERROR WHEN CREATE INTEREST')
      console.log(err)
      throw err
    }
  },
  async updateInterest(id: string, interest: string, data: any) {
    console.log('HELLO FROM UPDATE INTEREST API')
    console.log({ interest, id })
    try {
      const res = await mainClient.put(`/admin/${interest}/${id}`, data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log('API RESPONSE ERROR WHEN UPDATE INTEREST')
      console.log(err)
      throw err
    }
  },
}
