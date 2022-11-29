import { put } from 'redux-saga/effects'
import { testReducer1 } from '../slices/adminSlice'

export function* adminSaga(action: any) {
  console.log('Hello from SAGA')
  console.log(action)
  //const { value } = action.payload
  yield put(testReducer1('hejhej'))
}
