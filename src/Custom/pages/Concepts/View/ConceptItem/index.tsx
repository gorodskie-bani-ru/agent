import { KbConceptFragment } from 'src/gql/generated'
import {
  ConceptItemStyled,
  // ConceptItemMetaStyled,
  ConceptItemTitleStyled,
  ConceptItemDescriptionStyled,
  // ConceptItemTypeStyled,
} from './styles'
// import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import { ConceptItemVariant } from './interfaces'
// import { UserLink } from 'src/components/Link/User'
import { ConceptLink } from 'src/components/Link/Concept'
import { isCity, isCompany } from 'src/Custom/interfaces'
import { CityConceptItem } from './CityConceptItem'
import { CompanyConceptItem } from './CompanyConceptItem'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'

type ConceptItemProps = {
  concept: KbConceptFragment
  variant: ConceptItemVariant
}

export const ConceptItemCustom: React.FC<ConceptItemProps> = ({
  concept,
  variant,
  ...other
}) => {
  const { id, name, description, image, content } = concept

  let contentBlock: React.ReactNode | null

  switch (variant) {
    case 'full':
      {
        if (isCity(concept)) {
          return <CityConceptItem concept={concept} />
        } else if (isCompany(concept)) {
          return <CompanyConceptItem concept={concept} />
        }

        contentBlock = <>{content && <Markdown>{content}</Markdown>}</>
      }
      break

    default:
      contentBlock = null
  }

  return (
    <ConceptItemStyled {...other} $variant={variant}>
      <ConceptLink object={concept}>
        <ConceptItemTitleStyled>{name || id}</ConceptItemTitleStyled>
      </ConceptLink>

      {/* {type && <ConceptItemTypeStyled>{type}</ConceptItemTypeStyled>} */}

      {image && (
        <img
          src={getResizedImagePath({
            path: image,
            size: 'middle',
          })}
        />
      )}

      {description && (
        <ConceptItemDescriptionStyled>
          <Markdown>{description}</Markdown>
        </ConceptItemDescriptionStyled>
      )}

      {contentBlock}

      {/* <ConceptItemMetaStyled>
        <ConceptLink object={concept}>
          <FormattedDate value={concept.updatedAt} format="dateTimeShort" />
        </ConceptLink>
        {CreatedBy && <UserLink user={CreatedBy} />}
      </ConceptItemMetaStyled> */}
    </ConceptItemStyled>
  )
}
