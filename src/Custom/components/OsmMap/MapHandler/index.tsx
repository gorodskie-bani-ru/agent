import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { mapPotition } from '../interfaces'

type MapHandlerProps = {
  position: mapPotition | undefined
}

export const MapHandler: React.FC<MapHandlerProps> = ({ position }) => {
  const map = useMap()

  const { center, zoom } = position || {}

  useEffect(() => {
    if (!center || !zoom) {
      return
    }

    map.setView(center, zoom)
  }, [center, zoom, map])

  // const map = useMapEvents({
  //   click(e) {
  //     map.flyTo(e.latlng, map.getZoom())
  //   },
  //   moveend() {
  //     // positionSetter({
  //     //   zoom: map.getZoom(),
  //     //   center: map.getCenter(),
  //     // })
  //   },
  // })

  // const context = useLeafletContext()

  return null
}
