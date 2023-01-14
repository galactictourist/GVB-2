import { call, put } from 'redux-saga/effects'
import { storageApi } from '~/pages/api/storage.api'
import { postImageFailure, postImageSuccess } from '../slices/storageSlice'

export function* postImageSaga(action: any) {
  try {
    const { data } = yield call(storageApi.postImage, action.payload)
    if (data) {
      console.log('POST IMAGE SUCCESS')
      console.log(data)
      yield put(postImageSuccess)
    }
  } catch (error) {
    yield put(postImageFailure(error))
  }
}
