import {
  KBConcept,
  KBConceptVisibility,
  Prisma,
  UserStatus,
} from '@prisma/client'
import { Request, Response } from 'express'
import { prismaClient } from 'server/prisma'
import { buildPostWhere } from 'server/schema/types/Post/helpers/buildPostWhere'
import { buildUserWhere } from 'server/schema/types/User/helpers/buildUserWhere'
import { createConceptLink } from 'src/components/Link/Concept'

export enum SitemapSection {
  concepts = '/sitemap/concepts.xml',
  index = '/sitemap.xml',
  main = '/sitemap/main.xml',
  posts = '/sitemap/posts.xml',
  users = '/sitemap/users.xml',
}

type UrlItem = {
  url: string
  updatedAt: string
}

type SitemapGeneratorProps = {
  siteOrigin: string
}

const generateSitemapXML = (
  items: UrlItem[],
  {
    siteOrigin,
    priority = 0.9,
  }: SitemapGeneratorProps & {
    priority?: number
  },
): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  items.forEach((item) => {
    xml += '  <url>\n'
    xml += `    <loc>${siteOrigin}${item.url}</loc>\n`
    xml += `    <lastmod>${item.updatedAt}</lastmod>\n`
    xml += `    <priority>${priority}</priority>\n`
    xml += '  </url>\n'
  })

  xml += '</urlset>'
  return xml
}

export const generateSitemapIndex = async ({
  siteOrigin,
}: SitemapGeneratorProps): Promise<string> => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${siteOrigin}/sitemap/main.xml</loc>
    </sitemap>
    <sitemap>
        <loc>${siteOrigin}${SitemapSection.concepts}</loc>
    </sitemap>
</sitemapindex>`
}

async function getKbConcepts(): Promise<UrlItem[]> {
  const concepts = await prismaClient.$queryRaw<
    Pick<KBConcept, 'id' | 'uri' | 'updatedAt'>[]
  >`
    SELECT id, uri, "updatedAt" FROM "KBConcept" 
    WHERE visibility = ${Prisma.raw(`'${KBConceptVisibility.public}'`)} AND uri IS NOT NULL
    ORDER BY "updatedAt" DESC
  `

  return concepts
    .filter((n) => !!n.uri)
    .map((n) => ({
      updatedAt: new Date(n.updatedAt).toISOString(),
      url: createConceptLink(n),
    }))
}

const generateSitemapConcepts = async (
  props: SitemapGeneratorProps,
): Promise<string> => {
  const xmlData: UrlItem[] = await getKbConcepts()

  return generateSitemapXML(xmlData, props)
}

export const generateSitemapMain = async (
  props: SitemapGeneratorProps,
): Promise<string> => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(now)
  monday.setDate(now.getDate() - diffToMonday)

  const xmlData: UrlItem[] = [
    {
      url: `/`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/city`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/about`,
      updatedAt: monday.toISOString().split('T')[0],
    },
    {
      url: `/companies`,
      updatedAt: monday.toISOString().split('T')[0],
    },
  ]

  return generateSitemapXML(xmlData, props)
}

const postsWhere = buildPostWhere(
  {
    status: 'published',
  },
  undefined,
)

export const generateSitemapPosts = async (
  props: SitemapGeneratorProps,
): Promise<string> => {
  const posts = await prismaClient.post.findMany({
    where: postsWhere,
    orderBy: {
      createdAt: 'asc',
    },
  })

  const xmlData: UrlItem[] = posts.map((n) => {
    const { id, updatedAt } = n

    const uri = `/posts/${id}`

    return {
      url: `/${(uri ?? '').replaceAll(/^\/+|\/+$/g, '')}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

const usersWhere = buildUserWhere(
  {
    status: UserStatus.active,
  },
  undefined,
)

export const generateSitemapUsers = async (
  props: SitemapGeneratorProps,
): Promise<string> => {
  const posts = await prismaClient.user.findMany({
    where: usersWhere,
    orderBy: {
      createdAt: 'asc',
    },
  })

  const xmlData: UrlItem[] = posts.map((n) => {
    const { id, updatedAt } = n

    const uri = `/users/${id}`

    return {
      url: `/${(uri ?? '').replaceAll(/^\/+|\/+$/g, '')}`,
      updatedAt: updatedAt.toISOString(),
    }
  })

  return generateSitemapXML(xmlData, props)
}

export const generateSitemap = async (req: Request, res: Response) => {
  res.header('Content-Type', 'application/xml')

  const siteOrigin = `${req.protocol}://${req.headers.host}`

  switch (req.url) {
    case SitemapSection.concepts:
      res.send(await generateSitemapConcepts({ siteOrigin }))
      break
    case SitemapSection.index:
      res.send(await generateSitemapIndex({ siteOrigin }))
      break
    case SitemapSection.main:
      res.send(await generateSitemapMain({ siteOrigin }))
      break
    case SitemapSection.posts:
      res.send(await generateSitemapPosts({ siteOrigin }))
      break
    case SitemapSection.users:
      res.send(await generateSitemapUsers({ siteOrigin }))
      break
    default:
      res.status(404).send('Not found')
  }
}
