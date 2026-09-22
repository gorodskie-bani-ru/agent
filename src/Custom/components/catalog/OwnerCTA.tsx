import styled from 'styled-components'
import { ArrowRight, Building2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const Wrap = styled.section`
  margin-top: 56px;
  padding: 36px;
  border-radius: ${({ theme }) => theme.lovable.radii.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.lovable.colors.accent} 0%,
    white 70%
  );
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    grid-template-columns: 2fr 1fr;
    align-items: center;
  }
`

const Body = styled.div`
  h2 {
    font-size: clamp(22px, 3vw, 30px);
    margin-bottom: 8px;
  }
  p {
    color: ${({ theme }) => theme.lovable.colors.textSoft};
    max-width: 580px;
  }
`

const Features = styled.ul`
  display: grid;
  gap: 8px;
  margin: 16px 0 20px;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14.5px;
    color: ${({ theme }) => theme.lovable.colors.textSoft};
  }
  svg {
    color: ${({ theme }) => theme.lovable.colors.primary};
  }
`

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const Primary = styled(Link)`
  background: ${({ theme }) => theme.lovable.colors.primary};
  color: white;
  padding: 12px 22px;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.primaryDark};
    text-decoration: none;
  }
`

const Secondary = styled(Link)`
  background: white;
  color: ${({ theme }) => theme.lovable.colors.primary};
  padding: 12px 22px;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  &:hover {
    border-color: ${({ theme }) => theme.lovable.colors.primary};
    text-decoration: none;
  }
`

const Plans = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  border-radius: ${({ theme }) => theme.lovable.radii.lg};
  padding: 18px;
  display: grid;
  gap: 12px;
`

const Plan = styled.div<{ $featured?: boolean }>`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.lovable.radii.md};
  background: ${({ theme, $featured }) =>
    $featured ? theme.lovable.colors.accent : theme.lovable.colors.surface};
  border: 1px solid
    ${({ theme, $featured }) =>
      $featured ? theme.lovable.colors.primary : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  strong {
    font-family: ${({ theme }) => theme.lovable.fonts.heading};
    font-size: 16px;
  }
  span {
    color: ${({ theme }) => theme.lovable.colors.muted};
    font-size: 13.5px;
  }
  b {
    color: ${({ theme }) => theme.lovable.colors.primary};
    font-size: 15px;
  }
`

export function OwnerCTA() {
  return (
    <Wrap>
      <Body>
        <h2>Это ваше заведение? Разместите его бесплатно</h2>
        <p>
          Мы помогаем баням, саунам и базам отдыха находить клиентов по всей
          России. Заявите права на карточку или добавьте новое заведение.
        </p>
        <Features>
          <li>
            <ShieldCheck size={18} /> Без рекламных манипуляций — только честные
            отзывы
          </li>
          <li>
            <Building2 size={18} /> Бесплатный тариф навсегда
          </li>
        </Features>
        <Buttons>
          <Primary href="/companies/create">
            Разместить заведение <ArrowRight size={16} />
          </Primary>
          <Secondary href="/about/">О тарифах</Secondary>
        </Buttons>
      </Body>
      <Plans>
        <Plan>
          <div>
            <strong>Бесплатный</strong>
            <br />
            <span>1 заведение, 3 фото</span>
          </div>
          <b>0 ₽</b>
        </Plan>
        <Plan $featured>
          <div>
            <strong>Старт</strong>
            <br />
            <span>До 30 фото, без лимитов</span>
          </div>
          <b>1 000 ₽/мес</b>
        </Plan>
      </Plans>
    </Wrap>
  )
}
