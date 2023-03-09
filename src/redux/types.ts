export interface AuthState {
  id?: string
  wallet?: string
  loading: boolean
}

export interface CollectionsState {}

export interface CausesState {}

export interface StorageState {}

export interface TopicState {}

export interface AdminState {}

export interface ICollection {
  name: string
}

// export interface NftState {}
// Using state from ./types/entity/nft.entity.ts in RootState.ts
