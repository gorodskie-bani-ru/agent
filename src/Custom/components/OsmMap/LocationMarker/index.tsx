import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'
import { LocationMarkerButtonStyled } from './styles'

type LocationMarkerProps = {
  positionSetter: Dispatch<
    SetStateAction<{
      zoom: number
      center: {
        lat: number
        lng: number
      }
    }>
  >
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  positionSetter,
}) => {
  const map = useMap()

  useMapEvents({
    moveend() {
      positionSetter({
        zoom: map.getZoom(),
        center: map.getCenter(),
      })
    },
  })

  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        map.flyTo([latitude, longitude], 15)
      },
      (error) => {
        console.error('Geolocation error:', error.message)
      },
    )
  }, [map])

  return (
    <LocationMarkerButtonStyled
      type="button"
      onClick={handleMyLocation}
      title="Мое местоположение"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    </LocationMarkerButtonStyled>
  )
}
