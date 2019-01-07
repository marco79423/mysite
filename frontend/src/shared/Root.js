import React from 'react'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { createRoutes } from './routes'

import 'isomorphic-fetch'

export default class Root extends React.Component {
  static PropTypes = {
    store: PropTypes.any.isRequired,
    history: PropTypes.any,
    renderProps: PropTypes.any,
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {createRoutes(this.props.history)}
      </Provider>
    )
  }
}
