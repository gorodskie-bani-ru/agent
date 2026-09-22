import { MapItemCompany } from 'src/Custom/interfaces'

type Coordinates = {
  lat: number
  lng: number
}

export enum MarkerType {
  cluster = 'cluster',
  company = 'company',
}

// TODO Разбить это на отдельные типы для кластера и одиночного объекта
export type ClusteredMarker = {
  __typename: MapItemCompany['__typename']
  id: string
  lat: number
  lng: number
  name: string
  url: string | undefined
  type: MarkerType
  markers?: MapItemCompany[]
  count?: number
}

/**
 * Вычисляет расстояние между двумя точками в км
 */
const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates,
): number => {
  const R = 6371 // Радиус Земли в км

  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
  const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Получает оптимальное расстояние для кластеризации на основе уровня зума
 */
const getClusterRadius = (zoom: number): number => {
  // Чем больше цифра в этой таблице, тем более агрессивная группировка маркеров
  const zoomToRadiusMap: Record<number, number> = {
    3: 500, // очень далекий зум - большие кластеры
    4: 350,
    5: 200,
    6: 120,
    7: 50, // дополнительно уменьшен с 100 до 50
    8: 30,
    9: 15,
    10: 8,
    11: 4,
    12: 1.5, // уменьшен с 3 до 1.5 для более четкого отображения отдельных компаний
    13: 0.8,
    14: 0.4,
    15: 0.2,
    16: 0.1,
    17: 0.05, // Детальный зум, минимальная кластеризация
    18: 0.03,
    19: 0.015,
    20: 0.01,
    21: 0.005,
  }

  // Если зум не найден в карте, используем значение для ближайшего меньшего зума
  if (zoom in zoomToRadiusMap) {
    return zoomToRadiusMap[zoom]
  }

  // Или используем формулу для плавного масштабирования
  return 100 / Math.pow(1.8, zoom - 3) // Экспоненциальное уменьшение радиуса с увеличением зума
}

/**
 * Группирует маркеры на основе их координат и текущего уровня зума
 */
export const clusterMarkers = (
  markers: MapItemCompany[],
  zoom: number,
): ClusteredMarker[] => {
  if (!markers.length) {
    return []
  }

  // Всегда проводим кластеризацию независимо от зума
  // Радиус кластеризации будет выбран в соответствии с текущим зумом

  const clusterRadius = getClusterRadius(zoom)
  const clustered: ClusteredMarker[] = []
  const processed = new Set<string>()

  markers.forEach((marker) => {
    if (processed.has(marker.id)) {
      return
    }

    processed.add(marker.id)

    // Находим все близлежащие маркеры
    const nearbyMarkers = markers.filter(
      (m) =>
        !processed.has(m.id) &&
        calculateDistance(
          { lat: marker.lat, lng: marker.lng },
          { lat: m.lat, lng: m.lng },
        ) <= clusterRadius,
    )

    // Если есть близлежащие маркеры, создаем кластер
    if (nearbyMarkers.length > 0) {
      // Добавляем текущий маркер к группе близлежащих
      const allClusterMarkers = [marker, ...nearbyMarkers]

      // Вычисляем центр кластера как среднее значение координат
      const centerLat =
        allClusterMarkers.reduce((sum, m) => sum + m.lat, 0) /
        allClusterMarkers.length
      const centerLng =
        allClusterMarkers.reduce((sum, m) => sum + m.lng, 0) /
        allClusterMarkers.length

      // Создаем объект кластера
      clustered.push({
        __typename: undefined,
        id: `cluster-${marker.id}`,
        lat: centerLat,
        lng: centerLng,
        name: `Группа (${allClusterMarkers.length})`,
        type: MarkerType.cluster,
        markers: allClusterMarkers,
        count: allClusterMarkers.length,
        url: undefined,
      })

      // Помечаем все близлежащие маркеры как обработанные
      nearbyMarkers.forEach((m) => processed.add(m.id))
    } else {
      // Если близлежащих маркеров нет, добавляем маркер без группировки
      clustered.push({
        __typename: marker.__typename,
        id: marker.id,
        lat: marker.lat,
        lng: marker.lng,
        name: marker.name ?? '',
        url: marker.uri,
        type: MarkerType.company,
      })
    }
  })

  return clustered
}
