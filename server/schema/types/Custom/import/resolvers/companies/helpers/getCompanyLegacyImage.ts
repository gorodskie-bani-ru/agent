import { galleryResolver } from '../../../helpers/gallery'
import { imageResolver } from '../../../helpers/imageResolver'
import { TemplateVarIDs } from '../../../interfaces'
import {
  bani684_site_tmplvar_contentvalues,
  ResourceInterface,
} from '../../../types'

/**
 * @deprecated
 */
export function getCompanyLegacyImage(
  parent: ResourceInterface,
): string | null | undefined {
  const TemplateVarValues =
    'TemplateVarValues' in parent
      ? (parent.TemplateVarValues as bani684_site_tmplvar_contentvalues[])
      : undefined

  let image =
    TemplateVarValues?.find((n) => n.tmplvarid === TemplateVarIDs.image)
      ?.value || null

  if (image) {
    image = imageResolver(image)
  } else {
    const gallery = galleryResolver(parent)

    if (gallery && gallery[0]) {
      const item = gallery[0]

      image = item.image
    }
  }

  return image
}
