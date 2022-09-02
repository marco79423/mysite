import styled from '@emotion/styled'

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 1.2em;
`

export const Tbody = styled.tbody`

`

export const Tr = styled.tr`
  background: #eee;

  &:nth-of-type(even) {
    background: #f9f9f9;
  }
`

export const Td = styled.td`
  padding: 0.6em;
  border: 1px solid #ccc;
`
