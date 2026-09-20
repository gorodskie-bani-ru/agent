import { builder } from 'server/schema/builder'
import { processFile } from './processRow'
import { File } from '../../types'

builder.mutationField('importFiles', (t) =>
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

      const query = knex.from<File>('File as f').select('id')

      const count = (await query.clone().count('* as count').first()).count

      query.orderBy('createdAt')

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
        await processFile(row.id, ctx)
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
