import styled from 'styled-components'

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.lovable.container};
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`

export const Col = styled.div`
  h4 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.lovable.colors.muted};
    margin-bottom: 12px;
  }
  ul li {
    margin-bottom: 8px;
  }
  a {
    color: ${({ theme }) => theme.lovable.colors.textSoft};
    font-size: 14px;
  }
`

export const About = styled.div`
  p {
    color: ${({ theme }) => theme.lovable.colors.muted};
    font-size: 14px;
    max-width: 360px;
  }
  strong {
    font-family: ${({ theme }) => theme.lovable.fonts.heading};
    font-size: 18px;
    color: ${({ theme }) => theme.lovable.colors.text};
  }
`

export const Bottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.lovable.colors.border};
  padding: 16px 20px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.lovable.colors.muted};
`

export const UlStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const FooterStyled = styled.footer`
  margin-top: 80px;
  background: ${({ theme }) => theme.lovable.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.lovable.colors.border};
`
