import React from 'react'
import styled from '@emotion/styled'
import twisterStyle from '../animation/twisterStyle'

const Base = styled.article`
  background: ${props => props.theme.page.main.content.article.background};
  padding: 32px;
  min-height: 400px;
`


const Container = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingImage = styled.div`
  display: inline-block;

  width: 90px;
  height: 90px;
  background: url(/img/loading.jpg) no-repeat center;
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
  render() {
    return (
      <Base>
        <Container>
          <LoadingImage/>
          <Message>正在努力讀取中…</Message>
        </Container>
      </Base>
    )
  }
}
