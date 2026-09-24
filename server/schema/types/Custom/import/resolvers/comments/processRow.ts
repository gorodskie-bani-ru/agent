import { PrismaContext } from 'server/context/interfaces'
import { Prisma } from '@prisma/client'
import { CustomKbConceptType } from 'src/Custom/interfaces'
import {
  bani684_society_comments,
  bani684_society_threads,
  bani684_site_content,
} from './types'

function makeCommentUri(id: number): string {
  return `/comments/comment-${id}.html`
}

type CommentRow = bani684_society_comments & {
  thread_target_id: number | null
  thread_target_class: string
}

export async function processComment(commentId: number, ctx: PrismaContext) {
  const { knex, prisma } = ctx

  // async function getTopicId(id: number){

  //   return( await prisma.kBConcept.findUnique({
  //     where: {
  //       id: id.toString()
  //     }
  //   }))
  // }

  try {
    const query = knex
      .from<CommentRow>('bani684_society_comments as c')
      .leftJoin('bani684_society_threads as t', 't.id', 'c.thread_id')
      .where('c.id', commentId)
      .select(
        'c.*',
        't.target_id as thread_target_id',
        't.target_class as thread_target_class',
      )
      .first()

    const comment: CommentRow | undefined = await query

    if (!comment) {
      throw new Error(`Comment ${commentId} not found`)
    }

    const {
      id,
      text,
      raw_text,
      createdby,
      createdon,
      published,
      deleted,
      parent,
      thread_target_id,
      thread_target_class,
    } = comment

    // console.log("comment", comment)

    const uri = makeCommentUri(id)

    let description = ''

    if (thread_target_class === 'modResource' && thread_target_id) {
      const topic = await knex
        .from<bani684_site_content>('bani684_site_content')
        .where('id', thread_target_id)
        .select('pagetitle')
        .first()

      if (topic) {
        description = `Комментарий к публикации "${topic.pagetitle}"`
      }
    }

    const exists = await prisma.kBConcept.findFirst({
      where: {
        uri,
      },
    })

    if (exists) {
      return null
    }

    const visibility: Prisma.KBConceptCreateInput['visibility'] =
      published !== '1' || deleted === '1' ? 'unpublished' : 'public'

    // let rootTopicId: string | undefined

    let rootConceptWhere: Prisma.KBConceptWhereUniqueInput | undefined

    if (thread_target_class === 'modResource' && thread_target_id) {
      // rootId = thread_target_id.toString()

      // rootTopicId = getTopicId(id: number)

      rootConceptWhere = {
        id: thread_target_id.toString(),
      }
    } else if (thread_target_class === 'SocietyComment' && thread_target_id) {
      const rootComment = await knex
        .from<bani684_society_comments>('bani684_society_comments')
        .where('id', thread_target_id)
        .first()

      if (rootComment) {
        const rootThread = await knex
          .from<bani684_society_threads>('bani684_society_threads')
          .where('id', rootComment.thread_id)
          .first()

        if (
          rootThread?.target_class === 'modResource' &&
          rootThread.target_id
        ) {
          // rootId = rootThread.target_id.toString()
          rootConceptWhere = {
            id: rootThread.target_id.toString(),
          }
        }
      }
    }

    const parentId = parent

    const data: Prisma.KBConceptCreateInput = {
      // id: commentIdStr,
      uri,
      name: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
      description,
      content: text || raw_text,
      createdAt: createdon ? new Date(createdon) : undefined,
      type: CustomKbConceptType.Comment.value,
      visibility,
      CreatedBy: {
        connect: {
          id: createdby,
        },
      },
    }

    if (rootConceptWhere) {
      const root = await prisma.kBConcept.findUnique({
        where: rootConceptWhere,
      })

      if (root) {
        data.Root = {
          connect: {
            id: root.id,
          },
        }
      }
    }

    if (parentId) {
      const uri = makeCommentUri(parentId)

      const parent = await prisma.kBConcept.findUnique({
        where: {
          uri,
        },
      })

      if (parent) {
        data.Parent = {
          connect: {
            id: parent.id,
          },
        }
      }
    }

    return await prisma.kBConcept.create({
      data,
    })
  } catch (error) {
    console.error(error)

    throw error
  }

  return
}
