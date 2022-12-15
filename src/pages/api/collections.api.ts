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
  async getMy(data: any) {
    try {
      const { ownerIds } = data
      const params = { ownerIds: [ownerIds] }
      const res = await mainClient.post('/collections/_search', params)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async create(data: any) {
    try {
      const res = await mainClient.post('/collections', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },

  async update(id: string, data: any) {
    console.log('update request')
    try {
      const res = await mainClient.put(`/collections/${id}`, data)
      const resBody = res.data
      return resBody
    } catch (err) {
      console.log('API RESPONSE ERROR WHEN UPDATE COLLECTION')
      console.log(err)
      throw err
    }
  },
}
