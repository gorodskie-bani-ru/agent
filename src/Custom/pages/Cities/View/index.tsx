import React from 'react'
import Link from 'next/link'
import { CitiesPageViewStyled } from './styles'
import { City } from 'src/Custom/interfaces'

type CitiesPageViewProps = {
  cities: City[]
}

export const CitiesPageView: React.FC<CitiesPageViewProps> = ({ cities }) => {
  return (
    <CitiesPageViewStyled quiantity={cities.length}>
      {cities.map((n) => {
        return (
          <Link key={n.id} href={n.uri} title={n.name}>
            {n.name}
          </Link>
        )
      })}
    </CitiesPageViewStyled>
  )
}
