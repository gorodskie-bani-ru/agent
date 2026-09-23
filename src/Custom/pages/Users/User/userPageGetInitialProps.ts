import { Page } from 'src/components/pages/_App/interfaces'
import { UserPageProps } from './interfaces'
import { UserDocument, UserQuery, UserQueryVariables } from 'src/gql/generated'
import { getUserQueryVariables } from './helpers'

export const userPageGetInitialProps: Page<UserPageProps>['getInitialProps'] =
  async ({ query, apolloClient }) => {
    const userId: string | undefined =
      typeof query.id === 'string' && query.id ? query.id : undefined

    const username: string | undefined =
      typeof query.username === 'string' && query.username
        ? query.username
        : undefined

    const variables = getUserQueryVariables(userId, username)

    const user =
      variables.where.id || variables.where.username
        ? await apolloClient
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            .query<UserQuery, UserQueryVariables>({
              query: UserDocument,
              variables,
            })
            .then((r) => r.data?.object)
        : undefined

    return {
      userId,
      username,
      statusCode: !user ? 404 : undefined,
    }
  }
