import {css, keyframes} from '@emotion/react'

const twister = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  20% {
    transform: rotateZ(360deg);
  }

  40% {
    transform: rotateZ(720deg);
  }

  60% {
    transform: rotateZ(1080deg);
  }

  80% {
    transform: rotateZ(1440deg);
  }
`

export default css`
  animation-name: ${twister};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  z-index: 1000;
`
