import { useMemo } from 'react'
import { Marker } from 'react-leaflet'
import { Icon, divIcon, LeafletEventHandlerFnMap } from 'leaflet'
import { MarkerType } from '../helpers/clusterMarkers'
import { MapItemCompany } from 'src/Custom/interfaces'

// Функция для определения цвета кластера на основе количества маркеров
const getClusterColor = (count: number): string => {
  if (count < 10) {
    // голубой для малых кластеров
    return '#41b6c4'
  }
  if (count < 20) {
    // красный для средних
    return '#ff5722'
  }
  if (count < 50) {
    // желтый для крупных
    return '#ffa000'
  }
  return '#4CAF50' // зеленый для очень больших кластеров
}

// Функция для создания иконки кластера с цифрой внутри
const createClusterIcon = (count: number): ReturnType<typeof divIcon> => {
  const color = getClusterColor(count)

  const size = count < 10 ? 30 : count < 50 ? 40 : 50
  const fontSize = count < 10 ? 12 : count < 50 ? 14 : 16

  const clusterSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${
        size / 2
      }" fill="${color}" opacity="0.7" />
      <circle cx="${size / 2}" cy="${size / 2}" r="${
        size / 2 - 3
      }" fill="${color}" />
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="${fontSize}px" font-weight="bold" font-family="Arial, sans-serif">${count}</text>
    </svg>
  `

  return divIcon({
    html: clusterSvg,
    className: 'cluster-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// Иначе используем стандартную иконку компании с названием
const svgIcon = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C10.4772 0 6 4.47716 6 10C6 12.6522 7.05357 14.6257 8.5 16.5986C9.89286 18.5716 11.6071 20.3039 13 22C15.5 25 15.7699 31.0472 15.9835 31.8164C15.9912 31.8772 16.0088 31.8772 16.0165 31.8164C16.2301 31.0472 16.5 25 19 22C20.3929 20.3039 22.1071 18.5716 23.5 16.5986C24.9464 14.6257 26 12.6522 26 10C26 4.47716 21.5228 0 16 0Z" fill="#007BFF"/>
    <circle cx="16" cy="10" r="4" fill="white"/>
    <path d="M12 14H20V19H12V14Z" fill="white"/>
    <path d="M13 15H15V17H13V15Z" fill="#007BFF"/>
    <path d="M17 15H19V17H17V15Z" fill="#007BFF"/>
  </svg>
`

type OsmMapMarkerProps = {
  latitude: number
  longitude: number
  customIcon?: Icon
  eventHandlers?: LeafletEventHandlerFnMap
} & (
  | {
      type: MarkerType.cluster
      geoObject: {
        id: string
        count: number
        name: string
      }
    }
  | {
      type: MarkerType.company
      geoObject: Omit<MapItemCompany, 'createdById' | 'updatedAt' | 'type'>
    }
)

export const OsmMapMarker: React.FC<OsmMapMarkerProps> = ({
  latitude,
  longitude,
  customIcon,
  geoObject,
  eventHandlers,
}) => {
  // Определяем, является ли объект кластером по наличию слова "Группа" в названии
  const isCluster = useMemo(() => {
    return geoObject.name && geoObject.name.startsWith('Группа (')
  }, [geoObject.name])

  // Извлекаем количество объектов из названия группы, если это кластер
  const clusterCount = useMemo(() => {
    if (isCluster) {
      const matches = geoObject.name?.match(/\((\d+)\)/) // Извлекаем число из "Группа (N)"
      return matches && matches[1] ? parseInt(matches[1], 10) : 0
    }
    return 0
  }, [geoObject.name, isCluster])

  // Создаем иконку в зависимости от типа маркера (обычная компания или кластер)
  const defaultCompanyIcon = useMemo(() => {
    // Если это кластер, используем специальную иконку кластера
    if (isCluster && clusterCount > 0) {
      return createClusterIcon(clusterCount)
    }

    // Создаем контейнер с иконкой и названием справа
    const markerHtml = `
      <div class="company-marker-container">
        <div class="marker-icon">${svgIcon}</div>
        <div class="company-title">${geoObject.name}</div>
      </div>
    `

    return divIcon({
      html: markerHtml,
      className: 'company-marker',
      iconSize: [200, 42], // Увеличиваем ширину для вмещения названия справа
      iconAnchor: [16, 42], // Якорь по иконке, не по центру всего контейнера
      popupAnchor: [0, -42],
    })
  }, [geoObject.name, isCluster, clusterCount])

  return (
    <Marker
      position={[latitude, longitude]}
      icon={customIcon || defaultCompanyIcon}
      eventHandlers={eventHandlers}
      data-id={geoObject.id}
    />
  )
}
