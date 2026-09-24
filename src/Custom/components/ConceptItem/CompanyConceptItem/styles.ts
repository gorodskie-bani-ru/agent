import styled, { css } from 'styled-components'
import { minWidth } from '../../../../theme/helpers/media-query'

export const CompanyConceptItemStyled = styled.article`
  padding: 24px 16px 40px;

  ${minWidth.xs(css`
    padding: 0;
  `)}

  .company-heading {
    margin-bottom: 20px;

    ${minWidth.xs(css`
      margin-bottom: 28px;
    `)}
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
    margin-top: 24px;
    padding: 20px;
    line-height: 1.75;
    overflow-wrap: anywhere;

    ${minWidth.xs(css`
      margin-top: 36px;
      padding: 28px 32px;
    `)}
  }
  .company-description h2 {
    font-size: clamp(22px, 2.5vw, 28px);
    line-height: 1.3;
  }
  .company-description img {
    max-width: 100%;
    height: auto;
  }
`
