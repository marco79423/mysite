import { all } from 'redux-saga/effects'

import articleSaga from './article/saga'
import pageSaga from './page/saga'
import siteInfoSaga from './site-info/saga'

export default function *rootSaga () {
  yield all([
    articleSaga(),
    pageSaga(),
    siteInfoSaga()
  ])
}