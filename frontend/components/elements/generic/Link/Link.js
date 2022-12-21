import React from 'react'
import NextLink from 'next/link'


export default function Link({active, ...props}) {
  return (
    <NextLink {...props}/>
  )
}
