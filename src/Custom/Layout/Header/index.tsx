import styled, { css } from 'styled-components'
import {
  Flame,
  Menu,
  X,
  MapPin,
  // MessageSquare,
  // Star,
  Info,
  // Building2,
  MapPinned,
  Building,
  type LucideIcon,
} from 'lucide-react'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { useAppContext } from 'src/components/AppContext'

type LinkLikeProps = {
  to: string
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export type HeaderNavItem = {
  href: string
  label: string
  icon?: LucideIcon
}

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => {
    return theme.lovable.colors.bg
  }}cc;
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.lovable.colors.border};
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.lovable.container};
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0px;
  text-decoration: none;
  color: ${({ theme }) => theme.lovable.colors.text};
  font-family: ${({ theme }) => theme.lovable.fonts.heading};
  font-weight: 800;
  font-size: 18px;
  &:hover {
    text-decoration: none;
  }
`

const Logo = styled.span`
  width: 36px;
  height: 36px;
  /* border-radius: ${({ theme }) => theme.lovable.radii.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.lovable.colors.primary},
    ${({ theme }) => theme.lovable.colors.primaryGlow}
  );
  color: white; */
  display: grid;
  place-items: center;
  /* box-shadow: ${({ theme }) => theme.lovable.shadows.glow}; */

  img {
    width: 26px;
    height: 26px;
  }
`

const Nav = styled.nav`
  display: none;
  gap: 24px;
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    display: flex;
  }
  a {
    color: ${({ theme }) => theme.lovable.colors.textSoft};
    font-weight: 500;
    font-size: 15px;
    &:hover {
      color: ${({ theme }) => theme.lovable.colors.primary};
      text-decoration: none;
    }
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CTA = styled(Link)`
  display: none;
  background: ${({ theme }) => theme.lovable.colors.primary};
  color: white;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  font-weight: 600;
  font-size: 14px;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.primaryDark};
    text-decoration: none;
    color: white;
  }
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    display: inline-flex;
  }
`

const Burger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.lovable.radii.md};
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  background: ${({ theme }) => theme.lovable.colors.surface};
  color: ${({ theme }) => theme.lovable.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.accent};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.lovable.colors.primary};
    outline-offset: 2px;
  }
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    display: none;
  }
`

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 60;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    display: none;
  }
`

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 340px);
  background: ${({ theme }) => theme.lovable.colors.bg};
  z-index: 70;
  box-shadow: -10px 0 40px rgba(15, 23, 42, 0.18);
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0.24, 1);
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.lovable.bp.md}) {
    display: none;
  }
`

const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.lovable.colors.border};
`

const DrawerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.lovable.fonts.heading};
  font-weight: 800;
  font-size: 16px;
  color: ${({ theme }) => theme.lovable.colors.text};
`

const linkBase = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  color: ${({ theme }) => theme.lovable.colors.text};
  font-weight: 500;
  font-size: 16px;
  border-radius: ${({ theme }) => theme.lovable.radii.md};
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.accent};
    color: ${({ theme }) => theme.lovable.colors.primary};
    text-decoration: none;
  }
  svg {
    color: ${({ theme }) => theme.lovable.colors.primary};
    flex-shrink: 0;
  }
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  flex: 1;
  overflow-y: auto;

  a {
    ${linkBase}
  }
`

const DrawerFoot = styled.div`
  padding: 16px 18px 22px;
  border-top: 1px solid ${({ theme }) => theme.lovable.colors.border};
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DrawerCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.lovable.colors.primary};
  color: white;
  padding: 13px 16px;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  font-weight: 600;
  font-size: 15px;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.primaryDark};
    text-decoration: none;
  }
`

const Hint = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.lovable.colors.muted};
  text-align: center;
  margin: 0;
`

const IconBtn = styled.button`
  background: transparent;
  border: 0;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.lovable.radii.md};
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.lovable.colors.textSoft};
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.surface};
    color: ${({ theme }) => theme.lovable.colors.text};
  }
`

export type HeaderProps = {
  /** Компонент-ссылка (по умолчанию — Link из @tanstack/react-router). */
  Link?: ComponentType<LinkLikeProps>
  /** Элементы навигации. */
  // navItems?: ReadonlyArray<HeaderNavItem>
  /** Подпись бренда. */
  brandLabel?: ReactNode
  /** Адрес бренд-ссылки. */
  brandTo?: string
  /** Подпись CTA-кнопки. */
  ctaLabel?: ReactNode
  /** Адрес CTA. */
  ctaTo?: string
  /** Заголовок мобильного меню. */
  mobileMenuTitle?: ReactNode
  /** Подсказка под CTA в мобильном меню. */
  mobileCtaHint?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  brandLabel = 'Городские бани',
  brandTo = '/',
  ctaLabel = 'Разместить заведение',
  ctaTo = '/companies/create',
  mobileMenuTitle = 'Меню',
  mobileCtaHint = 'Бесплатное размещение и продвижение',
}) => {
  const { user } = useAppContext()

  const navItems = useMemo(() => {
    const navItems: HeaderNavItem[] = [
      // { href: '/', label: 'Каталог', icon: Building2 },
      { href: '/map', label: 'Карта', icon: MapPin },
      // { href: '/bani-otzivy', label: 'Отзывы', icon: MessageSquare },
      // { href: '/ratings', label: 'Рейтинги', icon: Star },
      { href: '/city', label: 'Города', icon: MapPinned },
      { href: '/about', label: 'О нас', icon: Info },
    ]

    if (user?.sudo === true) {
      navItems.push({
        href: '/companies',
        label: 'Компании',
        icon: Building,
      })
    }

    return navItems
  }, [user?.sudo])

  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <Bar>
        <Inner>
          <Brand as={Link} href={brandTo}>
            <Logo>
              <img src="/favicon-120.png" />
            </Logo>
            {brandLabel}
          </Brand>
          <Nav>
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </Nav>
          <Right>
            <CTA as={Link} href={ctaTo}>
              {ctaLabel}
            </CTA>
            <Burger
              type="button"
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={toggleOpen}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </Burger>
          </Right>
        </Inner>
      </Bar>

      <Backdrop $open={open} onClick={closeMenu} aria-hidden="true" />

      <Drawer
        id="mobile-nav"
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Главное меню"
      >
        <DrawerHead>
          <DrawerTitle>
            <Logo>
              <Flame size={18} />
            </Logo>
            {mobileMenuTitle}
          </DrawerTitle>
          <IconBtn type="button" aria-label="Закрыть меню" onClick={closeMenu}>
            <X size={20} />
          </IconBtn>
        </DrawerHead>

        <NavList>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={closeMenu}>
              {Icon ? <Icon size={18} /> : null}
              {label}
            </Link>
          ))}
        </NavList>

        <DrawerFoot>
          <DrawerCTA as={Link} href={ctaTo} onClick={closeMenu}>
            {ctaLabel}
          </DrawerCTA>
          <Hint>{mobileCtaHint}</Hint>
        </DrawerFoot>
      </Drawer>
    </>
  )
}
