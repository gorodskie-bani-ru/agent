import { createGlobalStyle } from 'styled-components'
import { theme } from './index'
import { MarkdownEditorGlobalStyled } from 'src/components/Markdown/Editor/styles'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

  }

  html, body{
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Nunito', Arial, sans-serif;
    color: ${theme.colors.foreground};
    background: ${theme.backgrounds.page};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  :focus-visible {
    outline: 3px solid #668a45;
    outline-offset: 4px;
  }

  button, input, textarea, select { font: inherit; }
  button { touch-action: manipulation; }
  img { max-width: 100%; }
  html { scroll-padding-top: 24px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
  }

  #__next {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.foreground};
    
    &:hover {
      text-decoration: underline;
    }
    
    &:active {
      text-decoration: none;
    }
  }

  input {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  button {
    &:enabled {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  ${MarkdownEditorGlobalStyled}
`
