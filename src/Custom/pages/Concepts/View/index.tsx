import { KbConceptFragment } from 'src/gql/generated'
import { ConceptsViewListStyled, ConceptsViewStyled } from './styles'
import { Pagination } from 'src/components/Pagination'
import { ConceptItemCustom } from 'src/Custom/components/ConceptItem'

type ConceptsViewProps = {
  concepts: KbConceptFragment[]
  count: number
  limit: number
  page: number
}

export const ConceptsView: React.FC<ConceptsViewProps> = ({
  concepts,
  count,
  limit,
  page,
  ...other
}) => {
  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <ConceptsViewStyled {...other}>
      <ConceptsViewListStyled>
        {concepts.map((n) => {
          return <ConceptItemCustom key={n.id} concept={n} variant="list" />
        })}
      </ConceptsViewListStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </ConceptsViewStyled>
  )
}
