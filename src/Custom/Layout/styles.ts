import styled, { css } from 'styled-components'
import { minWidth } from '../../theme/helpers/media-query'

export const CustomLayoutSectionStyled = styled.section`
  max-width: 1328px;
  padding: 44px 24px;
  margin: auto;

  ${minWidth.sm(css`
    padding: 64px 40px;
  `)}
`

export const CustomLayoutGridStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  ${minWidth.xs(css`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `)}

  ${minWidth.sm(css`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  `)}
`

export const CustomLayoutMainStyled = styled.main`
  flex: 1;
  min-width: 0;
`

export const CustomLayoutStyled = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.foreground};
  background: ${({ theme }) => theme.backgrounds.page};
  .ai-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 14px 20px;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    transition: background 0.2s;
    text-decoration: none;
  }
  .ai-button:hover {
    background: #28583f;
    text-decoration: none;
  }
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    padding: 12px 20px;
    background: white;
    z-index: 1100;
  }
  .skip-link:focus {
    top: 12px;
  }
`
