import { KbConceptFragment } from 'src/gql/generated'
import {
  ConceptItemStyled,
  ConceptItemMetaStyled,
  ConceptItemTitleStyled,
  ConceptItemDescriptionStyled,
  ConceptItemTypeStyled,
} from './styles'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import { ConceptItemVariant } from './interfaces'
import { UserLink } from 'src/components/Link/User'
import { ConceptLink } from 'src/components/Link/Concept'
import { isCity } from 'src/Custom/interfaces'
import { CityConceptItem } from './CityConceptItem'

type ConceptItemProps = {
  concept: KbConceptFragment
  variant: ConceptItemVariant
}

export const ConceptItemCustom: React.FC<ConceptItemProps> = ({
  concept,
  variant,
  ...other
}) => {
  const { id, name, description, type, content, CreatedBy } = concept

  let contentBlock: React.ReactNode | null

  switch (variant) {
    case 'full':
      {
        if (isCity(concept)) {
          return <CityConceptItem concept={concept} />
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

      {type && <ConceptItemTypeStyled>{type}</ConceptItemTypeStyled>}

      {description && (
        <ConceptItemDescriptionStyled>
          <Markdown>{description}</Markdown>
        </ConceptItemDescriptionStyled>
      )}

      {contentBlock}

      <ConceptItemMetaStyled>
        <ConceptLink object={concept}>
          <FormattedDate value={concept.updatedAt} format="dateTimeShort" />
        </ConceptLink>
        {CreatedBy && <UserLink user={CreatedBy} />}
      </ConceptItemMetaStyled>
    </ConceptItemStyled>
  )
}
