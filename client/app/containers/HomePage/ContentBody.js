import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export default function ContentBody(props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}
