import { call, put } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'
import {
  createCollectionFailure,
  createCollectionSuccess,
  getCollectionsFailure,
  getCollectionsSuccess,
} from '../slices/collectionsSlice'

export function* getCollectionsSaga() {
  try {
    const { data } = yield call(collectionsApi.getAll)
    if (data) {
      yield put(getCollectionsSuccess(data))
    }
  } catch (error) {
    yield put(getCollectionsFailure)
  }
}

export function* createCollectionSaga(action: any) {
  console.log('Hello from create collections saga')
  try {
    const { data } = yield call(collectionsApi.create, action.payload)
    if (data) {
      yield put(createCollectionSuccess(data))
    }
  } catch (error) {
    yield put(createCollectionFailure(error))
  }
}
