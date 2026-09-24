import styled, { css } from 'styled-components'
import { minWidth } from '../../../theme/helpers/media-query'

export const HeaderStyled = styled.header`
  position: relative;
  z-index: 300;
  background: ${({ theme }) => theme.backgrounds.page};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  .header-inner {
    max-width: 1328px;
    margin: auto;
    min-height: 80px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    ${minWidth.xs(css`
      padding: 16px 24px;
      gap: 32px;
    `)}

    ${minWidth.sm(css`
      min-height: 96px;
      padding: 18px 40px;
    `)}
  }
  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 20px 24px 28px;
    background: ${({ theme }) => theme.backgrounds.page};
    box-shadow: 0 16px 24px #182e2012;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    align-items: stretch;
    gap: 6px;
    font-size: 14px;

    ${minWidth.sm(css`
      display: flex;
      position: static;
      padding: 0;
      background: transparent;
      box-shadow: none;
      border-bottom: 0;
      align-items: center;
      gap: 20px;
    `)}

    ${minWidth.md(css`
      gap: 32px;
    `)}
  }
  nav[data-open='true'] {
    display: flex;
    flex-direction: column;

    ${minWidth.sm(css`
      flex-direction: row;
    `)}
  }
  nav a {
    padding: 12px 0;

    ${minWidth.sm(css`
      padding: 10px 0;
    `)}
  }
  nav a[aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 6px;
  }
  .ai-button {
    margin-top: 10px;
    justify-content: center;

    ${minWidth.sm(css`
      margin-top: 0;
      margin-left: 0;
      justify-content: flex-start;
    `)}

    ${minWidth.md(css`
      margin-left: 32px;
    `)}
  }
  .menu-toggle {
    display: flex;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    color: inherit;

    ${minWidth.sm(css`
      display: none;
    `)}
  }
`
