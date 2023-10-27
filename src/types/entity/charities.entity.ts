import { BaseEntity } from './base.entity'

export interface CharityEntity extends BaseEntity {
  name: string
  parentId?: string
  status: string
}
