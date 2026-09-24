import { ArrowUpRight } from 'lucide-react'
import { Brand } from '../Brand'
import {
  FooterStyled,
  FooterMainStyled,
  FooterBrandBlockStyled,
  FooterDescriptionStyled,
  FooterNavigationStyled,
  FooterNavigationLinkStyled,
  FooterNoteStyled,
  FooterAuthorStyled,
  FooterAuthorCopyStyled,
  FooterAuthorEyebrowStyled,
  FooterAuthorTitleStyled,
  FooterAuthorDescriptionStyled,
  FooterAuthorActionsStyled,
  FooterSignatureStyled,
  FooterProjectLinkStyled,
  FooterBottomStyled,
  FooterCopyrightStyled,
  FooterMottoStyled,
} from './styles'

export const Footer: React.FC = () => (
  <FooterStyled>
    <FooterMainStyled>
      <FooterBrandBlockStyled>
        <Brand />
        <FooterDescriptionStyled>
          Каталог бань и ваш ИИ-помощник
        </FooterDescriptionStyled>
      </FooterBrandBlockStyled>
      <FooterNavigationStyled aria-label="Навигация в подвале">
        <FooterNavigationLinkStyled href="/companies">
          Заведения
        </FooterNavigationLinkStyled>
        <FooterNavigationLinkStyled href="/city">
          Города
        </FooterNavigationLinkStyled>
        <FooterNavigationLinkStyled href="/map">
          На карте <ArrowUpRight size={14} aria-hidden="true" />
        </FooterNavigationLinkStyled>
        <FooterNavigationLinkStyled href="/about">
          О проекте
        </FooterNavigationLinkStyled>
      </FooterNavigationStyled>
      <FooterNoteStyled>
        Хорошие бани.
        <br />
        Время для себя.
      </FooterNoteStyled>
    </FooterMainStyled>
    <FooterAuthorStyled aria-labelledby="footer-author-title">
      <FooterAuthorCopyStyled>
        <FooterAuthorEyebrowStyled>
          Личный проект · Дизайн, код и ИИ
        </FooterAuthorEyebrowStyled>
        <FooterAuthorTitleStyled id="footer-author-title">
          Хорошие идеи заслуживают своего сайта.
        </FooterAuthorTitleStyled>
        <FooterAuthorDescriptionStyled>
          Здесь воплотилась моя. Есть своя? Давайте обсудим.
        </FooterAuthorDescriptionStyled>
      </FooterAuthorCopyStyled>
      <FooterAuthorActionsStyled>
        <FooterSignatureStyled
          target="_blank"
          href="https://fi1osof.ru"
          rel="noopener noreferrer"
          aria-label="By 𝕱 — сайт автора, откроется в новой вкладке"
        >
          By 𝕱
        </FooterSignatureStyled>
        <FooterProjectLinkStyled
          target="_blank"
          href="https://fi1osof.ru"
          rel="noopener noreferrer"
        >
          Обсудить ваш проект <ArrowUpRight size={16} aria-hidden="true" />
        </FooterProjectLinkStyled>
      </FooterAuthorActionsStyled>
    </FooterAuthorStyled>
    <FooterBottomStyled>
      <FooterCopyrightStyled>
        Городские бани · С 2012 года
      </FooterCopyrightStyled>
      <FooterMottoStyled>
        Находите места, в которые хочется вернуться
      </FooterMottoStyled>
    </FooterBottomStyled>
  </FooterStyled>
)
