import { call, put } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'
import {
  createCollectionFailure,
  createCollectionSuccess,
  getAllCollectionsFailure,
  getAllCollectionsSuccess,
  getMyCollectionsFailure,
  getMyCollectionsSuccess,
} from '../slices/collectionsSlice'

export function* getAllCollectionsSaga() {
  try {
    const { data } = yield call(collectionsApi.getAll)
    if (data) {
      yield put(getAllCollectionsSuccess(data))
    }
  } catch (error) {
    yield put(getAllCollectionsFailure)
  }
}
export function* getMyCollectionsSaga(action: any) {
  try {
    const { data } = yield call(collectionsApi.getMy, action.payload)
    if (data) {
      yield put(getMyCollectionsSuccess(data))
    }
  } catch (error) {
    yield put(getMyCollectionsFailure)
  }
}
export function* createCollectionSaga(action: any) {
  try {
    const { data } = yield call(collectionsApi.create, action.payload)
    if (data) {
      yield put(createCollectionSuccess)
    }
  } catch (error) {
    yield put(createCollectionFailure(error))
  }
}
