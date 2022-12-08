import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface ICollection {
  name: string
  description: string
  status: string
  ownerId: string
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    loading: false,
    allCollections: [] as ICollection[],
    error: '',
  },
  reducers: {
    /**
     * getCollections
     */
    getCollections(state) {
      state.loading = true
    },
    getCollectionsSuccess(state, action) {
      state.loading = false
      state.allCollections = action.payload
      state.error = ''
    },
    getCollectionsFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const { getCollections, getCollectionsSuccess, getCollectionsFailure } =
  collectionsSlice.actions
export default collectionsSlice.reducer
