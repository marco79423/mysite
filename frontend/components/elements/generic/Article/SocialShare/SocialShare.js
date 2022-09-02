import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share'
import styled from '@emotion/styled'

const IconGroup = styled.div`
  display: flex;
  padding: 1rem;
  
  > div:not(:first-of-type) {
    margin-left: .5rem;
  }
`

export default function SocialShare({config}) {
  const iconSize = 32

  if (!config) {
    return <IconGroup/>
  }

  return (
    <IconGroup>
      <FacebookShareButton
        url={config.shareUrl}
        title={config.title}>
        <FacebookIcon size={iconSize} round/>
      </FacebookShareButton>

      <TwitterShareButton
        url={config.shareUrl}
        title={config.title}>
        <TwitterIcon size={iconSize} round/>
      </TwitterShareButton>

      <LinkedinShareButton
        url={config.shareUrl}
        title={config.title}>
        <LinkedinIcon size={iconSize} round/>
      </LinkedinShareButton>
    </IconGroup>
  )
}
