import React from 'react'
import Iframe from 'iframe-resizer-react'

export function LikeCoin({userId, referrer, style = {}}) {
  const currentUrl = referrer || window.location.href
  return (
    <Iframe
      src={`//button.like.co/in/embed/${userId}/button?referrer=${currentUrl}`}
      inPageLinks
      checkOrigin={['//button.like.co']}
      style={{border: 0, margin: 0, ...style}}
    />
  )
}
