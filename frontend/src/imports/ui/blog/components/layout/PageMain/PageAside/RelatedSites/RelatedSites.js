import React from 'react'
import styled from 'styled-components'
import Section from '../generic/Section'

const Base = styled(Section)`
  @media (max-width: 1200px) {
    display: none;
  }
  
  li:not(:first-child) {
    margin-top: 8px;
  }
`

export default class RelatedSites extends React.Component {

  render() {
    return (
      <Base>
        <h2>相關網站</h2>
        <ul>
          {
            this.props.relatedSites.map(relatedSite => (
              <li key={relatedSite.name}>
                <a href={relatedSite.url}>
                  {relatedSite.name}
                </a>
              </li>
            ))
          }
        </ul>
      </Base>
    )
  }
}
