import { all } from 'redux-saga/effects'

import pageSaga from '../ducks/page/saga'
import siteInfoSaga from '../ducks/site-info/saga'

export default function *rootSaga () {
  yield all([
    pageSaga(),
    siteInfoSaga()
  ])
}