import styled from 'styled-components'

export const CompanyConceptItemStyled = styled.article`
  .company-heading {
    margin-bottom: 28px;
  }
  .company-eyebrow {
    margin: 0 0 12px;
    color: #64748b;
    font-size: 13px;
    letter-spacing: 0.04em;
  }
  h1 {
    margin: 0;
    font-size: clamp(26px, 3.5vw, 42px);
    line-height: 1.18;
    letter-spacing: -0.025em;
    overflow-wrap: anywhere;
  }
  .company-description {
    margin-top: 36px;
    padding: 28px 32px;
    background: #fff;
    line-height: 1.75;
    overflow-wrap: anywhere;
  }
  .company-description h2 {
    font-size: clamp(22px, 2.5vw, 28px);
    line-height: 1.3;
  }
  .company-description img {
    max-width: 100%;
    height: auto;
  }
  @media (max-width: 600px) {
    padding: 24px 16px 40px;
    .company-heading {
      margin-bottom: 20px;
    }
    .company-description {
      margin-top: 24px;
      padding: 20px;
    }
  }
`
