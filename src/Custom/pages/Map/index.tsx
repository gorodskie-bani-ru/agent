import dynamic from 'next/dynamic'
import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { MapPageGlobalStyles, MapPageStyled } from './styles'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useAppContext } from 'src/components/AppContext'

const OsmMap = dynamic(
  () => import('../../components/OsmMap').then((r) => r.OsmMap),
  {
    ssr: false,
  },
)

export const MapPage: Page = ({ siteOrigin }) => {
  const router = useRouter()

  const { mapData } = useAppContext()

  const { mapPostionSetter } = mapData || {}

  const queryLat = router.query.lat
  const queryLng = router.query.lng

  const center = useMemo(() => {
    if (typeof queryLat === 'string' && typeof queryLng === 'string') {
      const lat = parseFloat(queryLat)
      const lng = parseFloat(queryLng)
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng }
      }
    }
  }, [queryLat, queryLng])

  useEffect(() => {
    if (!center) {
      return
    }

    mapPostionSetter?.({
      center,
      zoom: 14,
    })
  }, [center, mapPostionSetter])

  return (
    <>
      <MapPageGlobalStyles />
      <SeoHeaders
        title={'Все бани и сауны на карте'}
        description={'Все бани и сауны на карте'}
        canonical={'/map'}
        siteOrigin={siteOrigin}
      />

      <MapPageStyled>
        <OsmMap />
      </MapPageStyled>
    </>
  )
}
