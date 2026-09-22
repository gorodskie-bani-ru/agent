import dynamic from 'next/dynamic'
import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { MapPageGlobalStyles, MapPageStyled } from './styles'

const OsmMap = dynamic(
  () => import('../../components/OsmMap').then((r) => r.OsmMap),
  {
    ssr: false,
  },
)

export const MapPage: Page = ({ siteOrigin }) => {
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
