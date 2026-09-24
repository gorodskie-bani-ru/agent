import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'
import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import {
  AboutPageStyled,
  AboutPageBreadcrumbsStyled,
  AboutPageLinkStyled,
  AboutPageHeroStyled,
  AboutPageHeroCopyStyled,
  AboutPageEyebrowStyled,
  AboutPageTitleStyled,
  AboutPageLeadStyled,
  AboutPageActionsStyled,
  AboutPageButtonStyled,
  AboutPageSecondaryLinkStyled,
  AboutPageStoryStyled,
  AboutPageStoryYearStyled,
  AboutPageStoryTitleStyled,
  AboutPageTextStyled,
  AboutPageSectionStyled,
  AboutPageSectionTitleStyled,
  AboutPageCardsStyled,
  AboutPageCardStyled,
  AboutPageIconStyled,
  AboutPageCardTitleStyled,
  AboutPageCardButtonStyled,
  AboutPageOwnersStyled,
  AboutPageOwnersCopyStyled,
  AboutPageOwnersStepsStyled,
  AboutPageStepStyled,
  AboutPageStepNumberStyled,
  AboutPageStepCopyStyled,
  AboutPageStepTitleStyled,
  AboutPageMailLinkStyled,
  AboutPageContactStyled,
  AboutPageContactCopyStyled,
  AboutPageContactLinkStyled,
  AboutPageHintStyled,
} from './styles'

const ownerMessage =
  'Я представляю баню или сауну и хочу добавить её в каталог «Городские бани» или обновить информацию. Помоги подготовить обращение: уточни название, город, адрес, ссылку на сайт и что нужно добавить или изменить. Подготовь текст письма для info@gorodskie-bani.ru.'
const cards = [
  {
    title: 'Найти место для отдыха',
    text: 'Тихий вечер вдвоём, парная для компании или баня по соседству. Начните с пожеланий — ИИ поможет с поиском.',
    action: 'Подобрать баню',
    message:
      'Помоги подобрать баню для отдыха. Уточни город, компанию и мои пожелания.',
    Icon: Compass,
  },
  {
    title: 'Рассказать о своей бане',
    text: 'Представляете заведение? Расскажите о нём. Поможем разобраться, какие материалы нужны для размещения.',
    action: 'Начать знакомство',
    message: ownerMessage,
    Icon: MapPin,
  },
  {
    title: 'Сделать каталог точнее',
    text: 'Изменился адрес, появились новые фотографии или заметили неточность? Давайте приведём информацию в порядок.',
    action: 'Подготовить обращение',
    message:
      'Хочу сообщить о неточности в каталоге «Городские бани». Уточни ссылку на заведение и что нужно исправить. Помоги составить письмо для info@gorodskie-bani.ru.',
    Icon: MessageCircle,
  },
]

