import { AdminState, AuthState, CausesState, TopicState } from '../redux/types'
import { NftEntity } from './entity/nft.entity'
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth: AuthState
  causes: CausesState
  topics: TopicState
  admin: AdminState
  nft: NftEntity
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
