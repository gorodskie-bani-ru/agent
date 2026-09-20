import { PrismaContext } from 'server/context/interfaces'
import { makeResourceQuery } from '../../helpers/makeResourceQuery'
import { bani684_site_content } from '../../types'

export async function processCompany(resourceId: number, ctx: PrismaContext) {
  const query = makeResourceQuery({
    ctx,
  })

  try {
    const city: bani684_site_content = await query
      .where('id', resourceId)
      .first()

    if (!city) {
      throw new Error('Can not get city')
    }
  } catch (error) {
    console.error(error)

    throw error
  }

  return
}
