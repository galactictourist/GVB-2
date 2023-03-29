import { BigNumberish } from 'ethers'
import { TypedData } from '../web3'
import { BaseEntity } from './base.entity'
import { NftEntity } from './nft.entity'

export interface SaleContractData extends Record<string, any> {
  nftContract: string
  seller: string
  isMinted: boolean
  tokenId: string
  tokenURI: string
  quantity: BigNumberish
  itemPrice: BigNumberish
  itemType: BigNumberish
  charityAddress: string
  charityShare: BigNumberish
  royaltyFee: BigNumberish
  deadline: BigNumberish
  salt: BigNumberish
}

export interface SaleEntity extends BaseEntity {
  nftId: string
  nft?: NftEntity
  charityId: string
  charityShare: number
  charityWallet: string
  countryCode: string
  currency: string
  expiredAt: string
  hash: string
  network: string
  price: string
  quantity: number
  remainingQuantity: number
  signature: string
  signedData: TypedData<SaleContractData>
  status: string
  topicId: string
  userId: string
}
