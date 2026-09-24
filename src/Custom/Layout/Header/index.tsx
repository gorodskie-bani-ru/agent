import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'
import { Brand } from '../Brand'
import { HeaderStyled } from './styles'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const router = useRouter()
  const openChat = useOpenChatWithMessage()

  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen((previous) => !previous), [])
  const handleChat = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(false)
      openChat(event)
    },
    [openChat],
  )
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (
      !event.currentTarget.contains(event.relatedTarget) &&
      event.relatedTarget !== toggle.current
    ) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    const close = () => setIsOpen(false)
    router.events.on('routeChangeStart', close)
    router.events.on('hashChangeStart', close)
    return () => {
      router.events.off('routeChangeStart', close)
      router.events.off('hashChangeStart', close)
    }
  }, [router.events])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggle.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    const media = window.matchMedia('(min-width: 801px)')
    const onResize = () => {
      if (media.matches) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      media.removeEventListener('change', onResize)
    }
  }, [isOpen])

  return (
    <HeaderStyled ref={header}>
      <div className="header-inner">
        <Brand />
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Основная навигация"
          data-open={isOpen}
          onBlur={handleBlur}
        >
          <Link
            href="/companies"
            aria-current={router.pathname === '/companies' ? 'page' : undefined}
            onClick={closeMenu}
          >
            Заведения
          </Link>
          <Link
            href="/city"
            aria-current={router.pathname === '/city' ? 'page' : undefined}
            onClick={closeMenu}
          >
            Города
          </Link>
          <Link href="/#how-it-works" onClick={closeMenu}>
            Как это работает
          </Link>
          <button
            type="button"
            className="ai-button"
            value="Помоги подобрать баню. Уточни мои пожелания и город."
            onClick={handleChat}
          >
            Спросить ИИ <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </HeaderStyled>
  )
}
