import { Prisma } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import { KBConceptWhereInput } from '../inputs'
import {
  buildStringFilterWhere,
  buildStringNullableFilterWhere,
} from '../../helpers/buildStringNullableFilterWhere'

type KBConceptsWhereInputType = typeof KBConceptWhereInput.$inferInput

export async function buildKBConceptWhere(
  where: KBConceptsWhereInputType | null | undefined,
  ctx: PrismaContext | undefined,
): Promise<Prisma.KBConceptWhereInput> {
  const {
    // TODO Remove ids
    ids,
    id,
    type,
    name,
    createdById,
    code,
    content,
    description,
    parentId,
    rootId,
    visibility,
    coords,
    ...other
  } = where || {}

  const result: Prisma.KBConceptWhereInput = {
    id: buildStringFilterWhere(id),
    name: buildStringFilterWhere(name),
    createdById: buildStringFilterWhere(createdById),
    type: buildStringNullableFilterWhere(type),
    code: buildStringNullableFilterWhere(code),
    content: buildStringNullableFilterWhere(content),
    description: buildStringNullableFilterWhere(description),
    parentId: buildStringNullableFilterWhere(parentId),
    rootId: buildStringNullableFilterWhere(rootId),
    visibility: visibility ?? undefined,
    ...other,
  }

  if (ids?.length) {
    result.id = {
      in: ids,
    }
  }

  if (coords && ctx?.prisma) {
    const { lat, lng } = coords

    const ids = await ctx.prisma.$queryRaw<{ id: string }[]>`
      SELECT c.id FROM "KBConcept" c
      WHERE c.lat IS NOT NULL AND c.lng IS NOT NULL
      AND (6371 * acos(cos(radians(${lat})) * cos(radians(c.lat)) * 
           cos(radians(c.lng) - radians(${lng})) + 
           sin(radians(${lat})) * sin(radians(c.lat)))) < 10
    `

    result.AND = [
      {
        id: {
          in: ids.map((row) => row.id),
        },
      },
    ]
  }

  return result
}
