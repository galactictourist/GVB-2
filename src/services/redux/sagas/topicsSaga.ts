import { call, put } from 'redux-saga/effects'
import { topicsApi } from '~/pages/api/topics.api'
import {
  getTopicByIdFailure,
  getTopicByIdSuccess,
  getTopicsFailure,
  getTopicsSuccess,
} from '../slices/topicsSlice'

export function* getTopicsSaga() {
  try {
    const { data } = yield call(topicsApi.getAll)
    if (data) {
      yield put(getTopicsSuccess(data))
    }
  } catch (error) {
    yield put(getTopicsFailure(error))
  }
}

export function* getTopicByIDSaga(action: any) {
  try {
    const { id } = action.payload
    const { data } = yield call(topicsApi.getTopicById, id)
    if (data) {
      console.log('GET TOPIC BY ID SUCCESS')
      console.log(data)
      yield put(getTopicByIdSuccess(data))
    }
  } catch (error) {
    console.log('GET TOPIC BY ID FAILURE')
    console.log(error)
    yield put(getTopicByIdFailure(error))
  }
}
