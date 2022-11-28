import { createSlice } from '~/utils/@reduxjs/toolkit'
import { useInjectReducer, useInjectSaga } from '~/utils/redux-injectors'
import { CollectionState } from '../types'

export const initialState: CollectionState = {}

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
})

export const { actions: userActions, reducer } = collectionSlice

export const useUserSlice = () => {
  useInjectReducer({ key: collectionSlice.name, reducer: collectionSlice.reducer })
  useInjectSaga({ key: collectionSlice.name, saga: function* () {} })
  return { actions: collectionSlice.actions }
}
