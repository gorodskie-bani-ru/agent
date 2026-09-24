import { View } from './View'
import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

import {
  ConceptsQueryVariables,
  KbConceptVisibility,
  useConceptsQuery,
} from 'src/gql/generated'
import { City, isCompany } from 'src/Custom/interfaces'
import { getConceptsConnectionQueryVariables } from '../Concepts/helpers'
import { useAppContext } from 'src/components/AppContext'
import { useMemo } from 'react'

const where: ConceptsQueryVariables['where'] = {
  type: {
    startsWith: 'company:',
  },
}

export type MainPageProps = {
  city: City | undefined
} & PageProps

export const MainPageCustom: Page<MainPageProps> = ({ siteOrigin, city }) => {
  const { user: currentUser } = useAppContext()

  const { lat, lng } = city || {}

  const variables = getConceptsConnectionQueryVariables({
    page: 1,
    currentUser,
    where: {
      ...(currentUser?.sudo === true
        ? { ...where, visibility: undefined }
        : where),
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
  })

  const response = useConceptsQuery({
    variables,
    skip: !lat || !lng,
  })

  const companies = useMemo(
    () => response.data?.response?.filter(isCompany) ?? [],
    [response.data?.response],
  )

  return (
    <>
      <SeoHeaders
        title="Городские и общественные бани"
        description="Все Городские и общественные бани"
        canonical={'/'}
        siteOrigin={siteOrigin}
      />

      <View companies={companies} />
    </>
  )
}

MainPageCustom.getInitialProps = async () => {
  // const { apolloClient, query } = appContext

  const moscow: City = {
    id: '1197',
    type: 'city:default',
    name: 'Москва',
    description: 'Бани Москвы',
    intro: '',
    image: null,
    createdById: '2',
    code: null,
    parentId: null,
    rootId: null,
    uri: '/moscow',
    path: null,
    quality: 0.7,
    visibility: KbConceptVisibility.PUBLIC,
    data: null,
    lat: 55.752898,
    lng: 37.621908,
    content: '',

    updatedAt: '2026-09-24T01:27:29.642Z' as unknown as City['updatedAt'],
    __typename: 'KBConcept',
  }

  // await apolloClient.query<
  //   CompaniesAgregationQuery,
  //   CompaniesAgregationQueryVariables
  // >({
  //   query: CompaniesAgregationDocument,
  //   variables: getCompaniesVariables({
  //     city: moscow,
  //     query,
  //   }).variables,
  // })

  return {
    city: moscow,
  }
}
