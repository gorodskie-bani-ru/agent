import Link from 'next/link'
import styled from 'styled-components'

export const FooterMainStyled = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
`

export const FooterBrandBlockStyled = styled.div``

export const FooterDescriptionStyled = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const FooterNavigationStyled = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
`

export const FooterNavigationLinkStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

export const FooterNoteStyled = styled.p`
  font:
    20px/1.4 Georgia,
    serif;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const FooterAuthorStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  padding: 32px 36px;
  margin-bottom: 32px;
  background: #edf1e3;
  border: 1px solid #dce4d1;
  border-radius: 16px;
`

export const FooterAuthorCopyStyled = styled.div`
  max-width: 650px;
  min-width: 0;
`

export const FooterAuthorEyebrowStyled = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #5e7152;
`

export const FooterAuthorTitleStyled = styled.h2`
  font:
    400 clamp(24px, 2.4vw, 32px)/1.2 Georgia,
    serif;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.primary};
`

export const FooterAuthorDescriptionStyled = styled.p`
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.65;
  color: #5d6a56;
`

export const FooterAuthorActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  flex-shrink: 0;
`

export const FooterSignatureStyled = styled.a`
  display: inline-block;
  padding: 2px 4px;
  font:
    400 52px/1.1 Georgia,
    'Times New Roman',
    serif;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.2s;
  &:hover {
    color: #577443;
    text-decoration: none;
  }
`

export const FooterProjectLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-decoration-color: #9dac90;
  text-underline-offset: 5px;
  &:hover {
    text-decoration-color: currentColor;
  }
`

export const FooterBottomStyled = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const FooterCopyrightStyled = styled.span``
export const FooterMottoStyled = styled.span``

export const FooterStyled = styled.footer`
  width: 100%;
  max-width: 1328px;
  margin: auto;
  padding: 0 40px 28px;
  @media (max-width: 800px) {
    padding: 0 24px 90px;
    ${FooterMainStyled} {
      align-items: flex-start;
      flex-direction: column;
      gap: 24px;
    }
    ${FooterNoteStyled} {
      display: none;
    }
    ${FooterBottomStyled} {
      flex-direction: column;
    }
    ${FooterAuthorStyled} {
      padding: 26px;
      align-items: flex-start;
      flex-direction: column;
      gap: 24px;
    }
    ${FooterAuthorActionsStyled} {
      align-items: flex-start;
      gap: 10px;
    }
    ${FooterSignatureStyled} {
      font-size: 46px;
    }
  }
`
