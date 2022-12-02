import { createSlice } from '~/utils/@reduxjs/toolkit'

export interface ITopic {
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
    error: '',
  },
  reducers: {
    /**
     * getTopics
     */
    getTopics(state) {
      state.loading = true
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
  },
})

export const { getTopics, getTopicsSuccess, getTopicsFailure } = topicsSlice.actions
export default topicsSlice.reducer
