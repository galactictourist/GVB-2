import { polygonMumbai } from 'wagmi/chains'

export const COOKIES = {
  JWT: 'admin_snmjwt',
}

export const USER_COOKIES = {
  ID: 'user_givabit_id',
  WALLET_ADDRESS: 'user_givabit_wallet',
  JWT: 'user_snmjwt',
}

export const CHAIN_ID = polygonMumbai.id

export const ADMIN_PAGES = {
  HOME: '/admin/dashboard',
  USERS: '/admin/users',
  CAUSES: {
    INDEX: '/admin/causes',
    CREATE: '/admin/causes/createCause',
  },
  COLLECTIONS: {
    INDEX: '/admin/collections',
    CREATE: '/admin/collections/add',
    EDIT: '/admin/collections/edit/',
  },
  CHARITIES: {
    INDEX: '/admin/charities',
    CREATE: '/admin/charities/createCharity',
  }
}

export const maxDisplayedUploadedImages = 50;
export const maxDisplayedNfts = 60;
