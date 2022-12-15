import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface ICollection {
  name: string
  description: string
  status: string
  ownerId: string
  id: string
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    loading: false,
    allCollections: [] as ICollection[],
    myCollections: [] as ICollection[],
    error: '',
  },
  reducers: {
    /**
     * getAllCollections
     */
    getAllCollections(state) {
      state.loading = true
    },
    getAllCollectionsSuccess(state, action) {
      state.loading = false
      state.allCollections = action.payload
      state.error = ''
    },
    getAllCollectionsFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    /**
     * getMyCollections
     */
    getMyCollections(state, action) {
      state.loading = true
    },
    getMyCollectionsSuccess(state, action) {
      state.loading = false
      state.myCollections = action.payload
      state.error = ''
    },
    getMyCollectionsFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    /**
     * createCollection
     */
    createCollection(state, action) {
      state.loading = true
    },
    createCollectionSuccess(state, action) {
      state.loading = false
    },
    createCollectionFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    /**
     * editCollection
     */
    updateCollection(state, action) {
      state.loading = true
    },
    updateCollectionSuccess(state, action) {
      state.loading = false
    },
    updateCollectionFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  getAllCollections,
  getAllCollectionsSuccess,
  getAllCollectionsFailure,
  getMyCollections,
  getMyCollectionsSuccess,
  getMyCollectionsFailure,
  createCollection,
  createCollectionSuccess,
  createCollectionFailure,
  updateCollection,
  updateCollectionSuccess,
  updateCollectionFailure,
} = collectionsSlice.actions
export default collectionsSlice.reducer
