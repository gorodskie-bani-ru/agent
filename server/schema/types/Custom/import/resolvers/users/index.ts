import { builder } from 'server/schema/builder'
import { processUser } from './processRow'
import { User } from '../../types'

builder.mutationField('importUsers', (t) =>
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

      const query = knex.from<User>('bani684_users as u').select('id')

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
        await processUser(row.id, ctx)
          .then(() => {
            success++
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
