import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { CitiesPageView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import {
  ConceptsConnectionDocument,
  ConceptsConnectionQuery,
  ConceptsConnectionQueryVariables,
  ConceptsQueryVariables,
  KbConceptVisibility,
  SortOrder,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { getConceptsConnectionQueryVariables } from 'src/components/pages/Concepts/helpers'
import { getCurrentUser } from 'src/helpers/getCurrentUser'
import { useAppContext } from 'src/components/AppContext'
import { useMemo } from 'react'
import { isCity } from 'src/Custom/interfaces'

const customVariables = {
  where: {
    type: {
      startsWith: 'city:',
    },
    visibility: KbConceptVisibility.PUBLIC,
  },
  take: 10_000,
  orderBy: {
    name: SortOrder.ASC,
  },
} satisfies ConceptsQueryVariables

export const CitiesPage: Page<PageProps & { page: number }> = ({
  siteOrigin,
  page,
}) => {
  const { user: currentUser } = useAppContext()

  const variables = getConceptsConnectionQueryVariables({
    page,
    currentUser,
    ...customVariables,
    where: {
      ...customVariables.where,
      visibility:
        currentUser?.sudo === true
          ? undefined
          : customVariables.where.visibility,
    },
  })

  const response = useConceptsConnectionQuery({
    variables,
  })

  const cities = useMemo(
    () => response.data?.concepts?.filter(isCity) ?? [],
    [response.data?.concepts],
  )

  return (
    <>
      <SeoHeaders
        title="Бани и сауны по городам"
        description="Выберите город и найдите подходящую баню или сауну. Каталог заведений по городам и ИИ-помощник для поиска по вашим пожеланиям."
        siteOrigin={siteOrigin}
        canonical={'/city'}
      />

      <CitiesPageView
        cities={cities}
        loading={response.loading}
        error={!!response.error}
      />
    </>
  )
}

CitiesPage.getInitialProps = async ({ query, apolloClient }) => {
  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  const concepts = await apolloClient
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    .query<ConceptsConnectionQuery, ConceptsConnectionQueryVariables>({
      query: ConceptsConnectionDocument,
      variables: getConceptsConnectionQueryVariables({
        page: page,
        currentUser: getCurrentUser(apolloClient),
        ...customVariables,
      }),
    })
    .then((r) => r.data?.concepts)

  return {
    page,
    statusCode: !concepts?.length && page > 1 ? 404 : undefined,
  }
}
