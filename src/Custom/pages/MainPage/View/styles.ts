import Link from 'next/link'
import {
  CustomLayoutGridStyled,
  CustomLayoutSectionStyled,
} from 'src/Custom/Layout/styles'
import styled, { css } from 'styled-components'
import { minWidth } from '../../../../theme/helpers/media-query'

const aiButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  transition: background 0.2s;
  text-decoration: none;
  &:hover {
    background: #28583f;
    text-decoration: none;
  }
`

export const MainPageViewHeroStyled = styled.section`
  max-width: 1440px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  min-height: auto;

  ${minWidth.sm(css`
    grid-template-columns: 56% 44%;
    min-height: 590px;
  `)}

  ${minWidth.md(css`
    min-height: 620px;
  `)}
`

export const MainPageViewHeroCopyStyled = styled.div`
  padding: 36px 24px 28px;
  position: relative;
  z-index: 1;

  ${minWidth.sm(css`
    padding: 62px 0 52px max(40px, calc((100vw - 1248px) / 2));
  `)}

  ${minWidth.md(css`
    padding-top: 44px;
  `)}

  ${minWidth.xl(css`
    padding-left: 96px;
  `)}
`

export const MainPageViewEyebrowStyled = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 13px;
  border-radius: 30px;
  background: #e8efd7;
  font-size: 12px;
  font-weight: 700;
`

export const MainPageViewHeroTitleStyled = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  letter-spacing: -0.045em;

  font-size: clamp(40px, 7.5vw, 60px);
  line-height: 1.03;
  max-width: 610px;
  margin: 24px 0 22px 0;

  ${minWidth.sm(css`
    font-size: clamp(44px, 4.6vw, 67px);
    max-width: 640px;
    margin-right: 30px;
  `)}
`

export const MainPageViewHeroEmphasisStyled = styled.em`
  font-weight: 400;
  color: #4f6b46;
`

export const MainPageViewHeroDescriptionStyled = styled.p`
  font-size: 15px;
  line-height: 1.65;
  max-width: 580px;
  margin-right: 0;

  ${minWidth.sm(css`
    font-size: 16px;
    max-width: 480px;
    margin-right: 32px;
  `)}
`

export const MainPageViewPromptFormStyled = styled.form`
  margin-top: 30px;
  padding: 9px 9px 9px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: #fff;
  border: 1px solid #e6e6dd;
  border-radius: 13px;
  box-shadow: 0 8px 26px #2438270a;

  > svg {
    color: #92998f;
    flex-shrink: 0;
  }

  ${minWidth.sm(css`
    flex-wrap: nowrap;
    width: calc(100% + 56px);
  `)}

  ${minWidth.md(css`
    width: calc(100% - 24px);
  `)}
`

export const MainPageViewPromptLabelStyled = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const MainPageViewPromptInputStyled = styled.input`
  min-width: 0;
  width: 100%;
  flex: 1;
  border: 0;
  background: transparent;
  padding: 12px 0;
  font-size: 14px;
  color: inherit;

  &::placeholder {
    color: #757d76;
    opacity: 1;
  }

  ${minWidth.sm(css`
    flex: initial;
  `)}
`

export const MainPageViewSubmitButtonStyled = styled.button`
  ${aiButtonStyles}
  flex-shrink: 0;
  min-height: 50px;
  width: 100%;

  ${minWidth.sm(css`
    width: auto;
  `)}
`

export const MainPageViewSuggestionsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding: 0;

  ${minWidth.xs(css`
    padding-right: 12px;
  `)}
`

export const MainPageViewSuggestionButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 11px;
  border: 1px solid #dce0d4;
  border-radius: 30px;
  background: transparent;
  color: inherit;
  font-size: 11px;

  &:hover {
    background: #e8efd7;
    border-color: #b7c4a7;
  }
`

export const MainPageViewHeroHintStyled = styled.p`
  font-size: 11px;
  color: var(--muted);
  margin-top: 18px;
  max-width: 280px;

  ${minWidth.xs(css`
    max-width: none;
  `)}
