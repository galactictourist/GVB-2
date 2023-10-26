import { BaseEntity } from './base.entity'
import { SaleEntity } from './sale.entity'

export interface BatchEntity extends BaseEntity {
  collectionId: string
  charityId: string
  charityShare: number
  nfts: SaleEntity[]
}
