import React, { useCallback } from 'react'
import { useMapEvents } from 'react-leaflet'
import { CurrentLocation } from './CurrentLocation'
import { LeafletEventHandlerFn, Map as LeafletMap } from 'leaflet'
import { useRouter } from 'next/router'
// import { UploadPhotoControl } from './UploadPhoto'
// import { MapGallery } from './Gallery'

export const MapEntities: React.FC = () => {
  const router = useRouter()

  /**
   * При изменении координат карты обновляем УРЛ страницы
   */
  const onMapChange = useCallback<LeafletEventHandlerFn>(
    (event) => {
      const target: LeafletMap = event.target

      const center = target.getCenter()
      const zoom = target.getZoom()

      const query = router.query

      router.query = {
        ...query,
        lat: center.lat.toString().substring(0, 7),
        lng: center.lng.toString().substring(0, 7),
        zoom: zoom.toString(),
      }

      router.replace(router)
    },
    [router],
  )

  useMapEvents({
    zoomend: onMapChange,
    moveend: onMapChange,
  })

  return (
    <>
      <CurrentLocation />
      {/* <UploadPhotoControl /> */}
      {/* <MapGallery /> */}
    </>
  )
}
