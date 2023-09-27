import { all, takeLatest } from 'redux-saga/effects'
import { adminLoginSaga, createTopicsSaga, updateTopicsSaga } from './sagas/adminSaga'

import { getTopicByIDSaga, getTopicsSaga } from './sagas/topicsSaga'

import { createTopic, login, logout, updateTopic } from './slices/adminSlice'
import { verifySignature } from './slices/authSlice'
import { getTopicById, getTopics } from './slices/topicsSlice'

function* rootSaga() {
  yield all([
    takeLatest(login.type, adminLoginSaga),
    takeLatest(logout.type, adminLoginSaga),
    takeLatest(createTopic.type, createTopicsSaga),
    takeLatest(getTopics.type, getTopicsSaga),
    takeLatest(getTopicById.type, getTopicByIDSaga),
    takeLatest(updateTopic.type, updateTopicsSaga),
    takeLatest(verifySignature.type, verifySignature),
  ])
}

export default rootSaga
