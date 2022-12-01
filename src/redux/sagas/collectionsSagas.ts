import { call } from 'redux-saga/effects'
import { collectionsApi } from '~/pages/api/collections.api'

export function* getCollectionsSaga() {
  console.log('Hello from collections saga')
  try {
    const { data } = yield call(collectionsApi.getAll)
    if (data) {
      console.log(data)
      console.log('GET COLLECTIONS SUCCESS')
    }
  } catch (error) {
    console.log(error)
    console.log('GET COLLECTIONS ERROR')
  }
}
