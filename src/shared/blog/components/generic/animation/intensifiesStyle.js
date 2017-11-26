import {keyframes, css} from 'styled-components'


let frame = ''
for (let i = 0; i <= 100; i++) {
  // Rotate between left and right
  const sign = (i % 2 === 0) ? 1 : -1

  // Final frame is set back to 0
  let transform
  if (i < 100) {
    const randomX = sign * Math.random() * i * 5 - i * 5
    const randomY = sign * Math.random() * i * 5 + i * 5
    transform = `translate(${randomX}px,${randomY}px) scale(${2 + i / 25});`
  } else {
    transform = `translate(0, 0) rotate(0deg);`
  }

  frame += `${i}% { transform: ${transform} }\n`
}

const intensifies = keyframes`
  ${frame}
`

export default css`
  animation-timing-function: ease-out;
  transform-origin: bottom center;
  animation-name: ${intensifies};
  animation-duration: 5s;
`
