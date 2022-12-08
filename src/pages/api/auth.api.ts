import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const authApi = {
  async generateNonce(data: any) {
    try {
      const res = await mainClient.post('/auth/signin/wallet/nonce', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async verifySignature(data: any) {
    try {
      const res = await mainClient.post('user/verify-signature', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
