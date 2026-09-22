// import { MarkdownStyled } from 'src/components/Markdown/styles'
import styled, { css } from 'styled-components'

export const CompanyFormTextareaButtonStyled = styled.button``

export const CompanyFormToolbarStyled = styled.div``

// export const CompanyFormDataPreviewStyled = styled(MarkdownStyled)``
export const CompanyFormDataPreviewStyled = styled.div``

export const CompanyFormContentStyled = styled.div``

const buttonStyled = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0;
  padding: 12px 24px;
  background-color: #1976d2;
  color: white;
  font-weight: 500;
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 4px;
  min-width: 200px;
  text-align: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }

  &:disabled,
  &[aria-disabled='true'] {
    background-color: #b0bec5;
    color: #eceff1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;

    &:hover {
      background-color: #b0bec5;
      transform: none;
      box-shadow: none;
    }
  }

  a& {
    &:hover {
      color: white;
    }
  }
`

export const CompanyFormContinueLinkButtonStyled = styled.button`
  ${buttonStyled}
`

export const CompanyFormContinueButtonStyled = styled.button`
  ${buttonStyled}
`

export const CompanyStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;

  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content auto min-content; */

  gap: 10px;

  ${CompanyFormToolbarStyled} {
    /* grid-column-start: 1;
    grid-column-end: -1; */
    width: 100%;
    overflow: hidden;
  }

  ${CompanyFormContentStyled} {
    flex: 1;
    min-height: 0;
  }
`
