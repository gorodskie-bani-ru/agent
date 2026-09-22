import type { ComponentType, ReactNode } from 'react'
import Link from 'next/link'
import React from 'react'
import { FooterStyled, About, Bottom, Col, Inner, UlStyled } from './styles'

type LinkLikeProps = {
  to: string
  className?: string
  children?: ReactNode
}

export type FooterLink = {
  key?: string
  to: string
  label: ReactNode
}

export type FooterSection = {
  title: string
  links: ReadonlyArray<FooterLink>
}

const sections: FooterSection[] = [
  {
    title: 'Навигация',
    links: [
      // { to: '/', label: 'Каталог' },
      { to: '/map', label: 'Карта' },
      // { to: '/ratings', label: 'Рейтинги' },
      { to: '/bani-otzivy', label: 'Отзывы' },
    ],
  },
  {
    title: 'Владельцам',
    links: [
      { to: '/companies/create', label: 'Разместить заведение' },
      {
        key: 'tariffs',
        to: '/about',
        label: 'Тарифы',
      },
    ],
  },
  {
    title: 'Информация',
    links: [
      {
        key: 'about',
        to: '/about',
        label: 'О проекте',
      },
      {
        key: 'contacts',
        to: '/about',
        label: 'Контакты',
      },
    ],
  },
]

export type FooterProps = {
  /** Компонент-ссылка (по умолчанию — Link из @tanstack/react-router). */
  LinkComponent?: ComponentType<LinkLikeProps>
  /** Блок «О проекте» слева. */
  aboutTitle?: ReactNode
  aboutText?: ReactNode
  /** Колонки со ссылками. */
  sections?: ReadonlyArray<FooterSection>
  /** Нижняя строка (по умолчанию — копирайт). */
  bottomText?: ReactNode
}

export const Footer: React.FC<FooterProps> = ({
  aboutTitle = 'Городские бани',
  aboutText = 'Каталог общественных бань и саун с 2012 года. Помогаем находить места для отдыха и парения по всей России.',
  bottomText = `© 2012–${new Date().getFullYear()} Городские бани`,
}) => {
  return (
    <FooterStyled>
      <Inner>
        <About>
          <strong>{aboutTitle}</strong>
          <p>{aboutText}</p>
        </About>
        {sections.map((section) => (
          <Col key={section.title}>
            <h4>{section.title}</h4>
            <UlStyled>
              {section.links.map((link) => (
                <li key={link.key || link.to}>
                  <Link href={link.to}>{link.label}</Link>
                </li>
              ))}
            </UlStyled>
          </Col>
        ))}
      </Inner>
      <Bottom>
        {bottomText} {' · '}
        <Link href="https://fi1osof.ru" target="_blank">
          Техническая архитектура и разработка By 𝕱
        </Link>
      </Bottom>
    </FooterStyled>
  )
}
