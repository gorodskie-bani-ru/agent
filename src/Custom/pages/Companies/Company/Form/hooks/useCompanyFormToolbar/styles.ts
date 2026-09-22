import { Button } from 'src/ui-kit/Button'
// import Link from 'src/uikit/Link'
import styled, { css } from 'styled-components'

export const CompanyFormToolbarTabsStyled = styled.nav`
  display: flex;
  gap: 10px;
  overflow-x: auto;

  /* Скрываем полосу прокрутки, сохраняя функциональность */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */
`

type TabItemStyledProps = {
  $active: boolean
  $hidden: boolean
}

export const TabItemStyled = styled(Button)<TabItemStyledProps>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? '#1976d2' : '#f5f5f5')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  cursor: pointer;
  position: relative;
  font-weight: bold; /* Всегда используем жирный шрифт */
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  outline: none;

  ${({ $hidden }) =>
    $hidden
      ? css`
          display: none;
        `
      : undefined}

  /* Чтобы предотвратить смещение при изменении стилей */
  /* &::after {
    content: attr(data-label);
    display: block;
    height: 0;
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
    font-weight: bold;
  } */

  &:hover {
    background-color: ${(props) => (props.$active ? '#1565c0' : '#e0e0e0')};
    color: ${(props) => (props.$active ? 'white' : 'inherit')};
  }
`
