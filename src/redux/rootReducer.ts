import { combineReducers } from 'redux'
import adminReducer from './slices/adminSlice'

const rootReducer = combineReducers({
  admin: adminReducer,
})

export default rootReducer
