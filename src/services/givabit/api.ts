import axios, { AxiosInstance } from 'axios'
import { BigNumberish } from 'ethers'
import Cookies from 'js-cookie'
import { CountryEntity } from '~/types/entity'
import { NftEntity } from '~/types/entity/nft.entity'
import { SaleEntity } from '~/types/entity/sale.entity'
import { TopicEntity } from '~/types/entity/topic.entity'
import { USER_COOKIES } from '~/utils/constants'

interface NftItem {
  id: string
  price: number
  rank: number
}

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
    const cookies = Cookies.get(USER_COOKIES.JWT)
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
          Authorization: `Bearer ${cookies}`,
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

  async nftSearch(filter: { ids?: string[] }, page: number, limit: number) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post(
      '/nfts/_search',
      {
        pagination: {
          page,
          limit,
        },
        filter: {
          ids: filter.ids,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
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

  async saleSearch(filter: { nftIds?: string[] }, page: number, limit: number) {
    const { data: result } = await this.instance.post('/sales/_search', {
      pagination: {
        page,
        limit,
      },
      filter: {
        nftIds: filter.nftIds,
      },
    })
    return {
      data: result.data as SaleEntity[],
      pagination: {
        total: result.meta.pagination.total,
        limit: result.meta.pagination.limit,
        page: result.meta.pagination.page,
        maxPage: result.meta.pagination.maxPage,
      },
    }
  }

  async saleSearchMine(filter: { nftIds?: string[] }, page: number, limit: number) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post(
      '/sales/_search/mine',
      {
        pagination: {
          page,
          limit,
        },
        filter: {
          nftIds: filter.nftIds,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    )
    return {
      data: result.data as SaleEntity[],
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

  async signingNftSale(info: {
    nftId: string
    countryCode: string
    // topicId: string
    charityId: string
    charityShare: number
    price: number
    network: string
    currency: string
    quantity: number
    expiryInMinutes: number
  }) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post('/sales/signing', info, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    })
    return {
      data: result.data,
    }
  }

  async signNftBatch(info: {
    countryCode: string
    charityId: string
    charityShare: number
    network: string
    currency: string
    expiryInMinutes: number,
    nfts: NftItem[]
  }) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post('/sales/signNftBatch', info, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    })
    return {
      data: result.data,
    }
  }

  async createSale(sale: { clientSignature: string; saleData: string; serverSignature: string }) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post('/sales', sale, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    })
    return {
      data: result.data,
    }
  }

  async deleteSale(id: string) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.delete(`/sales/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    })
    return {
      data: result.data,
    }
  }

  async createBatchSale(sale: { clientSignature: string; saleData: string; serverSignature: string }) {
    const cookies = Cookies.get(USER_COOKIES.JWT)
    const { data: result } = await this.instance.post('/sales/batch', sale, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    })
    return {
      data: result.data,
    }
  }

  async mint(nftId: string, nonce?: BigNumberish) {
    const { data: result } = await this.instance.post(`/nfts/${nftId}/mint`, {
      nonce: nonce?.toString(),
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
