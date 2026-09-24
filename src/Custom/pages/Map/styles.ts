import { FooterStyled } from 'src/Custom/Layout/Footer/styles'
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

    ${FooterStyled} {
      display: none;
    }
  }

`

export const MapPageStyled = styled.div`
  display: contents;
`
