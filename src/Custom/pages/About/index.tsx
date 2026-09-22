import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'

import {
  AboutPageStyled,
  AboutSectionHeader,
  AboutSectionContent,
  AboutList,
  AboutCallToAction,
  AboutButton,
} from './styles'
import { Page } from 'src/components/pages/_App/interfaces'
import Link from 'next/link'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

export const AboutPage: Page = ({ siteOrigin }) => {
  const onClickOpenChat = useOpenChatWithMessage()

  return (
    <>
      <SeoHeaders
        title="О нас"
        description={''}
        canonical={'/about'}
        siteOrigin={siteOrigin}
      />

      <AboutPageStyled>
        <h1>О нас</h1>

        <AboutSectionContent>
          <p>
            Добро пожаловать на портал &ldquo;Городские бани&rdquo;! Наш проект
            был основан в 2012 году и является одним из старейших ресурсов,
            посвящённых банной культуре. Все эти годы мы были верны своей миссии
            — сохранять и популяризировать традиции русской бани.
          </p>
          <p>
            Сейчас мы вступили в новый этап развития — активно модернизируем
            портал и ежедневно добавляем новые функции! Мы уже запустили
            инновационный ИИ-чат, обновили интерактивную карту и активно
            расширяем список представленных заведений. Впереди ещё много планов
            и идей, которые мы постепенно воплощаем в жизнь.
          </p>
        </AboutSectionContent>

        <AboutSectionHeader>Что мы предлагаем?</AboutSectionHeader>
        <AboutSectionContent>
          <p>
            Наш портал объединяет информацию обо всех видах заведений для отдыха
            и оздоровления: от общественных бань до частных саун, от загородных
            домов до SPA-центров. Благодаря инновационным технологиям
            искусственного интеллекта, вы легко найдете именно то, что ищете.
          </p>
        </AboutSectionContent>

        <AboutSectionHeader>Почему стоит выбрать нас?</AboutSectionHeader>

        <AboutList>
          <li>
            <strong>Уникальный ИИ-помощник</strong> — общайтесь с нашим
            чат-ботом на человеческом языке и получайте персонализированные
            рекомендации мест отдыха
          </li>
          <li>
            <strong>Удобный поиск</strong> — находите заведения по любым
            критериям: от расположения до специфических услуг
          </li>
          <li>
            <strong>Без рекламных манипуляций</strong> — мы не продвигаем
            заведения за деньги, поэтому вы видите честные результаты поиска
          </li>
          <li>
            <strong>Бесплатное размещение</strong> — базовая информация о любом
            заведении публикуется бесплатно
          </li>
        </AboutList>

        <AboutSectionHeader>Для владельцев бизнеса</AboutSectionHeader>
        <AboutSectionContent>
          <p>
            <Link href="/companies/create" title="Размещение">
              Присоединяйтесь к нашему каталогу!
            </Link>{' '}
            Вы получите:
          </p>
        </AboutSectionContent>
        <AboutList>
          <li>Бесплатное базовое размещение информации о вашем заведении</li>
          <li>Интуитивно понятный интерфейс для управления профилем</li>
          <li>Помощь ИИ в составлении привлекательного описания</li>
          <li>Доступ к аналитике посещений вашей страницы</li>
        </AboutList>

        <AboutCallToAction>
          <AboutSectionHeader>
            Давайте сделаем проект лучше вместе!
          </AboutSectionHeader>
          <p>
            Мы постоянно совершенствуем наш сервис и будем рады вашим
            предложениям и отзывам. Общайтесь с нашим ИИ-чатом, делитесь идеями
            или просто рассказывайте, что вам нравится или не нравится на сайте.
            Мы читаем каждое сообщение и стремимся сделать ваш опыт
            использования портала максимально комфортным.
          </p>
          <AboutButton onClick={onClickOpenChat} type="button">
            Открыть ИИ-чат
          </AboutButton>
        </AboutCallToAction>
      </AboutPageStyled>
    </>
  )
}
