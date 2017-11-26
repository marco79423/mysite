import React from 'react'
import styled from 'styled-components'
import twisterStyle from '../animation/twisterStyle'
import loadingImage from './img/loading.jpg'

const Base = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingImage = styled.div`
  display: inline-block;

  width: 90px;
  height: 90px;
  background: url(${loadingImage}) no-repeat center;
  background-size: 90px 90px;

  border: 0.1em solid #FFFFFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  
  ${twisterStyle}
`

const Message = styled.div`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
`

export default class Loading extends React.PureComponent {
  render () {
    return (
      <Base>
        <LoadingImage/>
        <Message>正在努力讀取中…</Message>
      </Base>
    )
  }
}
