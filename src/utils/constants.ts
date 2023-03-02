import { polygonMumbai } from 'wagmi/chains'

export const COOKIES = {
  JWT: 'snmjwt',
  WALLET_CONNECTED: 'is-wallet-connected',
}

export const USER_COOKIES = {
  JWT: 'user_snmjwt',
  WALLET_CONNECTED: 'user_is-wallet-connected',
}

export const CHAIN_ID = polygonMumbai.id
