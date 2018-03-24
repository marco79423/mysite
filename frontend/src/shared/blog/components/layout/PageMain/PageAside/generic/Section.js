import styled from 'styled-components'

export default styled.section`
  margin: 30px;
  width: 340px;

  h2 {
    color: ${props => props.theme.page.main.aside.section.titleColor};
    font-size: 1.5em;
    font-weight: 700;
    border-bottom: 1px solid ${props => props.theme.page.main.aside.section.borderColor};
    padding-bottom: 10px;
  }
`
