import styled from 'styled-components'

export const CompanyFormStepIntroStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
`

export const IntroHeaderStyled = styled.h1`
  font-size: 1.75rem;
  color: #1565c0;
  margin-bottom: 0.5rem;
`

export const IntroSubHeaderStyled = styled.h2`
  font-size: 1.25rem;
  color: #1976d2;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`

export const IntroParagraphStyled = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
`

export const IntroStepContainerStyled = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`

export const IntroStepNumberStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
`

export const IntroStepContentStyled = styled.div`
  flex: 1;
`

export const IntroStepTitleStyled = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #333;
`

export const IntroStepDescriptionStyled = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #555;
`

export const IntroTariffGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const IntroTariffCardStyled = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;

  &:first-child {
    border-color: #1565c0;
  }

  &:nth-child(2) {
    border-color: #90caf9;
  }
`

export const IntroTariffTitleStyled = styled.h4`
  font-size: 1.5rem;
  margin: 0.75rem 0;
  text-align: center;
  color: #1565c0;
`

export const IntroTariffPriceStyled = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`

export const IntroTariffFeatureListStyled = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const IntroTariffFeatureItemStyled = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  padding-left: 1.25rem;
  position: relative;

  /* &:before {
    content: '\2713';
    position: absolute;
    left: 0;
    color: #4caf50;
  } */
`
