import React, { useCallback, useEffect, useState } from 'react'
import { CompanyFormSteps } from '../../interfaces'
import { CompanyFormToolbarTabsStyled, TabItemStyled } from './styles'
import { CompanyFormState } from '../useCompanyForm/interfaces'
import { useRouter } from 'next/router'

// type TabState = {
//   activeTab: CompanyFormSteps
// }

// type TabAction = {
//   type: 'SET_ACTIVE_TAB'
//   payload: CompanyFormSteps
// }

// function tabReducer(state: TabState, action: TabAction): TabState {
//   switch (action.type) {
//     case 'SET_ACTIVE_TAB':
//       return {
//         ...state,
//         activeTab: action.payload,
//       }
//     default:
//       return state
//   }
// }

type useCompanyFormToolbarProps = {
  step: CompanyFormSteps
  companyId: string | undefined
  formState: CompanyFormState
}

export function useCompanyFormToolbar({
  step,
  companyId,
  formState,
}: useCompanyFormToolbarProps) {
  const activeTab = step

  // const initialState = useMemo<TabState>(
  //   () => ({
  //     activeTab: step,
  //   }),
  //   [step]
  // )

  // const [state, dispatch] = useReducer(tabReducer, initialState)

  const [container, containerRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!container) {
      return
    }

    // Блокируем распространение события свайпа с тулбара на страницу
    const handleTouchMove = (e: TouchEvent) => {
      // Если есть горизонтальный скролл
      if (container.scrollWidth > container.clientWidth) {
        // Проверяем, движется ли палец горизонтально
        const touchDeltaX = Math.abs(
          e.touches[0].clientX - e.touches[0].screenX,
        )
        const touchDeltaY = Math.abs(
          e.touches[0].clientY - e.touches[0].screenY,
        )

        // Если горизонтальное движение преобладает - блокируем распространение
        if (touchDeltaX > touchDeltaY) {
          e.stopPropagation()
        }
      }
    }

    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [container])

  useEffect(() => {
    if (!container) {
      return
    }

    // Найдем активный таб среди дочерних элементов
    const activeTabElement = container.querySelector(
      `[data-value="${activeTab}"]`,
    )

    // Если активный таб найден и контейнер имеет горизонтальный скролл
    if (
      activeTabElement &&
      activeTabElement instanceof HTMLElement &&
      container.scrollWidth > container.clientWidth
    ) {
      // Получаем родительский элемент и его позиционные данные
      const parentElement = container.parentElement

      if (!parentElement) {
        return
      }

      const containerRect = container.getBoundingClientRect()

      // Рассчитываем реальный отступ между левым краем родителя и левым краем контейнера
      const containerLeftPadding = containerRect.left

      // Позиция активного таба относительно левого края контейнера
      const tabOffsetLeft = activeTabElement.offsetLeft

      // Прокручиваем контейнер так, чтобы активный таб был виден слева
      container.scrollTo({
        left: Math.max(0, tabOffsetLeft - containerLeftPadding),
        behavior: 'smooth',
      })
    }
  }, [activeTab, container])

  const router = useRouter()

  const onClickTab = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      const value = event.currentTarget.value

      let url: string

      if (!value || value === CompanyFormSteps.Intro) {
        url = '/companies/create'
      } else {
        url = `/companies/create/${value}`
      }

      router.push(url)
    },
    [router],
  )

  const toolbar = (
    <CompanyFormToolbarTabsStyled ref={containerRef}>
      {Object.entries(CompanyFormSteps).map(([_key, value]) => {
        let disabled = true

        switch (value) {
          case CompanyFormSteps.Intro:
          case CompanyFormSteps.ClientFill:
            disabled = false
            break

          case CompanyFormSteps.ClientEditGallery:
            {
              if (formState.dataSource) {
                disabled = false
              }
            }
            break

          case CompanyFormSteps.Preview:
            {
              if (formState.files.length > 0) {
                disabled = false
              }
            }
            break
        }

        return (
          <TabItemStyled
            key={value}
            $active={activeTab === value}
            $hidden={value === CompanyFormSteps.Review && !companyId}
            onClick={onClickTab}
            value={value}
            data-label={getTabLabel(value)}
            // href={
            //   value === CompanyFormSteps.Intro
            //     ? '/companies/create'
            //     : `/companies/create/${value}`
            // }
            type="button"
            disabled={disabled}
          >
            {getTabLabel(value)}
          </TabItemStyled>
        )
      })}
    </CompanyFormToolbarTabsStyled>
  )

  return {
    toolbar,
    // activeTab: state.activeTab,
    activeTab,
  }
}

function getTabLabel(tab: CompanyFormSteps): string {
  switch (tab) {
    case CompanyFormSteps.Intro:
      return 'Интро'
    case CompanyFormSteps.ClientFill:
      return 'Информация'
    case CompanyFormSteps.ClientEditGallery:
      return 'Галерея'
    case CompanyFormSteps.Preview:
      return 'Предпросмотр'
    case CompanyFormSteps.Review:
      return 'Модерация'
  }
}
