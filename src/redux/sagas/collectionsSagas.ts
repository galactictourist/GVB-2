import { call, put } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'
import {
  createCollectionFailure,
  createCollectionSuccess,
  getAllCollectionsFailure,
  getAllCollectionsSuccess,
  getMyCollectionsFailure,
  getMyCollectionsSuccess,
  updateCollectionFailure,
  updateCollectionSuccess,
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

export function* updateCollectionSaga(action: any) {
  console.log('Update collections saga')
  try {
    const { id, payload } = action.payload
    const { data } = yield call(collectionsApi.update, id, payload)
    console.log('Update collections saga return data')
    console.log(data)
    if (data) {
      yield put(updateCollectionSuccess(data))
    }
  } catch (error) {
    console.log('Update error')
    console.log(error)
    yield put(updateCollectionFailure(error))
  }
}
