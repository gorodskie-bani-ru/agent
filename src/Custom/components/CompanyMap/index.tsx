import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
// import { CompanyFragment, CompanyLegacyFragment } from 'src/gql/generated'
import { CompanyMapStyled } from './styles'
import { useAppContext } from 'src/components/AppContext'
import { mapPotition } from '../OsmMap/interfaces'
import { Company } from 'src/Custom/interfaces'

const OsmMap = dynamic(() => import('../OsmMap').then((r) => r.OsmMap), {
  ssr: false,
})

type CompanyMapProps = {
  company: Company
}

/**
 * Карта в карточке компании
 */
export const CompanyMap: React.FC<CompanyMapProps> = ({
  company,
  ...other
}) => {
  const { mapData } = useAppContext()

  const { lat, lng } = company

  const { mapPostionSetter } = mapData || {}

  const [position, positionSetter] = useState<mapPotition>()

  /**
   * Вычисляем отдельно, так как бывает компания каждый раз новый объект
   */
  // let lat: number | null | undefined
  // let lng: number | null | undefined

  // if (company.__typename === 'Company') {
  //   lat = company.lat
  //   lng = company.lng
  // } else if (company.__typename === 'CompanyLegacy') {
  //   lat = company.GeoObject?.lat
  //   lng = company.GeoObject?.lng
  // }

  useEffect(() => {
    if (lat && lng) {
      positionSetter({
        center: {
          lat,
          lng,
        },
        zoom: 14,
      })
    }
  }, [lat, lng])

  useEffect(() => {
    if (!position) {
      return
    }

    mapPostionSetter?.(position)
  }, [mapPostionSetter, position])

  return position ? (
    <CompanyMapStyled {...other}>
      <OsmMap />
    </CompanyMapStyled>
  ) : null
}
