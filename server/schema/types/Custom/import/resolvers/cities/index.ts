import { builder } from 'server/schema/builder'
import { processCompany } from './processRow'
import { makeGeoObjectsQuery } from '../../helpers/makeGeoObjectsQuery'

builder.mutationField('importCities', (t) =>
  t.field({
    description: 'Города имспортированы с ресурсами',
    type: 'Json',
    args: {
      limit: t.arg.int({ required: true }),
    },
    async resolve(_, { limit }, ctx) {
      const { currentUser } = ctx

      if (!currentUser?.sudo) {
        throw new Error('Access denied')
      }

      const query = makeGeoObjectsQuery({
        ctx,
        type: 'City',
      })

      const count = (await query.clone().count('* as count').first()).count

      if (limit) {
        query.limit(limit)
      }

      const rows: {
        id: string
        resourceId: number
      }[] = await query

      let success = 0
      const errors: {
        id: string
        resourceId: number
        error: unknown
      }[] = []

      for await (const row of rows) {
        const id = row.id
        const resourceId = row.resourceId

        await processCompany(resourceId, ctx)
          .then(() => {
            success++
          })
          .catch((error) => {
            errors.push({
              id,
              resourceId,
              error: error.message,
            })

            console.error(error)
          })
      }

      return { count, success, errors }
    },
  }),
)
