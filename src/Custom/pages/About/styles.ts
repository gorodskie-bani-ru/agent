import Link from 'next/link'
import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers/media-query'

export const AboutPageLinkStyled = styled(Link)`
  color: inherit;
`
export const AboutPageBreadcrumbsStyled = styled.nav`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`
export const AboutPageHeroCopyStyled = styled.div`
  min-width: 0;
`
export const AboutPageEyebrowStyled = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #627357;
  margin-bottom: 18px;
`
export const AboutPageTitleStyled = styled.h1`
  font:
    400 clamp(40px, 5vw, 66px)/1.08 Georgia,
    serif;
  letter-spacing: -0.045em;
  margin-bottom: 24px;
`
export const AboutPageLeadStyled = styled.p`
  font-size: 16px;
  line-height: 1.8;
  max-width: 570px;
  color: ${({ theme }) => theme.colors.text.secondary};
`
export const AboutPageActionsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 24px;
  margin-top: 28px;
`
export const AboutPageButtonStyled = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  &:hover {
    background: #28583f;
  }
`
export const AboutPageSecondaryLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 8px 0;
  text-decoration: underline;
  text-underline-offset: 5px;
`
export const AboutPageTextStyled = styled.p`
  font-size: 14px;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text.secondary};
  & + & {
    margin-top: 16px;
  }
`
export const AboutPageStoryYearStyled = styled.span`
  display: block;
  font:
    400 64px/1 Georgia,
    serif;
  letter-spacing: -0.05em;
  color: #173f2e;
  margin-bottom: 12px;
`
export const AboutPageStoryTitleStyled = styled.h2`
  font:
    400 24px/1.25 Georgia,
    serif;
  margin-bottom: 24px;
`
export const AboutPageStoryStyled = styled.aside`
  background: #edf1e3;
  border: 1px solid #dce4d1;
  border-radius: 60px 16px 16px 16px;
  padding: 32px;
`
export const AboutPageHeroStyled = styled.header`
  display: grid;
  gap: 36px;
  padding: 40px 0 52px;
  ${minWidth.md(css`
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    align-items: center;
    gap: 64px;
    padding: 56px 0 72px;
  `)}
`
export const AboutPageSectionTitleStyled = styled.h2`
  font:
    400 clamp(30px, 3.2vw, 43px)/1.18 Georgia,
    serif;
  letter-spacing: -0.035em;
`
export const AboutPageIconStyled = styled.span`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #edf1e3;
  color: #173f2e;
  margin-bottom: 24px;
`
export const AboutPageCardTitleStyled = styled.h3`
  font:
    400 26px/1.2 Georgia,
    serif;
  margin-bottom: 16px;
`
export const AboutPageCardButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: none;
  border: 0;
  border-top: 1px solid #e2e4da;
  margin-top: auto;
  padding-top: 20px;
  color: #173f2e;
  font-size: 13px;
  text-align: left;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`
export const AboutPageCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  padding: 26px;
  background: #fff;
  border: 1px solid #e2e4da;
  border-radius: 16px;
  min-width: 0;
  ${AboutPageTextStyled} {
    margin-bottom: 26px;
  }
`
export const AboutPageCardsStyled = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 30px;
  ${minWidth.md(css`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  `)}
`
export const AboutPageSectionStyled = styled.section`
  padding-bottom: 52px;
`
export const AboutPageOwnersCopyStyled = styled.div`
  min-width: 0;
`
export const AboutPageMailLinkStyled = styled(AboutPageSecondaryLinkStyled)`
  color: #edf1e3;
`
export const AboutPageHintStyled = styled.p`
  font-size: 12px;
  line-height: 1.7;
  color: #c4d4bf;
  margin-top: 18px;
  max-width: 480px;
`
export const AboutPageStepNumberStyled = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid #6b8469;
  border-radius: 50%;
  font-size: 11px;
  color: #d2dfc6;
`
export const AboutPageStepTitleStyled = styled.h3`
  font:
    400 23px/1.25 Georgia,
    serif;
  margin-bottom: 8px;
`
export const AboutPageStepCopyStyled = styled.div`
  min-width: 0;
`
export const AboutPageStepStyled = styled.li`
  display: flex;
  gap: 18px;
  padding: 22px 0;
  & + & {
    border-top: 1px solid #ffffff26;
  }
`
export const AboutPageOwnersStepsStyled = styled.ol`
  list-style: none;
`
export const AboutPageOwnersStyled = styled.section`
  display: grid;
  gap: 24px;
  padding: 32px 24px;
  background: #173f2e;
  color: #faf9f5;
  border-radius: 20px;
  scroll-margin-top: 24px;
  ${AboutPageEyebrowStyled} {
    color: #c2d3b3;
  }
  ${AboutPageLeadStyled} {
    color: #d7e2d1;
    margin-top: 22px;
    font-size: 15px;
  }
  ${AboutPageTextStyled} {
    color: #d7e2d1;
    font-size: 13px;
  }
  ${AboutPageButtonStyled} {
    background: #e8efd7;
    color: #173f2e;
    &:hover {
      background: #d8e5bc;
    }
  }
  ${minWidth.md(css`
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 56px;
    padding: 48px;
    align-items: center;
  `)}
`
export const AboutPageContactCopyStyled = styled.div`
  max-width: 540px;
`
export const AboutPageContactLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: clamp(14px, 1.7vw, 20px);
  color: #173f2e;
  text-decoration: underline;
  text-underline-offset: 6px;
  padding: 12px 0;
  overflow-wrap: anywhere;
`
export const AboutPageContactStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding: 48px 0 8px;
  ${AboutPageTextStyled} {
    margin-top: 16px;
  }
  ${minWidth.md(css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding: 64px 0 16px;
  `)}
`
export const AboutPageStyled = styled.div`
  max-width: 1328px;
  margin: auto;
  padding: 24px 24px 44px;
  ${minWidth.md(css`
    padding: 28px 40px 64px;
  `)}
`
