import { PageProps } from 'src/components/pages/_App/interfaces'

export type UserPageProps = PageProps & {
  userId: string | undefined
  username: string | undefined
}
