import { BaseEntity } from './base.entity'
import { TopicEntity } from './topic.entity'

export enum CollectionStatus {
  ACTIVE = 'ACTIVE',
  PUBLISHED = 'PUBLISHED',
}

export interface CollectionEntity extends BaseEntity {
  name: string
  artistAddress: string
  description: string
  imageStorageId: string
  imageUrl: string
  ownerId: string
  topicId: string
  status: string
  cause: string
  topic: TopicEntity
}
