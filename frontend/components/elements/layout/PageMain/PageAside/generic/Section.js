import {css, useTheme} from '@emotion/react'


export default function Section(props) {
  const theme = useTheme()
  return (
    <section css={css`
      margin: 30px;
      width: 340px;

      h2 {
        color: ${theme.page.main.aside.section.titleColor};
        font-size: 1.5em;
        font-weight: 700;
        border-bottom: 1px solid ${theme.page.main.aside.section.borderColor};
        padding-bottom: 10px;
      }
    `} {...props}/>
  )
}