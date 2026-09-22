import { useMemo } from 'react'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { Company } from '../interfaces'

type useCompanyDataProps = {
  company: Company
}

export function formatCompanyData(company: useCompanyDataProps['company']) {
  const {
    image: sourceImage,
    //  Images
  } = company

  // const Image = Images?.at(0)

  let slider_thumb: string | undefined
  let image: string | undefined

  // const { path } = Image || {}

  if (sourceImage) {
    // slider_thumb = createResizedUrl(sourceImage, 'slider_thumb')
    // image = createResizedUrl(sourceImage, 'middle')
    image = slider_thumb = getResizedImagePath({
      path: sourceImage,
      size: 'middle',
    })
    // image = createResizedUrl(sourceImage, 'middle')
  }

  return { slider_thumb, image }
}

export function useCompanyData({ company }: useCompanyDataProps) {
  const companyData = useMemo(() => {
    return formatCompanyData(company)
  }, [company])

  return companyData
}
