import { BaseEntity } from './base.entity'
import { CharityEntity } from './charities.entity'

export interface CharityTopicEntity extends BaseEntity {
  name?: string
  charity: CharityEntity
  charityId: string
  topicId: string
  wallet: string
}
