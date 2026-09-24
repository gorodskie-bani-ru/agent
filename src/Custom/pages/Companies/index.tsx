/* eslint-disable no-console */
import { useAppContext } from 'src/components/AppContext'
import {
  NextPageContextCustom,
  Page,
  PageProps,
} from 'src/components/pages/_App/interfaces'
import {
  getConceptsConnectionQueryVariables,
  getConceptsConnectionQueryVariablesProps,
} from 'src/components/pages/Concepts/helpers'
import { ConceptsView } from 'src/components/pages/Concepts/View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import {
  ConceptsConnectionDocument,
  ConceptsConnectionQuery,
  ConceptsConnectionQueryVariables,
  ConceptsQueryVariables,
  KbConceptFragment,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { getCurrentUser } from 'src/helpers/getCurrentUser'

const where: ConceptsQueryVariables['where'] = {
  type: {
    startsWith: 'company:',
  },
}

type CompaniesPageProps = Page<PageProps & { page: number }>

export const CompaniesPage: CompaniesPageProps = ({ siteOrigin, page }) => {
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

  console.log('response concepts', response.data?.concepts)

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

type getCompaniesProps = {
  context: NextPageContextCustom
  variables?: getConceptsConnectionQueryVariablesProps
}

export async function getCompanies({
  context: { query, apolloClient },
  variables,
}: getCompaniesProps): Promise<{
  concepts: KbConceptFragment[] | null | undefined
  page: number
}> {
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
        where: { ...where, ...variables?.where },
        ...variables,
      }),
    })
    .then((r) => r.data?.concepts)

  return { concepts, page }
}

CompaniesPage.getInitialProps = async (context) => {
  const { concepts, page } = await getCompanies({ context })

  return {
    page,
    statusCode: !concepts?.length && page > 1 ? 404 : undefined,
  }
}
