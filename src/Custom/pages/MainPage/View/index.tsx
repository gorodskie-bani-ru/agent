import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react'
import { Company } from 'src/Custom/interfaces'
import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'
import {
  MainPageViewStyled,
  MainPageViewHeroStyled,
  MainPageViewHeroCopyStyled,
  MainPageViewEyebrowStyled,
  MainPageViewHeroTitleStyled,
  MainPageViewHeroEmphasisStyled,
  MainPageViewHeroDescriptionStyled,
  MainPageViewPromptFormStyled,
  MainPageViewPromptLabelStyled,
  MainPageViewPromptInputStyled,
  MainPageViewSubmitButtonStyled,
  MainPageViewSuggestionsStyled,
  MainPageViewSuggestionButtonStyled,
  MainPageViewHeroHintStyled,
  MainPageViewHeroVisualStyled,
  MainPageViewHeroImageStyled,
  MainPageViewSourceBadgeStyled,
  MainPageViewSourceContentStyled,
  MainPageViewSourceTitleStyled,
  MainPageViewSourceDescriptionStyled,
  MainPageViewPhotoCaptionStyled,
  MainPageViewSectionStyled,
  MainPageViewSectionHeadingStyled,
  MainPageViewSectionHeadingCopyStyled,
  MainPageViewSectionKickerStyled,
  MainPageViewSectionTitleStyled,
  MainPageViewTextLinkStyled,
  MainPageViewCompanyGridStyled,
  MainPageViewEmptyStateStyled,
  MainPageViewEmptyStateButtonStyled,
  MainPageViewAiSectionStyled,
  MainPageViewAiInnerStyled,
  MainPageViewAiCopyStyled,
  MainPageViewAiDescriptionStyled,
  MainPageViewLightButtonStyled,
  MainPageViewConversationStyled,
  MainPageViewConversationLabelStyled,
  MainPageViewUserMessageStyled,
  MainPageViewAssistantMessageStyled,
  MainPageViewAssistantIconStyled,
  MainPageViewAssistantTextStyled,
  MainPageViewConversationReplyStyled,
  MainPageViewReplyIconStyled,
  MainPageViewConversationStepsStyled,
  MainPageViewConversationStepStyled,
  MainPageViewCitiesSectionStyled,
  MainPageViewCitiesCopyStyled,
  MainPageViewCitiesDescriptionStyled,
  MainPageViewCityActionsStyled,
  MainPageViewCityLinkStyled,
  MainPageViewTextButtonStyled,
} from './styles'
import { CompanyCard } from './CompanyCard'

type ViewProps = {
  companies: Company[]
  loading?: boolean
  error?: boolean
}

const suggestions = [
  {
    label: 'Баня рядом со мной',
    message: 'Помоги найти баню рядом со мной. Уточни мой город и район.',
  },
  {
    label: 'Куда пойти с друзьями',
    message:
      'Подбери баню для отдыха с друзьями. Уточни город, число гостей и пожелания.',
  },
  {
    label: 'Найти необычное место',
    message:
      'Хочу найти необычную баню. Посмотри варианты в каталоге и интернете, сначала уточни регион.',
  },
]

