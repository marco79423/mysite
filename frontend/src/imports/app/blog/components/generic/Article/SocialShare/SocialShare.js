import React from 'react'
import PropTypes from 'prop-types'
import { generateShareIcon, ShareButtons } from 'react-share'
import styled from 'styled-components'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons


const IconGroup = styled.div`
  display: flex;
  padding: 1rem;
  
  > div:not(:first-child) {
    margin-left: .5rem;
  }
`

const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const TwitterIcon = generateShareIcon('twitter')

export default class SocialShare extends React.PureComponent {

  render () {
    if (!this.props.config) {
      return <IconGroup/>
    }
    const iconSize = 32
    return (
      <IconGroup>
        <FacebookShareButton
          url={this.props.config.shareUrl}
          title={this.props.config.title}>
          <FacebookIcon size={iconSize} round/>
        </FacebookShareButton>

        <GooglePlusShareButton
          url={this.props.config.shareUrl}>
          <GooglePlusIcon size={iconSize} round/>
        </GooglePlusShareButton>

        <TwitterShareButton
          url={this.props.config.shareUrl}
          title={this.props.config.title}>
          <TwitterIcon size={iconSize} round/>
        </TwitterShareButton>

        <LinkedinShareButton
          url={this.props.config.shareUrl}
          title={this.props.config.title}>
          <LinkedinIcon size={iconSize} round/>
        </LinkedinShareButton>
      </IconGroup>
    )
  }
}
