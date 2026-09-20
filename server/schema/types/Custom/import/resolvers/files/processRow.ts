import { PrismaContext } from 'server/context/interfaces'
import { File } from '../../types'
import { Prisma } from '@prisma/client'

type Row = File

export async function processFile(fileId: string, ctx: PrismaContext) {
  const { knex, prisma } = ctx

  try {
    const query = knex.from<Row>('File as t').where('t.id', fileId).first()

    const file: Row = await query

    const {
      id,
      createdAt,
      createdBy,
      encoding,
      filename,
      hash,
      mimetype,
      name,
      path,
      size,
      updatedAt,
    } = file

    const exists = await prisma.file.findFirst({
      where: {
        OR: [
          {
            id,
          },
        ],
      },
    })

    if (exists) {
      return
    }

    const data: Prisma.FileCreateInput = {
      id,
      createdAt,
      encoding,
      filename,
      hash,
      mimetype,
      name,
      path,
      size,
      updatedAt,
      CreatedBy: createdBy
        ? {
            connect: {
              id: createdBy,
            },
          }
        : undefined,
    }

    await prisma.file.create({
      data,
    })
  } catch (error) {
    console.error(error)

    throw error
  }

  return
}
