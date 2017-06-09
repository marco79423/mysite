import 'isomorphic-fetch'
import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { createMemoryHistory, match } from 'react-router'
import Helmet from 'react-helmet'
import { END } from 'redux-saga'

import promiseReject from '../lib/promiseReject'
import { createRoutes } from '../common/routes'
import { configureStore } from '../common/store'

import Root from '../common/Root'
import saga from '../common/ducks/saga'
import * as articleActions from '../common/ducks/article/actions'
import * as pageActions from '../common/ducks/page/actions'

import * as config from './config'
import Html from './Html'

function prepareFetchingPromise (store, url) {
  const rootTask = store.runSaga(saga)

  store.dispatch(articleActions.fetchArticles())
  if (/\/me\//.test(url)) {
    store.dispatch(pageActions.fetchPages())
  }
  store.dispatch(END)

  return Promise.race([
    rootTask.done,
    promiseReject(config.QUERY_TIMEOUT, 'Time out')
  ])
}

export default function renderHtmlPage (req, res) {
  const history = createMemoryHistory(req.path)
  match({routes: createRoutes(history), location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      if (config.SERVER_RENDERING) {
        const store = configureStore(history)
        prepareFetchingPromise(store, req.url)
          .then(() => {
            const html = ReactDOMServer.renderToString(
              <Root store={store} renderProps={renderProps} type="server"/>
            )
            const head = Helmet.renderStatic()
            res.status(200).send('<!DOCTYPE html>\n' + renderToString(<Html serverRendering head={head}
                                                                            state={store.getState()} html={html}/>))
          })
          .catch(() => {
            res.status(500).send('網站出事惹！！！')
          })
      } else {
        res.status(200).send('<!DOCTYPE html>\n' + renderToString(<Html/>))
      }
    } else {
      res.status(404).send('Not found')
    }
  })
}

