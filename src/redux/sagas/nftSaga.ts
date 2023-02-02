import { call, put } from 'redux-saga/effects'
import { nftApi } from '~/pages/api/nft.api'

import { createNftFailure, createNftSuccess } from '../slices/nftSlice'

export function* createNftSaga(action: any) {
  try {
    const { data } = yield call(nftApi.createNft, action.payload)
    if (data) {
      yield put(createNftSuccess(data))
    }
  } catch (error) {
    yield put(createNftFailure)
  }
}
