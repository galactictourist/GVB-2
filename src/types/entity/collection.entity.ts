import { BaseEntity } from './base.entity'

export enum CollectionStatus {
  ACTIVE = 'ACTIVE',
  PUBLISHED = 'PUBLISHED',
}

export interface CollectionEntity extends BaseEntity {
  name: string
  description: string
  imageStorageId: string
  imageUrl: string
  ownerId: string
  topicId: string
  status: string
}
