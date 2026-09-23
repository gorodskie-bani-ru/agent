import { PrismaContext } from 'server/context/interfaces'
import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import crypto from 'crypto'
import mime from 'mime-types'

import { MigxFile } from '../resolvers/companies/interfaces'

export async function createFile(
  fileData: MigxFile,
  createdById: string,
  ctx: PrismaContext,
) {
  const { prisma } = ctx

  const { image: path, title: name, description } = fileData

  if (!path) {
    return
  }

  const fullPath = resolve(process.cwd(), 'uploads/images', path)

  if (!existsSync(fullPath)) {
    console.error('File does not exists', fullPath)

    return
  }

  const fileBuffer = readFileSync(fullPath)
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex')

  const exists = await prisma.file.findFirst({
    where: {
      OR: [
        {
          path,
        },
        {
          hash,
        },
      ],
    },
  })

  if (exists) {
    return exists
  }

  const mimetypeData = mime.lookup(fullPath)
  const filename = path.split('/').pop() || path

  const encoding = 'binary'
  const mimetype = mimetypeData || 'application/octet-stream'

  return await prisma.file.create({
    data: {
      path,
      encoding,
      mimetype,
      name: name || filename,
      description: description || null,
      createdById,
      filename,
      hash,
    },
  })
}
