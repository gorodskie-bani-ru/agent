import { PrismaContext } from 'server/context/interfaces'
import { Company, CompanyFile } from '../../types'
import { Prisma } from '@prisma/client'
import { CustomKbConceptType } from 'src/Custom/interfaces'
import {
  companiesQueryWithData,
  CompaniesQueryWithDataResult,
} from './helpers/companiesQueryWithData'
import { MigxFile } from './interfaces'
import { createFile } from '../../helpers/createFile'

export async function processCompany(companyId: string, ctx: PrismaContext) {
  const { knex, prisma } = ctx

  const query = knex
    .from<Company>('Company as c')
    .where('id', companyId)
    .first()

  try {
    const company: Company | null = await query

    if (!company) {
      throw new Error('Can not get company')
    }

    const {
      // id,
      alt,
      createdAt,
      createdBy,
      data: content,
      description,
      image: companyImage,
      intro,
      lat,
      lng,
      name,
      processed,
      status,
      type,
      updatedAt,
      url,
      // dataSource,
      // ownerId,
      // rating,
      // reviews,
    } = company

    const uri = url || `/companies/${companyId}`

    const exists = await prisma.kBConcept.findFirst({
      where: {
        OR: [
          {
            id: companyId,
          },
          {
            uri,
          },
        ],
      },
    })

    if (exists) {
      return
    }

    const companyDataQuery = companiesQueryWithData
      .call(knex)
      .where('company.id', companyId)
      .first()

    const companyData: CompaniesQueryWithDataResult | null =
      await companyDataQuery

    const visibility: Prisma.KBConceptCreateInput['visibility'] =
      processed && status === 'active'
        ? 'public'
        : status === 'review'
          ? 'unpublished'
          : 'hidden'

    const CompanyFiles: CompanyFile[] = await knex
      .from<CompanyFile>('CompanyFile')
      .where('companyId', companyId)
      .orderBy('rank')

    const KBConceptFilesCreate: Prisma.KBConceptFileCreateManyKBConceptInput[] =
      []

    if (CompanyFiles.length) {
      // const filesData: Prisma.KBConceptFileCreateManyKBConceptInput[] = []

      CompanyFiles.forEach((n) => {
        KBConceptFilesCreate.push({
          fileId: n.fileId,
          createdById: createdBy,
        })
      })

      // KBConceptFiles = {
      //   createMany: {
      //     skipDuplicates: true,
      //     data: filesData,
      //   },
      // }
    }

    let image = companyImage

    if (!image && CompanyFiles[0]) {
      const fileId = CompanyFiles[0].fileId

      const file = await prisma.file.findUnique({
        where: {
          id: fileId,
        },
      })

      if (file) {
        image = file.path
      }
    }

    if (companyData) {
      if (companyData.resource_gallery) {
        try {
          const json: MigxFile[] | null = JSON.parse(
            companyData.resource_gallery,
          )

          if (json) {
            for await (const f of json) {
              await createFile(f, createdBy, ctx)
                .then((file) => {
                  if (file) {
                    KBConceptFilesCreate.push({
                      fileId: file.id,
                      createdById: createdBy,
                    })

                    if (!image) {
                      image = file.path
                    }
                  }
                })
                .catch(console.error)
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    const data: Prisma.KBConceptCreateInput = {
      id: companyId,
      uri,
      alt,
      name: name ?? '',
      description,
      intro,
      content,
      createdAt,
      // dataSource,
      image,
      lat,
      lng,
      // ownerId,
      // processed,
      visibility,
      // rating,
      // reviews,
      // status,
      type: type
        ? `company:${type.toLocaleLowerCase()}`
        : CustomKbConceptType.Company.value,
      updatedAt,

      CreatedBy: {
        connect: {
          id: createdBy,
        },
      },
      KBConceptFiles: {
        createMany: KBConceptFilesCreate.length
          ? {
              data: KBConceptFilesCreate,
              skipDuplicates: true,
            }
          : undefined,
      },
    }

    await prisma.kBConcept.create({
      data,
    })
  } catch (error) {
    console.error(error)

    throw error
  }

  return
}
