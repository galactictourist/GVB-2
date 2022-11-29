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
}
