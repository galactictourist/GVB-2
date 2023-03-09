import { call, put } from 'redux-saga/effects'
import { causesApi } from '~/pages/api/causes.api'
import { getAllCausesFailure, getAllCausesSuccess } from '../slices/causesSlice'

export function* getAllCausesSaga() {
  try {
    const { data } = yield call(causesApi.getAll)
    if (data) {
      yield put(getAllCausesSuccess(data))
    }
  } catch (error) {
    yield put(getAllCausesFailure)
  }
}
