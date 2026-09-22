import React, { useCallback, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { icon } from 'leaflet'

import positionIcon from './assets/icon.svg'
import { MapControl } from '../../Control'

export const CurrentLocation: React.FC = () => {
  const map = useMap()

  const [position, positionSetter] = useState<GeolocationPosition>()

  const onClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      event.preventDefault()
      event.stopPropagation()

      const onSuccess: PositionCallback = (position) => {
        positionSetter(position)
        map.setView([position.coords.latitude, position.coords.longitude], 16)
      }

      navigator.geolocation.getCurrentPosition(onSuccess, console.error)
    },
    [map],
  )

  return (
    <>
      <MapControl position="topleft">
        <a href="./" title="Моя локация" onClick={onClick}>
          <img src={positionIcon.src} />
        </a>
      </MapControl>
      {position ? (
        <Marker
          position={[position.coords.latitude, position.coords.longitude]}
          icon={icon({
            iconUrl: positionIcon.src,
            className: 'user-position',
          })}
        ></Marker>
      ) : null}
    </>
  )
}
