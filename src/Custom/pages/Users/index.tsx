import { useUsersConnectionQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { UsersView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getUsersQueryVariables } from './helpers'
import { usersPageGetInitialProps } from './usersPageGetInitialProps'
import { UsersPageProps } from './interfaces'
import { useAppContext } from 'src/components/AppContext'
import { useMemo } from 'react'

export const UsersPageCustom: Page<UsersPageProps> = ({ page, siteOrigin }) => {
  const { user: currentUser } = useAppContext()

  const response = useUsersConnectionQuery({
    variables: getUsersQueryVariables({ currentUser, page }),
  })

  const users = useMemo(
    () => response.data?.users || [],
    [response.data?.users],
  )

  return (
    <>
      <SeoHeaders
        title="Users"
        siteOrigin={siteOrigin}
        canonical={`/people${page > 1 ? `?page=${page}` : ''}`}
      />
      <UsersView
        users={users}
        page={page}
        count={response.data?.usersCount ?? 0}
        limit={response.variables.first || 10}
      />
    </>
  )
}

UsersPageCustom.getInitialProps = usersPageGetInitialProps
