import axios, { AxiosInstance } from 'axios'
import { BigNumberish } from 'ethers'
import { parseCookies } from 'nookies'
import { CountryEntity } from '~/types/entity'
import { CharityEntity } from '~/types/entity/charities.entity'
import { NftEntity } from '~/types/entity/nft.entity'
import { TopicEntity } from '~/types/entity/topic.entity'
import { USER_COOKIES } from '~/utils/constants'

export class GivabitApi {
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

  async nftSearchMine(page: number, limit: number) {
    const cookies = await parseCookies()
    const { data: result } = await this.instance.post(
      '/nfts/_search/mine',
      {
        pagination: {
          page,
          limit,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${cookies[USER_COOKIES.JWT]}`,
        },
      }
    )
    return {
      data: result.data as NftEntity[],
      pagination: {
        total: result.meta.pagination.total,
        limit: result.meta.pagination.limit,
        page: result.meta.pagination.page,
        maxPage: result.meta.pagination.maxPage,
      },
    }
  }

  async getCountries() {
    const { data: result } = await this.instance.get('/countries')
    return {
      data: result.data as CountryEntity[],
    }
  }

  async getTopics() {
    const { data: result } = await this.instance.get('/topics')
    return {
      data: result.data as TopicEntity[],
    }
  }

  async getCharities() {
    const { data: result } = await this.instance.get('/charities')
    return {
      data: result.data as CharityEntity[],
    }
  }

  async sellNfts(info: {
    nfts: string[]
    countryCode: string
    topicId: string
    charityId: string
    price: number
    network: string
    currency: string
  }) {
    const { data: result } = await this.instance.post('/marketplace/sale', info)
    return {
      data: result.data,
    }
  }

  async mint(nftId: string, nonce: BigNumberish) {
    const { data: result } = await this.instance.post(`/nfts/${nftId}/mint`, {
      nonce: nonce.toString(),
    })
    return {
      data: result.data,
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

export const givabitApi = new GivabitApi(process.env.NEXT_PUBLIC_API || '')
