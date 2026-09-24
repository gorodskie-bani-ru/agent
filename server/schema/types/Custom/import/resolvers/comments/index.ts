import { builder } from 'server/schema/builder'
import { processComment } from './processRow'
import { bani684_society_comments } from './types'

builder.mutationField('importComments', (t) =>
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
        .from<bani684_society_comments>('bani684_society_comments as c')
        .select('c.id')

      // .where('c.id', 204)

      const count = (await query.clone().count('* as count').first()).count

      // query.orderBy('createdon')
      query.orderBy('id')

      if (limit) {
        query.limit(limit)
      }

      const rows: { id: number }[] = await query

      let success = 0
      let skipped = 0

      const errors: {
        id: number
        error: unknown
      }[] = []

      for await (const row of rows) {
        await processComment(row.id, ctx)
          .then((r) => {
            if (r === null) {
              skipped++
            } else {
              success++
            }

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

      return { count, success, skipped, errors }
    },
  }),
)
