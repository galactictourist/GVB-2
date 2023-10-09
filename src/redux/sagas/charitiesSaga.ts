import { call, put } from 'redux-saga/effects'
import { charitiesApi } from '~/pages/api/charities.api'
import {
  getCharitiesFailure,
  getCharitiesSuccess,
  getCharityByIdFailure,
  getCharityByIdSuccess
} from '../slices/charitiesSlice'

export function* getCharitiesSaga() {
  try {
    const { data } = yield call(charitiesApi.getAll)
    if (data) {
      yield put(getCharitiesSuccess(data))
    }
  } catch (error) {
    yield put(getCharitiesFailure(error))
  }
}

export function* getCharityByIDSaga(action: any) {
  try {
    const { id } = action.payload
    const { data } = yield call(charitiesApi.getCharityById, id)
    if (data) {
      console.log('GET CHARITY BY ID SUCCESS')
      console.log(data)
      yield put(getCharityByIdSuccess(data))
    }
  } catch (error) {
    console.log('GET CHARITY BY ID FAILURE')
    console.log(error)
    yield put(getCharityByIdFailure(error))
  }
}
