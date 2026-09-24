import styled from 'styled-components'

export const HeaderStyled = styled.header`
  position: relative;
  z-index: 300;
  background: ${({ theme }) => theme.backgrounds.page};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  .header-inner {
    max-width: 1328px;
    margin: auto;
    min-height: 96px;
    padding: 18px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 32px;
    font-size: 14px;
  }
  nav a {
    padding: 10px 0;
  }
  nav a[aria-current='page'] {
    text-decoration: underline;
    text-underline-offset: 6px;
  }
  .ai-button {
    margin-left: 32px;
  }
  .menu-toggle {
    display: none;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    color: inherit;
  }
  @media (max-width: 1000px) {
    nav {
      gap: 20px;
    }
    .ai-button {
      margin-left: 0;
    }
  }
  @media (max-width: 800px) {
    .header-inner {
      min-height: 80px;
      padding: 16px 24px;
    }
    .menu-toggle {
      display: flex;
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
    }
    nav[data-open='true'] {
      display: flex;
      flex-direction: column;
    }
    nav a {
      padding: 12px 0;
    }
    .ai-button {
      margin-top: 10px;
      justify-content: center;
    }
  }
  @media (max-width: 480px) {
    .header-inner {
      padding: 16px;
      gap: 12px;
    }
  }
`
