import { BaseEntity } from './base.entity'
import { CollectionEntity } from './collection.entity'

export interface TopicEntity extends BaseEntity {
  name: string
  parentId?: string
}

export interface CauseTopicEntity {
  id: string
  name: string
  collections: CollectionEntity[]
}

export interface SubCauseTopicEntity {
  id: string
  name: string
  children: TopicEntity[]
}
