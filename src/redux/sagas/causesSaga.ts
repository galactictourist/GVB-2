import { call, put } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'
import { getAllCausesFailure, getAllCausesSuccess } from '../slices/causesSlice'

export function* getAllCausesSaga() {
  try {
    const { data } = yield call(collectionsApi.getAll)
    if (data) {
      yield put(getAllCausesSuccess(data))
    }
  } catch (error) {
    yield put(getAllCausesFailure)
  }
}
