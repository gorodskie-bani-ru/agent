import styled, { css } from 'styled-components'
import { minWidth } from '../../../theme/helpers/media-query'
import Link from 'next/link'

export const BrandStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  &:hover {
    text-decoration: none;
  }
  svg {
    width: 27px;
    height: 42px;
    transform: rotate(-90deg);
  }
  strong {
    display: block;
    font:
      21px/1.1 Georgia,
      serif;
    font-weight: 400;
  }

  ${minWidth.xs(css`
    svg {
      width: 34px;
    }
    strong {
      font-size: 26px;
    }
  `)}
  small {
    display: block;
    margin-top: 5px;
    font-size: 11px;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`
