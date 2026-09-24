import { Waves } from 'lucide-react'
import { BrandStyled } from './styles'

export const Brand: React.FC = () => (
  <BrandStyled href="/" aria-label="Городские бани — главная">
    <Waves aria-hidden="true" strokeWidth={1.5} />
    <span>
      <strong>городские бани</strong>
      <small>gorodskie-bani.ru</small>
    </span>
  </BrandStyled>
)
