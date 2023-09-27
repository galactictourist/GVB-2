import { createSlice } from '~/utils/@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    id: '',
    role: '',
    status: '',
    username: '',
    error: '',
  },
  reducers: {
    login(state, action) {
      state.loading = true
    },
    loginSuccess(state, action) {
      const { user } = action.payload
      const { id, role, status, username } = user
      state.loading = false
      state.id = id
      state.role = role
      state.status = status
      state.username = username
      state.error = ''
    },
    loginFailure(state, action) {
      state.loading = false
      state.id = ''
      state.role = ''
      state.status = ''
      state.username = ''
      state.error = action.payload.message
    },
    logout(state) {
      state.id = ''
      state.role = ''
      state.status = ''
      state.username = ''
    },
    /**
     * createTopic
     */
    createTopic(state, action) {
      state.loading = true
      state.error = ''
    },
    createTopicSuccess(state, action) {
      state.loading = false
      state.error = ''
    },
    createTopicFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    /**
     * updateTopic
     */
    updateTopic(state, action) {
      state.loading = true
      state.error = ''
    },
    updateTopicSuccess(state, action) {
      state.loading = false
      state.error = ''
    },
    updateTopicFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  login,
  logout,
  loginSuccess,
  loginFailure,
  createTopic,
  createTopicSuccess,
  createTopicFailure,
  updateTopic,
  updateTopicSuccess,
  updateTopicFailure,
} = adminSlice.actions
export default adminSlice.reducer
