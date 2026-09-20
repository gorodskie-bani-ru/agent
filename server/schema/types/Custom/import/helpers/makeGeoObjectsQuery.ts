import { PrismaContext } from 'server/context/interfaces'

export function makeGeoObjectsQuery({
  ctx: { knex },
  type,
}: {
  ctx: PrismaContext
  type: 'Company' | 'City'
}) {
  const query = knex
    .from<{ id: string }>('GeoObject as g')
    .where('type', type)
    .select('id', 'resourceId')

  return query
}
