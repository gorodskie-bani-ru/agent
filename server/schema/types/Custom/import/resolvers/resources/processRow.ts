import { PrismaContext } from 'server/context/interfaces'
import { Prisma } from '@prisma/client'
import { GeoObject, Resource } from '../../types'
import { CustomKbConceptType } from 'src/Custom/interfaces'

type Row = Resource & (Partial<Pick<GeoObject, 'lat' | 'lng'>> | undefined)

export async function processResource(
  resourceIdProps: string,
  ctx: PrismaContext,
) {
  const { knex, prisma } = ctx

  try {
    const resourceId = resourceIdProps.toString()

    const query = knex
      .from<Row>('bani684_site_content as t')
      .leftJoin('GeoObject as g', 'g.resourceId', 't.id')
      .where('t.id', resourceIdProps)
      .first()

    query.select('t.*', 'g.lat', 'g.lng')

    // console.log('query.sql', query.toString())

    const resource: Row = await query

    // console.log('resource', resource)

    const {
      id: _id,
      content,
      createdby,
      description,
      hidemenu,
      longtitle,
      pagetitle,
      published,
      uri: url,
      lat,
      lng,
      deleted,
      template,
      createdon,
      // alias,
      // cacheable,
      // class_key,
      // companyId,
      // contentType,
      // content_dispo,
      // content_type,
      // context_key,
      // deletedby,
      // deletedon,
      // donthit,
      // editedby,
      // editedon,
      // hide_children_in_tree,
      // introtext,
      // isfolder,
      // link_attributes,
      // menuindex,
      // menutitle,
      // parent,
      // privatemgr,
      // privateweb,
      // properties,
      // pub_date,
      // publishedby,
      // publishedon,
      // richtext,
      // searchable,
      // show_in_tree,
      // type,
      // unpub_date,
      // uri_override,
    } = resource

    let uri: string

    if (!url) {
      uri = `/concepts/${resourceId}`
    } else {
      switch (url) {
        case 'index':
          uri = '/'
          break
        default:
          uri = url
      }
    }

    uri = `/${uri}`.replaceAll(/\/{2,}/g, '/')

    const exists = await prisma.kBConcept.findFirst({
      where: {
        OR: [
          {
            id: resourceId,
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

    const visibility: Prisma.KBConceptCreateInput['visibility'] =
      !published || !!deleted ? 'unpublished' : hidemenu ? 'hidden' : 'public'

    let type: Prisma.KBConceptCreateInput['type']

    //  template === 26 ? CustomKbConceptType.City.value

    switch (template) {
      case 26:
        type = CustomKbConceptType.City.value
        break
      case 27:
        type = CustomKbConceptType.Company.value
        break

      default:
        type = undefined
    }

    const data: Prisma.KBConceptCreateInput = {
      id: resourceId,
      uri,
      // alt,
      name: pagetitle,
      description: description || longtitle,
      intro: description,
      content,
      createdAt: createdon ? new Date(createdon * 1000) : undefined,
      // // dataSource,
      // image,
      // lat,
      // lng,
      // // ownerId,
      // // processed,
      // visibility,
      // // rating,
      // // reviews,
      // // status,
      type,
      //   ? `company:${type.toLocaleLowerCase()}`
      //   : CustomKbConceptType.Company.value,
      // updatedAt,

      visibility,

      CreatedBy: {
        connect: {
          id: createdby,
        },
      },
      // KBConceptFiles,
    }

    if (lat && lng) {
      data.lat = lat
      data.lng = lng
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
