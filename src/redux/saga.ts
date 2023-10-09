import { all, takeLatest } from 'redux-saga/effects'
import { adminLoginSaga, adminLogoutSaga, createCharitySaga, createTopicsSaga, updateCharitySaga, updateTopicsSaga } from './sagas/adminSaga'
import { getCharitiesSaga, getCharityByIDSaga } from './sagas/charitiesSaga'
import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'
import { createCharity, createTopic, login, logout, updateCharity, updateTopic } from './slices/adminSlice'
import { verifySignature } from './slices/authSlice'
import { getCharities, getCharityById } from './slices/charitiesSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminLoginSaga),
    takeLatest(logout.type, adminLogoutSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(verifySignature.type, verifySignature),
    takeLatest(getCharities.type, getCharitiesSaga),
    takeLatest(getCharityById.type, getCharityByIDSaga),
    takeLatest(createCharity.type, createCharitySaga),
    takeLatest(updateCharity.type, updateCharitySaga),
  ])
}

export default rootSaga
