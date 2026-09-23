import { builder } from 'server/schema/builder'
import { processResource } from './processRow'
import { bani684_site_content } from '../../types'

builder.mutationField('importResources', (t) =>
  t.field({
    type: 'Json',
    args: {
      limit: t.arg.int({ required: true }),
    },
    async resolve(_, { limit }, ctx) {
      const { currentUser, knex } = ctx

      if (!currentUser?.sudo) {
        throw new Error('Access denied')
      }

      const query = knex
        .from<bani684_site_content>('bani684_site_content as t')
        .select('id')
      // .where('uri', 'topics/usachevskie-bani-otkryilis!-1721.html')

      const count = (await query.clone().count('* as count').first()).count

      query.orderBy('createdon')

      if (limit) {
        query.limit(limit)
      }

      const rows: { id: string }[] = await query

      let success = 0
      const errors: {
        id: string
        error: unknown
      }[] = []

      for await (const row of rows) {
        await processResource(row.id, ctx)
          .then((r) => {
            success++

            return r
          })
          .catch((error) => {
            errors.push({
              id: row.id,
              error: error.message,
            })

            console.error(error)
          })
      }

      return { count, success, errors }
    },
  }),
)
