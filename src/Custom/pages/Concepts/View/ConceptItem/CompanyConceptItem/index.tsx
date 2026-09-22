/* eslint-disable no-console */
import { Company } from 'src/Custom/interfaces'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'

type CompanyConceptItemProps = {
  concept: Company
}

export const CompanyConceptItem: React.FC<CompanyConceptItemProps> = ({
  concept,
}) => {
  console.log('concept', concept)

  const { name, content, image } = concept

  const imageSrc = image
    ? getResizedImagePath({
        path: image,
        size: 'middle',
      })
    : undefined

  name
  content
  imageSrc

  return <></>
}
