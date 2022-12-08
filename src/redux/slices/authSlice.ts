import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface AuthState {
  id?: string
  wallet?: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isSignedIn: false,
    wallet: '',
    nonce: '',
    error: '',
  },
  reducers: {
    /**
     * getCollections
     */
    generateNonce(state, action) {
      state.loading = true
      state.isSignedIn = false
      //state.wallet = action.payload.wallet
      console.log('SIGN IN SLICE')
    },
    generateNonceSuccess(state, action) {
      state.loading = false
      //state.wallet = action.payload.wallet
      state.nonce = action.payload
      console.log('SIGN IN SUCCESS')
    },
    generateNonceFailure(state, action) {
      state.loading = false
      console.log('SIGN IN FAIL')
    },
    verifySignature(state, action) {
      state.loading = true
      state.isSignedIn = false
    },
    verifySignatureSuccess(state, action) {
      state.loading = false
      state.wallet = action.payload.wallet
      state.isSignedIn = true
      console.log(action.payload)
      console.log(action)
      console.log('VERIFY SUCCESS')
    },
    verifySignatureFailure(state, action) {
      state.loading = false
      state.isSignedIn = false
      console.log('VERIFY FAIL')
    },
  },
})

export const {
  generateNonce,
  generateNonceSuccess,
  generateNonceFailure,
  verifySignature,
  verifySignatureSuccess,
  verifySignatureFailure,
} = authSlice.actions
export default authSlice.reducer
