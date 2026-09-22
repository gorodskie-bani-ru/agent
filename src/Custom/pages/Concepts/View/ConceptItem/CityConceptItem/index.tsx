import { City } from 'src/Custom/interfaces'

import * as ApolloReactHooks from '@apollo/client/react'
import {
  ConceptsQuery,
  ConceptsQueryVariables,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { ConceptItemCustom } from '..'

type getCompaniesVariablesProps = {
  lat: number | null | undefined
  lng: number | null | undefined
}

function getCompaniesQueryOptions({
  lat,
  lng,
}: getCompaniesVariablesProps): // eslint-disable-next-line @typescript-eslint/no-deprecated
ApolloReactHooks.QueryHookOptions<ConceptsQuery, ConceptsQueryVariables> {
  return {
    skip: !lat || !lng,
    variables: {
      where: {
        type: {
          startsWith: 'company:',
        },
        coords:
          lat && lng
            ? {
                lat,
                lng,
              }
            : undefined,
      },
    },
  }
}

type CityConceptItemProps = {
  concept: City
}

export const CityConceptItem: React.FC<CityConceptItemProps> = ({
  concept,
}) => {
  const { lat, lng } = concept

  const response = useConceptsConnectionQuery(
    getCompaniesQueryOptions({
      lat,
      lng,
    }),
  )

  return (
    <>
      {response.data?.concepts?.map((n) => {
        return <ConceptItemCustom key={n.id} variant="list" concept={n} />
      })}
    </>
  )
}
