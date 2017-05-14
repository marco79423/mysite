import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import AboutMe from '../../components/about-me'

@connect(
  (state, props) => ({
    config: state.getIn(['config', 'ABOUT_ME'])
  })
)
export default class AboutMeContainer extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      socialLinks: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ),
      quote: PropTypes.string
    })
  }

  render () {
    return (
      <AboutMe
        config={this.props.config}
        quote={this.props.quote}/>
    )
  }
}