export const AboutPage: Page = ({ siteOrigin }) => {
  const openChat = useOpenChatWithMessage()
  return (
    <>
      <SeoHeaders
        title="О проекте «Городские бани» — отдых, каталог и ИИ"
        description="Помогаем находить бани с 2012 года. Подберите место с ИИ, предложите заведение для каталога или свяжитесь с нами по почте info@gorodskie-bani.ru."
        canonical="/about"
        siteOrigin={siteOrigin}
      />
      <AboutPageStyled>
        <AboutPageBreadcrumbsStyled aria-label="Хлебные крошки">
          <AboutPageLinkStyled href="/">Главная</AboutPageLinkStyled>
          <span aria-hidden="true">/</span>
          <span aria-current="page">О проекте</span>
        </AboutPageBreadcrumbsStyled>
        <AboutPageHeroStyled>
          <AboutPageHeroCopyStyled>
            <AboutPageEyebrowStyled>
              <Sparkles size={15} aria-hidden="true" /> О людях, банях и хорошем
              отдыхе
            </AboutPageEyebrowStyled>
            <AboutPageTitleStyled>
              Хорошая баня.
              <br />С неё всё начинается.
            </AboutPageTitleStyled>
            <AboutPageLeadStyled>
              Мы собираем места, ради которых стоит отложить дела. А ИИ помогает
              найти среди них то самое — под ваш город, компанию и настроение.
            </AboutPageLeadStyled>
            <AboutPageActionsStyled>
              <AboutPageButtonStyled
                type="button"
                value="Помоги найти баню для отдыха. Сначала уточни город и мои пожелания."
                onClick={openChat}
              >
                Найти свою баню <ArrowRight size={18} aria-hidden="true" />
              </AboutPageButtonStyled>
              <AboutPageSecondaryLinkStyled href="#for-owners">
                Владельцам заведений{' '}
                <ArrowUpRight size={17} aria-hidden="true" />
              </AboutPageSecondaryLinkStyled>
            </AboutPageActionsStyled>
          </AboutPageHeroCopyStyled>
          <AboutPageStoryStyled>
            <AboutPageEyebrowStyled>Наша история</AboutPageEyebrowStyled>
            <AboutPageStoryYearStyled>С 2012</AboutPageStoryYearStyled>
            <AboutPageStoryTitleStyled>
              собираем банную географию
            </AboutPageStoryTitleStyled>
            <AboutPageTextStyled>
              Общественные бани, небольшие сауны, загородные парные. Разные
              места с одной общей идеей — дать человеку время для себя.
            </AboutPageTextStyled>
            <AboutPageTextStyled>
              Сегодня к каталогу и карте добавился ИИ-помощник. Он ищет и по
              нашей базе, и в интернете.
            </AboutPageTextStyled>
          </AboutPageStoryStyled>
        </AboutPageHeroStyled>
        <AboutPageSectionStyled aria-labelledby="about-start-title">
          <AboutPageEyebrowStyled>С чего начнём?</AboutPageEyebrowStyled>
          <AboutPageSectionTitleStyled id="about-start-title">
            У каждого — свой повод заглянуть.
          </AboutPageSectionTitleStyled>
          <AboutPageCardsStyled>
            {cards.map(({ title, text, action, message, Icon }) => (
              <AboutPageCardStyled key={title}>
                <AboutPageIconStyled>
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </AboutPageIconStyled>
                <AboutPageCardTitleStyled>{title}</AboutPageCardTitleStyled>
                <AboutPageTextStyled>{text}</AboutPageTextStyled>
                <AboutPageCardButtonStyled
                  type="button"
                  value={message}
                  onClick={openChat}
                >
                  {action} <ArrowUpRight size={17} aria-hidden="true" />
                </AboutPageCardButtonStyled>
              </AboutPageCardStyled>
            ))}
          </AboutPageCardsStyled>
        </AboutPageSectionStyled>
        <AboutPageOwnersStyled
          id="for-owners"
          aria-labelledby="about-owners-title"
        >
          <AboutPageOwnersCopyStyled>
            <AboutPageEyebrowStyled>
              Для владельцев бань и саун
            </AboutPageEyebrowStyled>
            <AboutPageSectionTitleStyled id="about-owners-title">
              У вас есть место.
              <br />
              Давайте о нём расскажем.
            </AboutPageSectionTitleStyled>
            <AboutPageLeadStyled>
              Чтобы предложить заведение для каталога или обновить его страницу,
              начните с разговора. ИИ поможет подготовить информацию, а по почте
              можно обратиться к нам напрямую.
            </AboutPageLeadStyled>
            <AboutPageActionsStyled>
              <AboutPageButtonStyled
                type="button"
                value={ownerMessage}
                onClick={openChat}
              >
                Рассказать ИИ о заведении{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </AboutPageButtonStyled>
              <AboutPageMailLinkStyled href="mailto:info@gorodskie-bani.ru?subject=Заведение%20для%20каталога">
                Написать на почту <Mail size={17} aria-hidden="true" />
              </AboutPageMailLinkStyled>
            </AboutPageActionsStyled>
            <AboutPageHintStyled>
              Чат поможет собрать обращение. Материалы для размещения и
              изменений отправляйте на почту.
            </AboutPageHintStyled>
          </AboutPageOwnersCopyStyled>
          <AboutPageOwnersStepsStyled>
            {[
              [
                '01',
                'Представьтесь',
                'Название заведения, город, адрес и как с вами связаться.',
              ],
              [
                '02',
                'Поделитесь деталями',
                'Ссылка на сайт, описание и фотографии — всё, что поможет познакомиться с вашим местом.',
              ],
              [
                '03',
                'Расскажите о задаче',
                'Добавить заведение, обновить страницу или предложить сотрудничество.',
              ],
            ].map(([number, title, text]) => (
              <AboutPageStepStyled key={number}>
                <AboutPageStepNumberStyled>{number}</AboutPageStepNumberStyled>
                <AboutPageStepCopyStyled>
                  <AboutPageStepTitleStyled>{title}</AboutPageStepTitleStyled>
                  <AboutPageTextStyled>{text}</AboutPageTextStyled>
                </AboutPageStepCopyStyled>
              </AboutPageStepStyled>
            ))}
          </AboutPageOwnersStepsStyled>
        </AboutPageOwnersStyled>
        <AboutPageContactStyled aria-labelledby="about-contact-title">
          <AboutPageContactCopyStyled>
            <AboutPageEyebrowStyled>Открыты к разговору</AboutPageEyebrowStyled>
            <AboutPageSectionTitleStyled id="about-contact-title">
              Есть идея для проекта?
            </AboutPageSectionTitleStyled>
            <AboutPageTextStyled>
              Предложения, сотрудничество и обратная связь — пишите. Хорошие
              проекты растут из разговоров.
            </AboutPageTextStyled>
          </AboutPageContactCopyStyled>
          <AboutPageContactLinkStyled href="mailto:info@gorodskie-bani.ru">
            <Mail size={21} aria-hidden="true" />
            info@gorodskie-bani.ru
            <ArrowUpRight size={18} aria-hidden="true" />
          </AboutPageContactLinkStyled>
        </AboutPageContactStyled>
      </AboutPageStyled>
    </>
  )
}
