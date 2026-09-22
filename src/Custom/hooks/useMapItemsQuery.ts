import { useMemo } from 'react'
import { useConceptsQuery } from 'src/gql/generated'
import { MapItemCompany, isMapItemCompany } from '../interfaces'

export function useMapItemsQuery() {
  const response = useConceptsQuery({
    variables: {
      where: {},
    },
  })

  const items = useMemo<MapItemCompany[]>(
    () => response.data?.response?.filter(isMapItemCompany) ?? [],
    // response.data?.response?.filter((n) => (n.lat && n.lng ? true : false)) ??
    [response.data?.response],
  )

  return items
}
