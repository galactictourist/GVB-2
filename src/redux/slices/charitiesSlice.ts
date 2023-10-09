import { createSlice } from '~/utils/@reduxjs/toolkit'
import { ITopic } from './topicsSlice'

const charitiesSlice = createSlice({
  name: 'charities',
  initialState: {
    loading: false,
    allCharities: [] as ITopic[],
    currentCharity: {} as ITopic,
    error: '',
  },
  reducers: {
    /**
     * getCharitys
     */
    getCharities(state) {
      state.loading = true
      state.currentCharity = {} as ITopic
    },
    getCharitiesSuccess(state, action) {
      state.loading = false
      state.allCharities = action.payload
      state.error = ''
    },
    getCharitiesFailure(state, action) {
      state.loading = false
      state.error = action.payload.error
    },
    getCharityById(state, action) {
      state.loading = true
      state.currentCharity = {} as ITopic
    },
    getCharityByIdSuccess(state, action) {
      state.loading = false
      state.currentCharity = Object.assign(action.payload)
    },
    getCharityByIdFailure(state, action) {
      state.loading = false
      state.currentCharity = Object.assign(action.payload)
    },
  },
})

export const {
  getCharities,
  getCharitiesSuccess,
  getCharitiesFailure,
  getCharityById,
  getCharityByIdSuccess,
  getCharityByIdFailure,
} = charitiesSlice.actions
export default charitiesSlice.reducer
