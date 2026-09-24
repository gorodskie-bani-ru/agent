import styled, { css } from 'styled-components'
import { minWidth } from '../../../../theme/helpers/media-query'

export const CitiesPageViewStyled = styled.div`
  max-width: 1328px;
  margin: auto;
  padding: 24px 24px 44px;

  ${minWidth.sm(css`
    padding: 28px 40px 64px;
  `)}
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .breadcrumbs {
    display: flex;
    gap: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 12px;
  }
  .breadcrumbs a {
    color: inherit;
  }
  .cities-heading {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: center;
    padding: 32px 0 40px;

    ${minWidth.sm(css`
      padding: 46px 0 40px;
      gap: 32px;
      grid-template-columns: 1fr 300px;
    `)}

    ${minWidth.md(css`
      gap: 60px;
      grid-template-columns: 1fr 330px;
    `)}
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #627357;

    ${minWidth.xs(css`
      font-size: 11px;
    `)}
  }
  h1,
  h2,
  h3 {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
  }
  h1 {
    font-size: 42px;
    line-height: 1.08;
    letter-spacing: -0.045em;
    margin: 20px 0;

    ${minWidth.xs(css`
      font-size: clamp(42px, 4.8vw, 66px);
    `)}
  }
  h1 em {
    color: #58724b;
  }
  .cities-heading > div > p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 15px;
    line-height: 1.75;
  }
  .ai-note {
    padding: 26px;
    background: #edf1e3;
    border: 1px solid #e1e7d5;
    border-radius: 18px;
  }
  .ai-icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #173f2e;
    color: #edf1e3;
    margin-bottom: 18px;
  }
  .ai-note h2 {
    font-size: 23px;
    line-height: 1.2;
  }
  .ai-note p {
    font-size: 13px;
    line-height: 1.7;
    margin: 12px 0 18px;
    color: #5c6859;
  }
  .ai-note button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #173f2e;
    background: none;
    border: 0;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 0;
  }
  .featured {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 0 0 40px;

    ${minWidth.xs(css`
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    `)}

    ${minWidth.sm(css`
      margin: 0 0 60px;
    `)}

    ${minWidth.md(css`
      grid-template-columns: repeat(4, minmax(0, 1fr));
    `)}
  }
  .featured a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 17px 18px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    background: #fff;
    font-size: 15px;
    transition:
      background 0.2s,
      border-color 0.2s;

    ${minWidth.xs(css`
      padding: 22px 18px;
    `)}
  }
  .featured a:hover {
    text-decoration: none;
    background: #edf1e3;
    border-color: #b4c2a7;
  }
  .city-number {
    font-size: 10px;
    color: #839079;
  }
  .featured svg {
    margin-left: auto;
    flex-shrink: 0;
  }
  .directory {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: 36px;
  }
  .directory-heading {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    ${minWidth.sm(css`
      align-items: center;
      flex-direction: row;
      gap: 30px;
    `)}
  }
  .section-kicker {
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #737f6a;
    margin-bottom: 10px;
  }
  .directory h2 {
    font-size: 32px;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 14px;

    ${minWidth.xs(css`
      font-size: 36px;
    `)}
  }
  .directory h2 > span {
    font:
      12px/1.5 'Nunito',
      Arial,
      sans-serif;
    background: #e9eee0;
    border-radius: 30px;
    padding: 4px 10px;
  }
  .search {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid #dce1d5;
    border-radius: 12px;
    background: white;
    padding: 8px 14px;
    width: 100%;
    color: #7a8375;

    ${minWidth.sm(css`
      width: 360px;
    `)}
  }
  .search:focus-within {
    border-color: #668a45;
    box-shadow: 0 0 0 3px #668a4515;
  }
  .search input {
    width: 100%;
    min-width: 0;
    padding: 9px 0;
    border: 0;
    background: none;
    color: #20372c;
    font-size: 14px;
  }
  .search input::-webkit-search-cancel-button {
    display: none;
  }
  .search button {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    background: #f1f3ec;
    color: inherit;
  }
  .search > svg {
    flex-shrink: 0;
  }
  .search-status {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 18px 0;
  }
  .alphabet {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 16px 0 24px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  .alphabet a {
    width: 38px;
    min-height: 40px;
    display: grid;
    place-items: center;
    font-size: 13px;
    border-radius: 7px;
    background: #edf0e6;

    ${minWidth.xs(css`
      width: 34px;
      min-height: 36px;
    `)}
  }
  .alphabet a:hover {
    color: white;
    background: #173f2e;
    text-decoration: none;
  }
  .city-groups {
    columns: 1;
    column-gap: 40px;
    padding-top: 32px;

    ${minWidth.xs(css`
      columns: 2;
    `)}

    ${minWidth.sm(css`
      column-gap: 28px;
    `)}

    ${minWidth.md(css`
      columns: 3;
      column-gap: 28px;
    `)}

    ${minWidth.lg(css`
      columns: 4;
      column-gap: 40px;
    `)}
  }
  .letter-group {
    break-inside: avoid;
    margin-bottom: 30px;
    scroll-margin-top: 28px;
  }
  .letter-group h3 {
    font-size: 29px;
    color: #607b50;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e6db;
    margin-bottom: 8px;
  }
  ul {
    list-style: none;
  }
  li a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 11px 0;
    font-size: 15px;
    overflow-wrap: anywhere;

    ${minWidth.xs(css`
      padding: 9px 0;
      font-size: 14px;
    `)}
  }
  li a svg {
    color: #829079;
    flex-shrink: 0;
    opacity: 1;

    ${minWidth.xs(css`
      opacity: 0;
    `)}
  }
  li a:hover svg,
  li a:focus-visible svg {
    opacity: 1;
  }
  .empty-state {
    text-align: center;
    padding: 56px 24px;
    background: #f0f2e9;
    border-radius: 16px;
    margin: 26px 0;
  }
  .empty-state h3 {
    font-size: 28px;
    margin: 16px 0 12px;
  }
  .empty-state p {
    max-width: 450px;
    margin: 0 auto 24px;
    font-size: 14px;
    color: #68716a;
  }
  .cities-bottom {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    gap: 28px;
    padding: 26px;
    margin-top: 40px;
    background: #173f2e;
    border-radius: 18px;
    color: #faf9f5;

    ${minWidth.sm(css`
      align-items: center;
      flex-direction: row;
      padding: 32px;
    `)}
  }
  .cities-bottom .section-kicker {
    color: #c2d3b3;
  }
  .cities-bottom h2 {
    font-size: 30px;
    line-height: 1.2;
  }
  .cities-bottom p {
    font-size: 13px;
    color: #d5dfcf;
    margin-top: 12px;
    max-width: 530px;
  }
  .cities-bottom .ai-button {
    background: #e8efd7;
    color: #173f2e;
    flex-shrink: 0;
  }
  .cities-bottom .ai-button:hover {
    background: #d8e5bc;
  }
  .desktop-break {
    display: none;

    ${minWidth.sm(css`
      display: inline;
    `)}
  }
`
