import { BaseEntity } from './base.entity'
import { CharityTopicEntity } from './charity-topic.entity'

export interface CharityEntity extends BaseEntity {
  name: string
  parentId?: string
  status: string
  charityTopics: CharityTopicEntity[]
}
