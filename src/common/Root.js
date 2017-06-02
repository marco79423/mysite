import React from 'react'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { createRoutes } from './routes'

import 'isomorphic-fetch'

import './css/base.scss'

export default class Root extends React.Component {
  static PropTypes = {
    type: PropTypes.oneOf(['server', 'client']).isRequired,
    store: PropTypes.any.isRequired,
    history: PropTypes.any,
    renderProps: PropTypes.any,
  }

  renderRoutes = () => {
    if (this.props.type === 'server') {
      return <RouterContext {...this.props.renderProps} />
    } else {
      return createRoutes(this.props.history)
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {this.renderRoutes()}
      </Provider>
    )
  }
}