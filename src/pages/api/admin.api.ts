import axios, { AxiosInstance } from 'axios'

export class AdminApi {
  private instance: AxiosInstance
  private ADMIN_KEY = 'admin-token'

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(this.ADMIN_KEY)
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })
  }

  async adminLogin(username: string, password: string) {
    const { data: result } = await this.instance.post('/auth/admin/signin', {
      username: username,
      password: password,
    })
    const {
      data: { accessToken },
    } = result.data
    localStorage.setItem(this.ADMIN_KEY, result.data.accessToken)
    console.log(accessToken)
    return {
      accessToken,
    }
  }
}

export const adminApi = new AdminApi(process.env.NEXT_PUBLIC_API || '')
