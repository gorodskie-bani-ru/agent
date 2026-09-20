import { PrismaContext } from 'server/context/interfaces'
import { bani684_site_content } from '../types'

export function makeResourceQuery({ ctx: { knex } }: { ctx: PrismaContext }) {
  const query = knex.from<bani684_site_content>('bani684_site_content as r')

  return query
}
