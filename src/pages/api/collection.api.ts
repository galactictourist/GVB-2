import axios, { AxiosInstance } from 'axios'

export class CollectionApi {
  private instance: AxiosInstance
  private TOKEN_KEY = 'givabit-token'

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(this.TOKEN_KEY)
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })
  }

  async createCollection(name: string, description: string) {
    const { data: result } = await this.instance.post('/collections', {
      name: name,
      description: description,
    })
    return result.data.message as string
  }

  async getMe() {
    const { data: result } = await this.instance.get('/users/me')
    const { id, wallet } = result.data
    return { id, wallet }
  }
}

export const collectionApi = new CollectionApi(process.env.NEXT_PUBLIC_API || '')
