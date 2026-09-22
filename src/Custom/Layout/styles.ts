import styled from 'styled-components'

export const CustomLayoutMainStyled = styled.main``

export const CustomLayoutStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  ${CustomLayoutMainStyled} {
    flex: 1;
    /* flex-shrink: 0; */
  }
`
