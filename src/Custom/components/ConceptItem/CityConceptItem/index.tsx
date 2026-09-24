import { City, isCompany } from 'src/Custom/interfaces'

import * as ApolloReactHooks from '@apollo/client/react'
import {
  ConceptsQuery,
  ConceptsQueryVariables,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { MainPageViewCompanyGridStyled } from 'src/Custom/pages/MainPage/View/styles'
import { useMemo } from 'react'
import { CompanyCard } from 'src/Custom/pages/MainPage/View/CompanyCard'
import { CustomLayoutSectionStyled } from 'src/Custom/Layout/styles'

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

  const companies = useMemo(
    () => response.data?.concepts?.filter(isCompany) ?? [],
    [response.data?.concepts],
  )

  return (
    <>
      <CustomLayoutSectionStyled>
        <MainPageViewCompanyGridStyled>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </MainPageViewCompanyGridStyled>
      </CustomLayoutSectionStyled>
    </>
  )
}
