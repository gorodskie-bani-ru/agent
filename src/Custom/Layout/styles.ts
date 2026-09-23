import styled from 'styled-components'

export const CustomLayoutMainStyled = styled.main``

export const CustomLayoutStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  ${CustomLayoutMainStyled} {
    flex: 1;
    /* flex-shrink: 0; */

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px 64px;
    min-width: 0;
  }
`
