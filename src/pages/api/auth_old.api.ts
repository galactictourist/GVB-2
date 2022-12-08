import axios, { AxiosInstance } from 'axios'

export class AuthApi {
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

  async getNonce(address: string) {
    const { data: result } = await this.instance.post('/auth/signin/wallet/nonce', {
      wallet: address,
    })
    return result.data.message as string
  }

  async loginUsingWallet(address: string, signature: string) {
    const { data: result } = await this.instance.post('/auth/signin/wallet', {
      wallet: address,
      signature,
    })
    const {
      user: { id, wallet },
      accessToken,
    } = result.data
    localStorage.setItem(this.TOKEN_KEY, result.data.accessToken)
    return {
      user: { id, wallet },
      accessToken,
    }
  }

  deleteToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  isSignedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  async getMe() {
    const { data: result } = await this.instance.get('/users/me')
    const { id, wallet } = result.data
    return { id, wallet }
  }
}

export const authApi = new AuthApi(process.env.NEXT_PUBLIC_API || '')
