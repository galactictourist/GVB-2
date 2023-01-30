import { BaseEntity } from './base.entity'

export interface TopicEntity extends BaseEntity {
  name: string
  parentId?: string
}
