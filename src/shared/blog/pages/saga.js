import { all } from 'redux-saga/effects'

import pageSaga from './page/saga'
import siteInfoSaga from './site-info/saga'

export default function *rootSaga () {
  yield all([
    pageSaga(),
    siteInfoSaga()
  ])
}