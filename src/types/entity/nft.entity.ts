import { BaseEntity } from './base.entity'
import { CollectionEntity } from './collection.entity'
import { SaleEntity } from './sale.entity'
import { TopicEntity } from './topic.entity'
import { UserEntity } from './user.entity'
export enum BlockchainNetwork {
  ETHEREUM = 'ETHEREUM',
  BSC = 'BSC',
  POLYGON = 'POLYGON',
  POLYGON_MUMBAI = 'POLYGON_MUMBAI',
}
export enum NftStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum DisplayType {
  BOOST_NUMBER = 'boost_number',
  BOOST_PERCENTAGE = 'boost_percentage',
  NUMBER = 'number',
  DATE = 'date',
}
export interface MetadataAttribute {
  trait_type?: string
  value: string | number
  max_value?: number
  display_type?: DisplayType
}
export interface NftEntity extends BaseEntity {
  network?: BlockchainNetwork
  scAddress?: string
  tokenId?: string
  name: string
  imageUrl: string
  imageIpfsUrl?: string
  external_url?: string
  description?: string
  type: string
  attributes?: MetadataAttribute[]
  // rawMetadata?: object;
  // properties?: object;
  metadataIpfsUrl?: string
  collectionId?: string
  ownerId: string
  status: NftStatus
  creatorWallet?: string
  royalty?: number

  sales: SaleEntity[]

  collection?: CollectionEntity
  owner?: UserEntity
  cause?: TopicEntity
}
