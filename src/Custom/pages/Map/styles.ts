import {
  CustomLayoutMainStyled,
  CustomLayoutStyled,
} from 'src/Custom/Layout/styles'
import styled, { createGlobalStyle } from 'styled-components'

export const MapPageGlobalStyles = createGlobalStyle`

  ${CustomLayoutStyled} {
    min-height: unset;
    height: 100dvh;
    
    ${CustomLayoutMainStyled} {
      overflow: auto;
    }
  }

`

export const MapPageStyled = styled.div`
  display: contents;
`
