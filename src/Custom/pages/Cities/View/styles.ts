import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers'
import { Theme } from 'src/theme'

type CitiesLength = Record<keyof Theme['breakpoints'], number>

export const citiesLengthTheme = (
  citiesLength: number,
): { citiesLength: CitiesLength } => ({
  citiesLength: {
    xs: citiesLength,
    sm: Math.ceil(citiesLength / 2),
    md: Math.ceil(citiesLength / 3),
    lg: Math.ceil(citiesLength / 4),
    xl: Math.ceil(citiesLength / 4),
  },
})

type CitiesPageViewStyledProps = {
  quiantity: number
}

export const CitiesPageViewStyled = styled.nav<CitiesPageViewStyledProps>(
  ({ quiantity }) => {
    const grid = citiesLengthTheme(quiantity)

    return css`
      display: grid;
      gap: 10px;
      grid-auto-flow: column;

      grid-template-rows: repeat(${grid.citiesLength.xs}, 1fr);

      ${minWidth.sm(css`
        grid-template-rows: repeat(${grid.citiesLength.sm}, 1fr);
      `)};

      ${minWidth.md(css`
        grid-template-rows: repeat(${grid.citiesLength.md}, 1fr);
      `)};

      ${minWidth.lg(css`
        grid-template-rows: repeat(${grid.citiesLength.lg}, 1fr);
      `)};
    `
  },
)
