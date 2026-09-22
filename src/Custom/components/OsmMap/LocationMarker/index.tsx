import React, { Dispatch, SetStateAction } from 'react'
import { useMapEvents } from 'react-leaflet'

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
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom())
    },
    moveend() {
      positionSetter({
        zoom: map.getZoom(),
        center: map.getCenter(),
      })
    },
  })

  return null // не рендерит ничего, только вешает слушатели
}
