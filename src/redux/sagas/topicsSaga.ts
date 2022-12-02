import { call, put } from 'redux-saga/effects'
import { topicsApi } from '~/pages/api/topics.api'
import { getTopicsFailure, getTopicsSuccess } from '../slices/topicsSlice'

export function* getTopicsSaga() {
  console.log('Hello from topics saga')
  try {
    const { data } = yield call(topicsApi.getAll)
    if (data) {
      yield put(getTopicsSuccess(data))
    }
  } catch (error) {
    yield put(getTopicsFailure(error))
  }
}
