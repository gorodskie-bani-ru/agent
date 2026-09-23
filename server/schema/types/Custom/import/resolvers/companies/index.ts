import { builder } from 'server/schema/builder'
import { processCompany } from './processRow'
import { Company } from '../../types'

builder.mutationField('importCompanies', (t) =>
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
        .from<{ id: Company['id'] }>('Company as c')
        .select('id')
      // .where('c.id', 'cmbdyhu3w02440qqlgik24ohd')

      const count = (await query.clone().count('* as count').first()).count

      if (limit) {
        query.limit(limit)
      }

      const ids: string[] = (await query).map((n) => n.id)

      let success = 0
      const errors: {
        id: string
        error: unknown
      }[] = []

      for await (const id of ids) {
        await processCompany(id, ctx)
          .then((r) => {
            success++

            return r
          })
          .catch((error) => {
            errors.push({
              id,
              error: error.message,
            })

            console.error(error)
          })
      }

      return { count, success, errors }
    },
  }),
)
