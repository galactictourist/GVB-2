import { call, put } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'
import { getCollectionsFailure, getCollectionsSuccess } from '../slices/collectionsSlice'

export function* getCollectionsSaga() {
  console.log('Hello from collections saga')
  try {
    const { data } = yield call(collectionsApi.getAll)
    if (data) {
      yield put(getCollectionsSuccess(data))
    }
  } catch (error) {
    yield put(getCollectionsFailure)
  }
}
