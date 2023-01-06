import { TypedDataDomain, TypedDataField } from 'ethers'

export interface TypedData<T extends Record<string, any>> {
  domain: TypedDataDomain
  primaryType?: string
  types: Record<string, Array<TypedDataField>>
  message: T
}
