import { useMemo, useState } from 'react'
import { mapPotition } from '../components/OsmMap/interfaces'
import { useMapItemsQuery } from './useMapItemsQuery'
import { clusterMarkers } from '../components/OsmMap/helpers/clusterMarkers'

export function useMapData() {
  const [mapPostion, mapPostionSetter] = useState<mapPotition>({
    zoom: 12,
    center: {
      lat: 55.755826,
      lng: 37.6173,
    },
  })

  const companyItems = useMapItemsQuery()

  const geoObjects = useMemo(() => {
    // const items = response.data?.mapItems ?? []

    // Фильтруем только объекты типа MapItemCompany
    // const companyItems = items.filter(
    //   (item): item is MapItemCompany => item.__typename === 'MapItemCompany'
    // )

    // Применяем функцию группировки
    const clusteredItems = clusterMarkers(companyItems, mapPostion.zoom)

    return clusteredItems
  }, [companyItems, mapPostion.zoom])

  return {
    geoObjects,
    mapPostion,
    mapPostionSetter,
  }
}

export type useMapDataResult = ReturnType<typeof useMapData>
