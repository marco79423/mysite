import React from 'react'
import styled from 'styled-components'

import Section from '../generic/Section'

const Base = styled(Section)`
  position: relative;
`

const MeImage = styled.img`
  position: absolute;
  width: 90px;
  height: 100%;
  border: 0.1em solid #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
`

const Profile = styled.div`
  padding-top: 8px;
  padding-left: 110px;
  font-size: 0.8rem;

  h3 {
    margin: 0;
    font-size: 1rem;

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

    &:not(:first-child) {
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
        <MeImage src="/img/me.jpg" alt="兩大類"/>
        <Profile>
          <h3>兩大類</h3>
          <Motto>
            <div>能站著就別坐著，能走路就別騎車</div>
            <div>保持站起來的毅力和一步一腳印的耐心</div>
          </Motto>
          <Contact>
            <li><TwitterIcon href='https://twitter.com/marco79423' target="_blank">Twitter</TwitterIcon></li>
            <li><GithubIcon href='https://github.com/marco79423' target="_blank">GitHub</GithubIcon></li>
          </Contact>
        </Profile>
      </Base>
    )
  }
}
