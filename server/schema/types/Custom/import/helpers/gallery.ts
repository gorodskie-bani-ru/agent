import { GalleryImage, TemplateVarIDs } from '../interfaces'
import { bani684_site_tmplvar_contentvalues } from '../types'
import { imageResolver } from './imageResolver'

// export function galleryResolver: FieldResolver<'CompanyLegacy', 'gallery'> = (
export function galleryResolver(
  // parent: NexusGenObjects['CompanyLegacy']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any,
): GalleryImage[] {
  type File = {
    title: string
    image: string
    description: string
  }

  let gallery: File[] = []

  const galleryTV = parent.TemplateVarValues?.find(
    (n: bani684_site_tmplvar_contentvalues) =>
      n.tmplvarid === TemplateVarIDs.gallery,
  )

  if (galleryTV?.value) {
    try {
      gallery = JSON.parse(galleryTV.value)
        .map(({ title = '', image = '', description = '' }) => {
          if (!image) {
            return
          }

          return {
            title,
            image: imageResolver(image),
            description,
          }
        })
        .filter((n: File | null) => n)
    } catch (error) {
      console.error(error)
    }
  }

  return gallery
}
