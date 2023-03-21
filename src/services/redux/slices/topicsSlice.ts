import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface ITopic {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  parentId: string
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    loading: false,
    allTopics: [] as ITopic[],
    currentTopic: {} as ITopic,
    error: '',
  },
  reducers: {
    /**
     * getTopics
     */
    getTopics(state) {
      state.loading = true
      state.currentTopic = {} as ITopic
    },
    getTopicsSuccess(state, action) {
      state.loading = false
      state.allTopics = action.payload
      state.error = ''
    },
    getTopicsFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    getTopicById(state, action) {
      state.loading = true
      state.currentTopic = {} as ITopic
    },
    getTopicByIdSuccess(state, action) {
      state.loading = false
      state.currentTopic = Object.assign(action.payload)
    },
    getTopicByIdFailure(state, action) {
      state.loading = false
      state.currentTopic = Object.assign(action.payload)
    },
  },
})

export const {
  getTopics,
  getTopicsSuccess,
  getTopicsFailure,
  getTopicById,
  getTopicByIdSuccess,
  getTopicByIdFailure,
} = topicsSlice.actions
export default topicsSlice.reducer
