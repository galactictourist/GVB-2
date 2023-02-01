import { createSlice } from '~/utils/@reduxjs/toolkit'

const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    loading: false,
    imageStorageId: '',
    error: '',
  },
  reducers: {
    /**
     * postImage
     */
    postImage(state, action) {
      state.loading = true
    },
    postImageSuccess(state, action) {
      state.loading = false
      state.imageStorageId = action.payload.id
      state.error = ''
    },
    postImageFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const { postImage, postImageSuccess, postImageFailure } = storageSlice.actions
export default storageSlice.reducer
