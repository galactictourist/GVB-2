import { BaseEntity } from './base.entity'
import { TopicEntity } from './topic.entity'

export enum CollectionStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface CollectionEntity extends BaseEntity {
  id: string
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
