import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share'
import styled from 'styled-components'

const IconGroup = styled.div`
  display: flex;
  padding: 1rem;
  
  > div:not(:first-child) {
    margin-left: .5rem;
  }
`

export default class SocialShare extends React.PureComponent {

  render() {
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
