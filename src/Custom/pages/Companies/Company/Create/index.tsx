import { CompanyCreatePageStyled } from './styles'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { useAppContext } from 'src/components/AppContext'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { CompanyForm } from '../Form'
import { CompanyFormSteps } from '../Form/interfaces'

type CompanyCreatePageProps = PageProps & {
  step: CompanyFormSteps | undefined
}

export const CompanyCreatePage: Page<CompanyCreatePageProps> = ({
  step,
  siteOrigin,
}) => {
  step = step || CompanyFormSteps.Intro

  const searchable = step === CompanyFormSteps.Intro

  let title: string
  let description: string

  const { user: currentUser } = useAppContext()

  const router = useRouter()

  useEffect(() => {
    if (currentUser === null && step !== CompanyFormSteps.Intro) {
      router.push(`/companies/create`)
    }
  }, [currentUser, router, step])

  switch (step) {
    case CompanyFormSteps.Intro:
      title = 'Добавление заведения | Городские бани'
      description =
        'Разместите информацию о вашем заведении на нашем сайте. Пошаговая инструкция по добавлению вашей бани, сауны или спа-центра.'
      break

    case CompanyFormSteps.ClientFill:
      title = 'Заполнение информации | Городские бани'
      description =
        'Укажите все необходимые данные о вашем заведении: название, описание, перечень услуг, цены, контакты, режим работы и другие важные детали.'
      break

    case CompanyFormSteps.ClientEditGallery:
      title = 'Добавление фотографий | Городские бани'
      description =
        'Загрузите фотографии вашего заведения. Количество доступных фотографий зависит от выбранного тарифного плана.'
      break

    case CompanyFormSteps.Preview:
      title = 'Предварительный просмотр | Городские бани'
      description =
        'Просмотрите, как информация о вашем заведении будет отображаться на сайте, и отправьте её на модерацию.'
      break

    case CompanyFormSteps.Review:
      title = 'Компания на модерации | Городские бани'
      description =
        'Как только компания пройдет моредацию, она будет опубликована на сайте.'
      break
  }

  return (
    <>
      <SeoHeaders
        title={title}
        description={description}
        noindex={!searchable}
        nofollow={!searchable}
        canonical={'/companies/create'}
        siteOrigin={siteOrigin}
      />
      <CompanyCreatePageStyled>
        <CompanyForm step={step} />
      </CompanyCreatePageStyled>
    </>
  )
}

CompanyCreatePage.getInitialProps = async ({ query }) => {
  let step: CompanyCreatePageProps['step'] = undefined

  const queryStep = typeof query.step === 'string' ? query.step : undefined

  if (queryStep) {
    // Проверяем, что queryStep содержится в перечислении CompanyFormSteps

    const steps: string[] = Object.values(CompanyFormSteps)

    // Типизированная проверка без использования as
    if (steps.includes(queryStep)) {
      step = queryStep as CompanyFormSteps
    } else {
      return {
        step: undefined,
        statusCode: 404,
      }
    }
  }

  return {
    step,
  }
}
