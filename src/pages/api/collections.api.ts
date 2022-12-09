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
  async create(data: any) {
    try {
      // const cookies = await parseCookies()
      // if (cookies[USER_COOKIES.JWT]) {
      //   const test = `Bearer ${cookies[USER_COOKIES.JWT]}`
      //   console.log('TTTTTTEST')
      //   console.log(test)
      // }
      const res = await mainClient.post('/collections', data)
      const resBody = res.data
      return resBody
    } catch (err) {
      throw err
    }
  },
}
