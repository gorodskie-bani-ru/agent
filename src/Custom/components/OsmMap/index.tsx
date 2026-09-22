import { MapContainer, TileLayer } from 'react-leaflet'
import { OsmMapStyled } from './styles'
import { OsmMapMarker } from './Marker'
import { LocationMarker } from './LocationMarker'
import { useAppContext } from 'src/components/AppContext'
import { MapHandler } from './MapHandler'
import { MarkerType } from './helpers/clusterMarkers'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { LeafletEventHandlerFnMap, LeafletMouseEventHandlerFn } from 'leaflet'
// import { OsmMapMarker } from './Marker'
// import { useGeoObjects } from 'src/hooks/useGeoObjects'

export const OsmMap: React.FC = () => {
  const tileServerUrl = useMemo(() => {
    const TILE_SERVER_URL = process.env.NEXT_PUBLIC_TILE_SERVER_URL

    if (!TILE_SERVER_URL) {
      console.error('Can not get process.env.NEXT_PUBLIC_TILE_SERVER_URL')
    }

    return TILE_SERVER_URL
  }, [])

  const { mapData } = useAppContext()

  const { geoObjects, mapPostion: position, mapPostionSetter } = mapData || {}

  const router = useRouter()

  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(() => {
    const onClick: LeafletMouseEventHandlerFn = (event) => {
      const target: {
        options?: {
          ['data-id']?: string
        }
      } = event.target

      const id = target.options?.['data-id']

      if (id) {
        const geoObject = geoObjects?.find((n) => n.id === id)

        if (geoObject?.url) {
          router.push(geoObject.url)
        }
      }
    }

    return {
      click: onClick,
    }
  }, [geoObjects, router])

  return (
    tileServerUrl && (
      <OsmMapStyled>
        <MapContainer
          center={position?.center}
          zoom={position?.zoom}
          scrollWheelZoom
          maxZoom={18}
        >
          <MapHandler position={position} />

          {mapPostionSetter && (
            <LocationMarker positionSetter={mapPostionSetter} />
          )}

          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url={tileServerUrl}
          />

          {/* <MapEntities /> */}
          {geoObjects?.map((item) => {
            // Для кластера создаем специальную отрисовку
            if (item.type === MarkerType.cluster) {
              return (
                <OsmMapMarker
                  key={item.id}
                  type={item.type}
                  latitude={item.lat}
                  longitude={item.lng}
                  // Передаем первый объект из кластера как гео-объект
                  // Это нужно для соответствия типам, но отображаться будет другой контент
                  geoObject={{
                    id: item.id,
                    name: `Группа (${item.count || 0})`, // Показываем количество
                    count: item.count ?? 0,
                  }}
                />
              )
            } else if (item.type === MarkerType.company) {
              // Для одиночного маркера используем обычную отрисовку
              return (
                <OsmMapMarker
                  key={item.id}
                  type={item.type}
                  latitude={item.lat}
                  longitude={item.lng}
                  geoObject={{
                    id: item.id,
                    lat: item.lat,
                    lng: item.lng,
                    name: item.name,
                    uri: item.url ?? '',
                  }}
                  eventHandlers={eventHandlers}
                />
              )
            }
          })}
        </MapContainer>
      </OsmMapStyled>
    )
  )
}
