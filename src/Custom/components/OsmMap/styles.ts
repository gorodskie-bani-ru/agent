import styled, { css } from 'styled-components'
import { theme } from 'src/theme'

// Создаем стили для контейнера маркера
const markerStyles = css`
  .company-marker-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .company-title {
    background-color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: bold;
    white-space: nowrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin-left: 5px;
    color: #000;
    font-size: 12px;
    font-family: Arial, sans-serif;
  }

  .marker-icon {
    font-size: 0;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`

export const OsmMapStyled = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .leaflet-container {
    height: 100%;

    .user-position {
      width: 20px;
      height: 20px;
    }

    .leaflet-popup-content {
      width: auto !important;
    }

    .border-rounded {
      border-radius: 50%;
    }

    .leaflet-control {
      &.leaflet-control-attribution {
        display: none;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 60%;
          height: 60%;
        }
      }
    }
  }

  ${markerStyles}
`

export const OsmMapImgStyled = styled.img`
  @media (orientation: landscape) {
    width: auto;
    height: min-content;
    max-height: 300px;
    object-fit: contain;

    @media screen and (min-width: ${theme.breakpoints.sm}px) {
      height: 80dvh;
      width: fit-content;
      max-width: 573px;
      max-height: 430px;
    }
  }

  @media (orientation: portrait) {
    width: 80vw;
    height: max-content;
    max-width: 573px;
    max-height: 430px;
    object-fit: contain;

    @media screen and (min-width: ${theme.breakpoints.sm}px) {
      width: auto;
      max-width: 300px;
      max-height: 430px;
      object-fit: contain;
    }

    @media screen and (min-width: ${theme.breakpoints.sm}px) {
      width: 80dvh;
      height: auto;
    }
  }
`
