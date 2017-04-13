import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { generateShareIcon, ShareButtons } from 'react-share'

import styles from './SocialShare.scss'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const TwitterIcon = generateShareIcon('twitter')

export default class SocialShare extends React.PureComponent {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      shareUrl: PropTypes.string.isRequired,
      title: PropTypes.string
    })
  }

  render () {
    const iconSize = 32

    return (
      <div className={styles.root}>
        <FacebookShareButton
          url={this.props.config.get('shareUrl')}
          title={this.props.config.get('title')}
          className={styles.item}>
          <FacebookIcon
            size={iconSize}
            round/>
        </FacebookShareButton>

        <GooglePlusShareButton
          url={this.props.config.get('shareUrl')}
          className={styles.item}>
          <GooglePlusIcon
            size={iconSize}
            round/>
        </GooglePlusShareButton>

        <TwitterShareButton
          url={this.props.config.get('shareUrl')}
          title={this.props.config.get('title')}
          className={styles.item}>
          <TwitterIcon
            size={iconSize}
            round/>
        </TwitterShareButton>

        <LinkedinShareButton
          url={this.props.config.get('shareUrl')}
          title={this.props.config.get('title')}
          className={styles.item}>
          <LinkedinIcon
            size={iconSize}
            round/>
        </LinkedinShareButton>
      </div>
    )
  }
}
