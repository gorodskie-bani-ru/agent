import { Markdown } from 'src/components/Markdown'
import { Company } from 'src/Custom/interfaces'
import { CompanyConceptItemStyled } from './styles'
import { CompanyMap } from 'src/Custom/components/CompanyMap'
import { ConceptGallery } from 'src/Custom/components/Gallery'

type CompanyConceptItemProps = {
  concept: Company
}

export const CompanyConceptItem: React.FC<CompanyConceptItemProps> = ({
  concept,
}) => {
  const { name, content } = concept

  return (
    <CompanyConceptItemStyled>
      <header className="company-heading">
        <p className="company-eyebrow">Городские бани · Каталог заведений</p>
        <h1>{name}</h1>
      </header>
      <ConceptGallery key={concept.id} concept={concept} />
      {content && (
        <section className="company-description" aria-label="О заведении">
          <Markdown>{content}</Markdown>
        </section>
      )}

      <CompanyMap company={concept} />
    </CompanyConceptItemStyled>
  )
}
