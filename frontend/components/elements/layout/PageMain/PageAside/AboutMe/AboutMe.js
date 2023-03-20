import React from 'react'
import styled from '@emotion/styled'

import Section from '../generic/Section'

const Base = styled(Section)`
  position: relative;
`

const Profile = styled.div`
  padding-top: 8px;
  font-size: 1rem;

  h3 {
    margin: 0;
    color: #616161;
    font-weight: 700;
    font-size: 1.2rem;

    @media (max-width: 1200px) {
      color: #ECECEC;
    }
  }
`

const Motto = styled.div`
  margin-top: 8px;
  color: #6F6F6F;
  display: inline-block;

  @media (max-width: 1200px) {
    color: #ECECEC;
  }
`

const Contact = styled.ul`
  margin-top: 8px;
  overflow: auto;

  li {
    float: left;

    &:not(:first-of-type) {
      margin-left: 4px;
    }
  }
`

const BaseIcon = styled.a`
  display: block;
  width: 24px;
  height: 24px;
  text-indent: 110%;
  overflow: hidden;
`

const TwitterIcon = styled(BaseIcon)`
  background: url(/img/icon/i-twitter.svg) no-repeat;
  background-size: 100%;
`

const LinkedinIcon = styled(BaseIcon)`
  background: url(/img/icon/i-linkedin.svg) no-repeat;
  background-size: 100%;
`

const GithubIcon = styled(BaseIcon)`
  background: url(/img/icon/i-github.svg) no-repeat;
  background-size: 100%;
`

export default class AboutMe extends React.Component {
  render () {
    return (
      <Base>
        <Profile>
          <h3>兩大類</h3>
          <Motto>
            <div>能站著就別坐著，能走路就別騎車</div>
            <div>保持站起來的毅力和一步一腳印的耐心</div>
          </Motto>
          <Contact>
            <li><GithubIcon href='https://github.com/marco79423' target="_blank">GitHub</GithubIcon></li>
            <li><TwitterIcon href='https://twitter.com/marco79423' target="_blank">Twitter</TwitterIcon></li>
          </Contact>
        </Profile>
      </Base>
    )
  }
}
