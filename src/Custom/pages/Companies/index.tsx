import { useAppContext } from 'src/components/AppContext'
import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { getConceptsConnectionQueryVariables } from 'src/components/pages/Concepts/helpers'
import { ConceptsView } from 'src/components/pages/Concepts/View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import {
  ConceptsConnectionDocument,
  ConceptsConnectionQuery,
  ConceptsConnectionQueryVariables,
  ConceptsQueryVariables,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { getCurrentUser } from 'src/helpers/getCurrentUser'

const where: ConceptsQueryVariables['where'] = {
  type: {
    startsWith: 'company:',
  },
}

export const CompaniesPage: Page<PageProps & { page: number }> = ({
  siteOrigin,
  page,
}) => {
  const { user: currentUser } = useAppContext()

  const variables = getConceptsConnectionQueryVariables({
    page,
    currentUser,
    where:
      currentUser?.sudo === true ? { ...where, visibility: undefined } : where,
  })

  const response = useConceptsConnectionQuery({
    variables,
  })

  return (
    <>
      <SeoHeaders
        title="Все бани и сауны"
        canonical={'/companies'}
        siteOrigin={siteOrigin}
      />

      <ConceptsView
        concepts={response.data?.concepts ?? []}
        count={response.data?.kBConceptsCount ?? 0}
        page={page}
        limit={variables.take}
      />
    </>
  )
}

CompaniesPage.getInitialProps = async ({ query, apolloClient }) => {
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
        where,
      }),
    })
    .then((r) => r.data?.concepts)

  return {
    page,
    statusCode: !concepts?.length && page > 1 ? 404 : undefined,
  }
}
