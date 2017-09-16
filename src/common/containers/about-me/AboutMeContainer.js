import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import * as configSelectors from '../../ducks/config/selectors'

import AboutMe from '../../components/about-me'

@connect(
  (state, props) => ({
    authorInfo: configSelectors.getAuthorInfo(state),
  })
)
export default class AboutMeContainer extends React.Component {
  static PropTypes = {
    authorInfo: ImmutablePropTypes.contains({
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
        socialLinks={this.props.authorInfo.get('socialLinks')}
        quote={this.props.authorInfo.get('quote')} />
    )
  }
}