export const MainPageView: React.FC<ViewProps> = ({
  companies,
  loading,
  error,
}) => {
  const openChat = useOpenChatWithMessage()

  return (
    <MainPageViewStyled>
      <MainPageViewHeroStyled aria-labelledby="hero-title">
        <MainPageViewHeroCopyStyled>
          <MainPageViewEyebrowStyled>
            <Sparkles size={15} aria-hidden="true" /> Ваш ИИ-проводник по баням
          </MainPageViewEyebrowStyled>
          <MainPageViewHeroTitleStyled id="hero-title">
            Хорошая баня начинается с ваших{' '}
            <MainPageViewHeroEmphasisStyled>
              пожеланий
            </MainPageViewHeroEmphasisStyled>
          </MainPageViewHeroTitleStyled>
          <MainPageViewHeroDescriptionStyled>
            Расскажите, как хотите отдохнуть. ИИ подберёт места из нашего
            каталога и найдёт информацию в интернете.
          </MainPageViewHeroDescriptionStyled>
          <MainPageViewPromptFormStyled onSubmit={openChat}>
            <Search size={22} aria-hidden="true" />
            <MainPageViewPromptLabelStyled htmlFor="bath-wishes">
              Какую баню вы ищете?
            </MainPageViewPromptLabelStyled>
            <MainPageViewPromptInputStyled
              id="bath-wishes"
              name="Пожелания"
              placeholder="Хочу тихую баню за городом на двоих…"
              required
              pattern=".*\S.*"
              maxLength={2000}
              autoComplete="off"
            />
            <MainPageViewSubmitButtonStyled
              type="submit"
              value="Помоги подобрать баню по моим пожеланиям"
            >
              Подобрать с ИИ <ArrowRight size={18} aria-hidden="true" />
            </MainPageViewSubmitButtonStyled>
          </MainPageViewPromptFormStyled>
          <MainPageViewSuggestionsStyled aria-label="Примеры запросов">
            {suggestions.map(({ label, message }) => (
              <MainPageViewSuggestionButtonStyled
                key={label}
                type="button"
                value={message}
                onClick={openChat}
              >
                {label} <ArrowUpRight size={13} aria-hidden="true" />
              </MainPageViewSuggestionButtonStyled>
            ))}
          </MainPageViewSuggestionsStyled>
          <MainPageViewHeroHintStyled>
            Начните с пожелания — остальное уточним в диалоге
          </MainPageViewHeroHintStyled>
        </MainPageViewHeroCopyStyled>
        <MainPageViewHeroVisualStyled>
          <MainPageViewHeroImageStyled
            src="/media/home/bathhouse-hero.webp"
            alt="Тёплая деревянная парная с видом на лесное озеро"
            width={1440}
            height={960}
            fetchPriority="high"
          />
          <MainPageViewSourceBadgeStyled>
            <Globe2 size={25} strokeWidth={1.4} aria-hidden="true" />
            <MainPageViewSourceContentStyled>
              <MainPageViewSourceTitleStyled>
                Каталог + интернет
              </MainPageViewSourceTitleStyled>
              <MainPageViewSourceDescriptionStyled>
                В одном диалоге с ИИ
              </MainPageViewSourceDescriptionStyled>
            </MainPageViewSourceContentStyled>
          </MainPageViewSourceBadgeStyled>
          <MainPageViewPhotoCaptionStyled>
            Меньше поисков. Больше отдыха.
          </MainPageViewPhotoCaptionStyled>
        </MainPageViewHeroVisualStyled>
      </MainPageViewHeroStyled>

      <MainPageViewSectionStyled aria-labelledby="places-title">
        <MainPageViewSectionHeadingStyled>
          <MainPageViewSectionHeadingCopyStyled>
            <MainPageViewSectionKickerStyled>
              Знакомство с каталогом
            </MainPageViewSectionKickerStyled>
            <MainPageViewSectionTitleStyled id="places-title">
              Места, с которых можно начать
            </MainPageViewSectionTitleStyled>
          </MainPageViewSectionHeadingCopyStyled>
          <MainPageViewTextLinkStyled href="/companies">
            Все заведения <ArrowUpRight size={18} aria-hidden="true" />
          </MainPageViewTextLinkStyled>
        </MainPageViewSectionHeadingStyled>
        {companies.length > 0 ? (
          <MainPageViewCompanyGridStyled>
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </MainPageViewCompanyGridStyled>
        ) : (
          <MainPageViewEmptyStateStyled role="status">
            {loading
              ? 'Загружаем заведения…'
              : error
                ? 'Не удалось загрузить заведения. Вы можете продолжить поиск с ИИ.'
                : 'Начните с вашего города — поможем найти подходящую баню.'}
            <MainPageViewEmptyStateButtonStyled
              type="button"
              value="Помоги найти баню. Уточни город и мои пожелания."
              onClick={openChat}
            >
              Подобрать с ИИ <ArrowRight size={16} aria-hidden="true" />
            </MainPageViewEmptyStateButtonStyled>
          </MainPageViewEmptyStateStyled>
        )}
      </MainPageViewSectionStyled>

      <MainPageViewAiSectionStyled id="how-it-works" aria-labelledby="ai-title">
        <MainPageViewAiInnerStyled>
          <MainPageViewAiCopyStyled>
            <MainPageViewSectionKickerStyled>
              <Sparkles size={15} aria-hidden="true" /> Больше, чем каталог
            </MainPageViewSectionKickerStyled>
            <MainPageViewSectionTitleStyled id="ai-title">
              Не нашли своё?
              <br />
              Давайте поищем вместе.
            </MainPageViewSectionTitleStyled>
            <MainPageViewAiDescriptionStyled>
              ИИ не ограничивается каталогом: ищет в интернете и помогает
              разобраться в вариантах. Просто расскажите, что для вас важно.
            </MainPageViewAiDescriptionStyled>
            <MainPageViewLightButtonStyled
              type="button"
              value="Хочу найти баню под мои пожелания. Помоги сравнить варианты из каталога и интернета и укажи источники."
              onClick={openChat}
            >
              Начать разговор <ArrowUpRight size={18} aria-hidden="true" />
            </MainPageViewLightButtonStyled>
          </MainPageViewAiCopyStyled>
          <MainPageViewConversationStyled>
            <MainPageViewConversationLabelStyled>
              Так может начаться ваш поиск
            </MainPageViewConversationLabelStyled>
            <MainPageViewUserMessageStyled>
              Хочу баню у воды, подальше от суеты
            </MainPageViewUserMessageStyled>
            <MainPageViewAssistantMessageStyled>
              <MainPageViewAssistantIconStyled>
                <Sparkles size={18} aria-hidden="true" />
              </MainPageViewAssistantIconStyled>
              <MainPageViewAssistantTextStyled>
                В каком городе или районе будем искать? И как далеко вы готовы
                поехать?
              </MainPageViewAssistantTextStyled>
            </MainPageViewAssistantMessageStyled>
            <MainPageViewConversationReplyStyled
              type="button"
              value="Хочу баню у воды, подальше от суеты. Помоги с подбором, сначала уточни город и расстояние."
              onClick={openChat}
            >
              Продолжить с моими пожеланиями{' '}
              <MainPageViewReplyIconStyled>
                <ArrowRight size={19} aria-hidden="true" />
              </MainPageViewReplyIconStyled>
            </MainPageViewConversationReplyStyled>
            <MainPageViewConversationStepsStyled>
              <MainPageViewConversationStepStyled>
                01 · Уточняем
              </MainPageViewConversationStepStyled>
              <MainPageViewConversationStepStyled>
                02 · Ищем
              </MainPageViewConversationStepStyled>
              <MainPageViewConversationStepStyled>
                03 · Выбираем
              </MainPageViewConversationStepStyled>
            </MainPageViewConversationStepsStyled>
          </MainPageViewConversationStyled>
        </MainPageViewAiInnerStyled>
      </MainPageViewAiSectionStyled>

      <MainPageViewCitiesSectionStyled aria-labelledby="cities-title">
        <MainPageViewCitiesCopyStyled>
          <MainPageViewSectionKickerStyled>
            <MapPin size={14} aria-hidden="true" /> Ближе к вам
          </MainPageViewSectionKickerStyled>
          <MainPageViewSectionTitleStyled id="cities-title">
            В каком городе ищем?
          </MainPageViewSectionTitleStyled>
          <MainPageViewCitiesDescriptionStyled>
            Выберите город в каталоге или расскажите о нём ИИ.
          </MainPageViewCitiesDescriptionStyled>
        </MainPageViewCitiesCopyStyled>
        <MainPageViewCityActionsStyled>
          <MainPageViewCityLinkStyled href="/city">
            Выбрать город <ArrowRight size={18} aria-hidden="true" />
          </MainPageViewCityLinkStyled>
          <MainPageViewTextButtonStyled
            type="button"
            value="Хочу найти баню в своём городе. Спроси, где будем искать."
            onClick={openChat}
          >
            Назвать город ИИ <ArrowUpRight size={17} aria-hidden="true" />
          </MainPageViewTextButtonStyled>
        </MainPageViewCityActionsStyled>
      </MainPageViewCitiesSectionStyled>
    </MainPageViewStyled>
  )
}
