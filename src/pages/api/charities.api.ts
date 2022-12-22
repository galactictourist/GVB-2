import { userClient } from './userClient.api'

const mainClient = userClient(process.env.NEXT_PUBLIC_API || '')

export const charitiesApi = {
  // async getCharities() {
  //   const { data: result } = await this.instance.get('/charities')
  //   return {
  //     data: result.data as CharityEntity[],
  //   }
  // }
}
