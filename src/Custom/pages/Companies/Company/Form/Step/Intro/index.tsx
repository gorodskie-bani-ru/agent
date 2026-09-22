import React, { useCallback } from 'react'
import {
  CompanyFormStepIntroStyled,
  IntroHeaderStyled,
  IntroSubHeaderStyled,
  IntroParagraphStyled,
  IntroStepContainerStyled,
  IntroStepNumberStyled,
  IntroStepContentStyled,
  IntroStepTitleStyled,
  IntroStepDescriptionStyled,
  IntroTariffGridStyled,
  IntroTariffCardStyled,
  IntroTariffTitleStyled,
  IntroTariffPriceStyled,
  IntroTariffFeatureListStyled,
  IntroTariffFeatureItemStyled,
} from './styles'
import { CompanyFormContinueLinkButtonStyled } from '../../styles'
import { CompanyFormSteps } from '../../interfaces'
import { CompanyFormStepProps } from '../interfaces'
import { useRouter } from 'next/router'

export const CompanyFormStepIntro: React.FC<CompanyFormStepProps> = ({
  onClickOpenLoginForm,
  currentUser,
  formState: _formState,
}) => {
  const router = useRouter()

  const onClickNextStep = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!currentUser) {
        onClickOpenLoginForm(event)

        return
      }

      const value = event.currentTarget.value

      if (!value) {
        console.error('Can not get routing value')
        return
      }

      router.push(value)
    },
    [currentUser, onClickOpenLoginForm, router],
  )

  return (
    <CompanyFormStepIntroStyled>
      <div>
        <IntroHeaderStyled>
          Добро пожаловать на портал Городские Бани
        </IntroHeaderStyled>
        <IntroParagraphStyled>
          Мы рады, что вы решили разместить информацию о своем заведении на
          нашем портале. Здесь вы можете представить информацию о своей бане,
          сауне, базе отдыха или загородном доме.
        </IntroParagraphStyled>

        <IntroParagraphStyled>
          Мы предлагаем как бесплатное, так и платное размещение. На бесплатном
          тарифе вы можете разместить одно заведение с одной фотографией,
          добавить до 2000 символов текста и редактировать информацию раз в
          месяц. Если вам нужно больше возможностей (больше фотографий, больше
          текста или неограниченное редактирование), вы можете выбрать тариф
          «Старт». Оплата не требуется, пока вы не выберете тариф.
        </IntroParagraphStyled>
      </div>

      <div>
        <IntroSubHeaderStyled>
          Порядок размещения информации
        </IntroSubHeaderStyled>

        <IntroStepContainerStyled>
          <IntroStepNumberStyled>1</IntroStepNumberStyled>
          <IntroStepContentStyled>
            <IntroStepTitleStyled>Заполнение информации</IntroStepTitleStyled>
            <IntroStepDescriptionStyled>
              Во вкладке «Информация» укажите все необходимые данные о вашем
              заведении: название, описание, перечень услуг, цены, контакты,
              режим работы и другие важные детали.
            </IntroStepDescriptionStyled>
          </IntroStepContentStyled>
        </IntroStepContainerStyled>

        <IntroStepContainerStyled>
          <IntroStepNumberStyled>2</IntroStepNumberStyled>
          <IntroStepContentStyled>
            <IntroStepTitleStyled>Добавление фотографий</IntroStepTitleStyled>
            <IntroStepDescriptionStyled>
              Во вкладке «Галерея» вы можете загрузить фотографии вашего
              заведения. Количество доступных фотографий зависит от выбранного
              тарифного плана.
            </IntroStepDescriptionStyled>
          </IntroStepContentStyled>
        </IntroStepContainerStyled>

        <IntroStepContainerStyled>
          <IntroStepNumberStyled>3</IntroStepNumberStyled>
          <IntroStepContentStyled>
            <IntroStepTitleStyled>
              Предварительный просмотр
            </IntroStepTitleStyled>
            <IntroStepDescriptionStyled>
              Во вкладке «Предпросмотр» вы увидите, как информация о вашем
              заведении будет отображаться на сайте. Здесь же вы можете оставить
              дополнительные пожелания по оформлению или любые другие
              комментарии для наших модераторов.
            </IntroStepDescriptionStyled>
          </IntroStepContentStyled>
        </IntroStepContainerStyled>

        <IntroStepContainerStyled>
          <IntroStepNumberStyled>4</IntroStepNumberStyled>
          <IntroStepContentStyled>
            <IntroStepTitleStyled>Отправка на модерацию</IntroStepTitleStyled>
            <IntroStepDescriptionStyled>
              Когда вы будете удовлетворены результатом, отправьте информацию на
              модерацию. Наши специалисты проверят введённые данные и подготовят
              их к публикации на сайте.
            </IntroStepDescriptionStyled>
          </IntroStepContentStyled>
        </IntroStepContainerStyled>

        <IntroStepContainerStyled>
          <IntroStepNumberStyled>5</IntroStepNumberStyled>
          <IntroStepContentStyled>
            <IntroStepTitleStyled>Публикация</IntroStepTitleStyled>
            <IntroStepDescriptionStyled>
              После успешной проверки информация о вашем заведении будет
              опубликована на сайте и станет доступна для посетителей портала.
              При необходимости мы внесем корректировки в оформление для лучшей
              презентации.
            </IntroStepDescriptionStyled>
          </IntroStepContentStyled>
        </IntroStepContainerStyled>
      </div>

      <div>
        <IntroSubHeaderStyled>Тарифные планы</IntroSubHeaderStyled>
        <IntroParagraphStyled>
          Мы предлагаем различные варианты размещения, соответствующие
          потребностям вашего бизнеса — от небольших заведений до крупных сетей.
        </IntroParagraphStyled>

        <IntroTariffGridStyled>
          <IntroTariffCardStyled>
            <IntroTariffTitleStyled>Бесплатный</IntroTariffTitleStyled>
            <IntroTariffPriceStyled>0 ₽</IntroTariffPriceStyled>
            <IntroTariffFeatureListStyled>
              <IntroTariffFeatureItemStyled>
                1 заведение
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                3 фото
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                До 2 000 символов текста
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                Редактирование: 1 раз в месяц
              </IntroTariffFeatureItemStyled>
            </IntroTariffFeatureListStyled>
          </IntroTariffCardStyled>

          <IntroTariffCardStyled>
            <IntroTariffTitleStyled>Старт</IntroTariffTitleStyled>
            <IntroTariffPriceStyled>
              1000 ₽/мес за заведение
            </IntroTariffPriceStyled>
            <IntroTariffFeatureListStyled>
              <IntroTariffFeatureItemStyled>
                Любое количество заведений
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                До 30 фото на каждое заведение
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                До 10 000 символов текста
              </IntroTariffFeatureItemStyled>
              <IntroTariffFeatureItemStyled>
                Неограниченное редактирование
              </IntroTariffFeatureItemStyled>
            </IntroTariffFeatureListStyled>
            <IntroParagraphStyled>
              Тариф «Старт» позволяет разместить любое количество заведений,
              стоимость рассчитывается для каждого заведения отдельно. Для
              уточнения дополнительных условий, пожалуйста, свяжитесь с нашим
              менеджером.
            </IntroParagraphStyled>
          </IntroTariffCardStyled>
        </IntroTariffGridStyled>
      </div>

      <div>
        <IntroParagraphStyled>
          Для начала работы перейдите во вкладку «Информация» и заполните данные
          о вашем заведении. Если у вас возникнут вопросы в процессе заполнения,
          вы всегда можете вернуться на эту страницу или связаться с нашей
          службой поддержки.
        </IntroParagraphStyled>
        <IntroParagraphStyled>
          По любым вопросам вы также можете написать нам в чат. Мы с радостью
          поможем и ответим на все ваши вопросы.
        </IntroParagraphStyled>
        <IntroParagraphStyled>
          Спасибо, что выбрали наш портал!
        </IntroParagraphStyled>
      </div>

      <CompanyFormContinueLinkButtonStyled
        value={`/companies/create/${CompanyFormSteps.ClientFill}`}
        onClick={onClickNextStep}
      >
        {currentUser
          ? 'Начать заполнение'
          : 'Авторизуйтесь и начните заполнять'}
      </CompanyFormContinueLinkButtonStyled>
    </CompanyFormStepIntroStyled>
  )
}
