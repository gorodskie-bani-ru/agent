import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { CommentsPageView } from './View'
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
import { CustomKbConceptType, isComment } from 'src/Custom/interfaces'

const customVariables = {
  where: {
    type: {
      startsWith: CustomKbConceptType.Comment.value,
    },
    visibility: KbConceptVisibility.PUBLIC,
  },
  take: 10,
  orderBy: {
    name: SortOrder.ASC,
  },
} satisfies ConceptsQueryVariables

export const CommentsPage: Page<PageProps & { page: number }> = ({
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

  const comments = useMemo(
    () => response.data?.concepts?.filter(isComment) ?? [],
    [response.data?.concepts],
  )

  return (
    <>
      <SeoHeaders
        title="Обзоры и отзывы о банях и саунах"
        description="Обзоры и отзывы о банях и саунах"
        siteOrigin={siteOrigin}
        canonical={'/bani-otzivy'}
      />

      <CommentsPageView
        comments={comments}
        count={response.data?.kBConceptsCount ?? 0}
        limit={variables.take ?? 10}
        page={page}
      />
    </>
  )
}

CommentsPage.getInitialProps = async ({ query, apolloClient }) => {
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
