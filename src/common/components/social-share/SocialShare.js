import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {ShareButtons, generateShareIcon} from 'react-share'

import styles from './SocialShare.scss'


const {
  FacebookShareButton,
  GooglePlusShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')

export default class SocialShare extends React.Component {
  static PropTypes = {
    config: ImmutablePropTypes.contains({
      shareUrl: React.PropTypes.string.isRequired,
      title: React.PropTypes.string
    })
  }

  render() {
    return (
      <div className={styles.root}>
        <FacebookShareButton
          url={this.props.config.get('shareUrl')}
          title={this.props.config.get('title')}
          className={styles.item}>
          <FacebookIcon
            size={32}
            round />
        </FacebookShareButton>

        <GooglePlusShareButton
          url={this.props.config.get('shareUrl')}
          className={styles.item}>
          <GooglePlusIcon
            size={32}
            round />
        </GooglePlusShareButton>
      </div>
    )
  }
}
