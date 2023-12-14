import { BaseEntity } from './base.entity'

export interface StorageEntity extends BaseEntity {
  label: string
  location: string
  mimetype: string
  originalname: string
  ownerId: string
  path: string
  size: number
  url: string
  id: string
}
