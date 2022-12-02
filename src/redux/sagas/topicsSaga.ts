import { call, put } from 'redux-saga/effects'
import { topicsApi } from '~/pages/api/topics.api'
import { getTopicsFailure, getTopicsSuccess } from '../slices/topicsSlice'

export function* getTopicsSaga() {
  try {
    const { data } = yield call(topicsApi.getAll)
    if (data) {
      console.log('CREATE TOPIC SUCCESS')
      console.log('data')
      yield put(getTopicsSuccess(data))
    }
  } catch (error) {
    yield put(getTopicsFailure(error))
  }
}
