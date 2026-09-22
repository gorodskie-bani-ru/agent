import styled, { css } from 'styled-components'

export const AboutSectionHeader = styled.h2`
  color: #1976d2;
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
`

export const AboutSectionContent = styled.div`
  margin-bottom: 24px;
  line-height: 1.6;
`

export const AboutList = styled.ul`
  margin: 16px 0;
  padding-left: 0;
  list-style-type: none;

  li {
    margin-bottom: 16px;

    strong {
      color: #1976d2;
      font-weight: 600;
    }
  }
`

export const AboutCallToAction = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
`

const buttonStyled = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px auto 0;
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

  &:disabled {
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
`

export const AboutButton = styled.button`
  ${buttonStyled}
`

export const AboutPageStyled = styled.div`
  padding: 20px 20px 40px;
  max-width: 960px;
  margin: 0 auto;

  h1 {
    color: #1976d2;
    margin-bottom: 24px;
    font-weight: 600;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
  }
`