`

export const MainPageViewHeroVisualStyled = styled.div`
  position: relative;
  min-width: 0;
  overflow: hidden;
  height: 280px;
  margin-left: 24px;
  border-radius: 100px 0 0 0;

  &::after {
    content: '';
    position: absolute;
    inset: 60% 0 0;
    background: linear-gradient(transparent, #14231970);
  }

  ${minWidth.xs(css`
    height: 320px;
  `)}

  ${minWidth.sm(css`
    height: auto;
    margin-left: 0;
    border-radius: 180px 0 0 0;
  `)}
`

export const MainPageViewHeroImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 62% center;
  position: absolute;
  inset: 0;
`

export const MainPageViewSourceBadgeStyled = styled.div`
  position: absolute;
  right: 24px;
  bottom: 52px;
  display: flex;
  gap: 12px;
  align-items: center;
  background: #faf9f5f2;
  padding: 15px 20px;
  border-radius: 12px;
  z-index: 1;

  ${minWidth.sm(css`
    right: 32px;
    bottom: 66px;
  `)}
`

export const MainPageViewSourceContentStyled = styled.span``

export const MainPageViewSourceTitleStyled = styled.strong`
  display: block;

  font-size: 13px;
  font-weight: 700;
`

export const MainPageViewSourceDescriptionStyled = styled.small`
  display: block;

  font-size: 11px;
  color: var(--muted);
  margin-top: 3px;
`

export const MainPageViewPhotoCaptionStyled = styled.span`
  position: absolute;
  bottom: 20px;
  right: 24px;
  z-index: 1;
  color: #fff;
  font-size: 12px;

  ${minWidth.sm(css`
    bottom: 26px;
    right: 32px;
  `)}
`

export const MainPageViewSectionStyled = styled(CustomLayoutSectionStyled)``

export const MainPageViewSectionHeadingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 28px;

  ${minWidth.xs(css`
    flex-direction: row;
    align-items: flex-end;
    gap: 24px;
  `)}
`

export const MainPageViewSectionHeadingCopyStyled = styled.div``

export const MainPageViewSectionKickerStyled = styled.span`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
`

export const MainPageViewSectionTitleStyled = styled.h2`
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  letter-spacing: -0.045em;

  font-size: clamp(30px, 3.2vw, 43px);
  line-height: 1.15;
`

export const MainPageViewTextLinkStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  font-size: 13px;
  white-space: nowrap;
  background: transparent;
  border: 0;
  padding: 8px 0;
  text-decoration: underline;
  text-underline-offset: 5px;
`

export const MainPageViewCompanyGridStyled = styled(CustomLayoutGridStyled)``

export const MainPageViewEmptyStateStyled = styled.div`
  border: 1px dashed #c7cfbf;
  padding: 30px;
  border-radius: 14px;
  color: var(--muted);
`

export const MainPageViewEmptyStateButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
`

export const MainPageViewAiSectionStyled = styled.section`
  background: #173f2e;
  color: #faf9f5;
`

export const MainPageViewAiInnerStyled = styled.div`
  max-width: 1328px;
  margin: auto;
  padding: 44px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  align-items: center;

  ${minWidth.sm(css`
    padding: 64px 40px;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  `)}

  ${minWidth.md(css`
    gap: 70px;
  `)}
`

export const MainPageViewAiCopyStyled = styled.div``

export const MainPageViewAiDescriptionStyled = styled.p`
  font-size: 15px;
  line-height: 1.7;
  margin: 22px 0 24px;
  color: #d8e1d7;
  max-width: 600px;

  ${minWidth.sm(css`
    max-width: 480px;
  `)}
`

export const MainPageViewLightButtonStyled = styled.button`
  ${aiButtonStyles}
`

export const MainPageViewConversationStyled = styled.div`
  background: #faf9f5;
  color: #20372c;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 16px 36px #081b1420;

  ${minWidth.xs(css`
    padding: 26px;
  `)}
`

export const MainPageViewConversationLabelStyled = styled.span`
  font-size: 11px;
  color: var(--muted);
`

export const MainPageViewUserMessageStyled = styled.div`
  margin: 22px 0 24px 20px;
  padding: 16px 18px;
  background: #e8efd7;
  border-radius: 14px 14px 2px 14px;
  font-size: 14px;

  ${minWidth.xs(css`
    margin-left: 50px;
  `)}
`

export const MainPageViewAssistantMessageStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

export const MainPageViewAssistantIconStyled = styled.span`
  display: grid;
  place-items: center;
  background: #173f2e;
  color: #e8efd7;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
`

export const MainPageViewAssistantTextStyled = styled.p`
  background: white;
  border: 1px solid #e5e6df;
  border-radius: 2px 14px 14px 14px;
  padding: 16px;
  font-size: 14px;
`

export const MainPageViewConversationReplyStyled = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
  background: white;
  border: 1px solid #e2e4da;
  border-radius: 30px;
  padding: 8px 8px 8px 18px;
  margin-top: 26px;
  color: var(--muted);
  font-size: 12px;
`

export const MainPageViewReplyIconStyled = styled.span`
  flex-shrink: 0;
  background: #173f2e;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`

export const MainPageViewConversationStepsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 10px;
  margin-top: 20px;
  color: var(--muted);
`

export const MainPageViewConversationStepStyled = styled.span``

export const MainPageViewCitiesSectionStyled = styled(
  MainPageViewSectionStyled,
)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  padding-top: 60px;
  padding-bottom: 60px;

  ${minWidth.xs(css`
    flex-direction: row;
    align-items: center;
  `)}

  ${minWidth.sm(css`
    align-items: flex-start;
  `)}
`

export const MainPageViewCitiesCopyStyled = styled.div``

export const MainPageViewCitiesDescriptionStyled = styled.p`
  font-size: 14px;
  color: var(--muted);
  margin-top: 14px;
`

export const MainPageViewCityActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  ${minWidth.xs(css`
    align-items: center;
  `)}

  ${minWidth.md(css`
    flex-direction: row;
    gap: 24px;
  `)}
`

export const MainPageViewCityLinkStyled = styled(Link)`
  ${aiButtonStyles}
`

export const MainPageViewTextButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  font-size: 13px;
  white-space: nowrap;
  background: transparent;
  border: 0;
  padding: 8px 0;
  text-decoration: underline;
  text-underline-offset: 5px;
`

export const MainPageViewStyled = styled.div`
  --muted: ${({ theme }) => theme.colors.text.secondary};
  ${MainPageViewAiCopyStyled} ${MainPageViewSectionKickerStyled} {
    color: #c2d3b3;
  }
  ${MainPageViewAiCopyStyled} ${MainPageViewSectionTitleStyled} {
    font-size: clamp(34px, 3.5vw, 48px);
  }
  ${MainPageViewAiCopyStyled} ${MainPageViewLightButtonStyled} {
    background: #e8efd7;
    color: #173f2e;
  }
  ${MainPageViewAiCopyStyled} ${MainPageViewLightButtonStyled}:hover {
    background: #d8e5bc;
  }
`
