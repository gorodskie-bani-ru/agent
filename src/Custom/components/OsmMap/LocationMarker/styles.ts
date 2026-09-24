import styled from 'styled-components'

export const LocationMarkerButtonStyled = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  width: 32px;
  height: 32px;
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;

  &:hover {
    background: #f4f4f4;
  }
`
