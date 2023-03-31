import { BaseEntity } from './base.entity'

export interface UserEntity extends BaseEntity {
  countryCode: string
  name: string
  status: string
  wallet: string
  imageUrl: string
}
