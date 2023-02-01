import { createSlice } from '~/utils/@reduxjs/toolkit'

const nftSlice = createSlice({
  name: 'nft',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {
    /**
     * createNft
     */
    createNft(state) {
      state.loading = true
    },
    createNftSuccess(state, action) {
      state.loading = false
      state.error = ''
    },
    createNftFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const { createNft, createNftSuccess, createNftFailure } = nftSlice.actions
export default nftSlice.reducer
