import { PrismaContext } from 'server/context/interfaces'
import { bani684_user_attributes, User } from '../../types'
import { Prisma } from '@prisma/client'

type Row = User &
  (Partial<bani684_user_attributes> | undefined) & {
    uaEmail?: string
    uaFullname?: string
    uaPhoto?: string
  }

export async function processUser(userId: string, ctx: PrismaContext) {
  const { knex, prisma } = ctx

  try {
    const query = knex
      .from<Row>('bani684_users as u')
      .leftJoin('bani684_user_attributes as ua', 'ua.internalKey', 'u.id')
      .where('u.id', userId)
      .first()

    query.select(
      'u.*',
      'ua.email as uaEmail',
      'ua.fullname as uaFullname',
      'ua.photo as uaPhoto',
    )

    // console.log('query.sql', query.toString())

    const user: Row = await query

    // console.log('user', user)

    const {
      id,
      approved,
      createdon,
      offer_date,
      photo,
      updatedAt,
      username,
      // data: userData,
      fullname,
      email,
      uaEmail,
      uaFullname,
      uaPhoto,
      // active,
      // content,
      // contract_date,
      // createdby,
      // delegate,
      // intro,
      // offer,
      // password,
      // phone,
      // sudo,
      // type,
    } = user

    const exists = username
      ? await prisma.user.findFirst({
          where: {
            OR: [
              {
                id,
              },
              {
                username,
              },
            ],
          },
        })
      : null

    if (exists) {
      return
    }

    const data: Prisma.UserCreateInput = {
      id,
      createdAt: createdon
        ? new Date(createdon * 1000)
        : offer_date
          ? new Date(offer_date * 1000)
          : updatedAt
            ? new Date(updatedAt)
            : undefined,
      fullname: fullname || uaFullname,
      email: email || uaEmail,
      status: approved ? 'active' : 'newbie',
      username,
      image: (photo
        ? `/assets/society/uploads/images/${photo}`
        : uaPhoto
          ? `/assets/images/${uaPhoto}`
          : undefined
      )?.replaceAll(/\/{2,}/g, '/'),
    }

    // console.log('user data', data)

    await prisma.user.create({
      data,
    })
  } catch (error) {
    console.error(error)

    throw error
  }

  return
}
