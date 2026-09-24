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
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { CustomLayoutSectionStyled } from 'src/Custom/Layout/styles'
import {
  ConceptsConnectionDocument,
  ConceptsConnectionQuery,
  ConceptsConnectionQueryVariables,
  ConceptsQueryVariables,
  KbConceptFragment,
  useConceptsConnectionQuery,
} from 'src/gql/generated'
import { getCurrentUser } from 'src/helpers/getCurrentUser'
import { MainPageViewCompanyGridStyled } from '../MainPage/View/styles'
import { useMemo } from 'react'
import { isCompany } from 'src/Custom/interfaces'
import { CompanyCard } from '../MainPage/View/CompanyCard'
import { Pagination } from 'src/components/Pagination'

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

  const companies = useMemo(
    () => response.data?.concepts?.filter(isCompany) ?? [],
    [response.data?.concepts],
  )

  const count = response.data?.kBConceptsCount ?? 0

  const limit = response.variables.take ?? count

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <>
      <SeoHeaders
        title="Все бани и сауны"
        canonical={'/companies'}
        siteOrigin={siteOrigin}
      />

      <CustomLayoutSectionStyled>
        <MainPageViewCompanyGridStyled>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </MainPageViewCompanyGridStyled>
      </CustomLayoutSectionStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
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
