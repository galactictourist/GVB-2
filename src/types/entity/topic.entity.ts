import { BaseEntity } from './base.entity'
import { CollectionEntity } from './collection.entity'

export interface TopicEntity extends BaseEntity {
  name: string
  parentId?: string
}

export interface HomeTopicEntity {
  id: string
  name: string
  collections: CollectionEntity[]
}

export interface CauseTopicEntity {
  id: string
  name: string
  children: TopicEntity[]
}
