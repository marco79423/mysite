import { all } from 'redux-saga/effects'

import articleSaga from './ducks/article/saga'

import scenesSaga from './scenes/saga'

export default function *rootSaga () {
  yield all([
    articleSaga(),
    scenesSaga()
  ])
}