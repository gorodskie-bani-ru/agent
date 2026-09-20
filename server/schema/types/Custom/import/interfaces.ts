export const TemplateVarIDs = {
  coords: 27,
  image: 3,
  gallery: 23,
  site: 13,
  address: 14,
  addressComments: 15,
  phones: 16,
  prices: 20,
  // pricesComments: 21,
  workTime: 19,
  metro: 22,
} as const

export interface GalleryImage {
  // root type
  description: string // String!
  image: string // String!
  title: string // String!
}

export const Templates = [
  {
    id: 1,
    templatename: 'Основной',
    description: 'Template',
  },
  {
    id: 8,
    templatename: 'Файл',
    description: '',
  },
  {
    id: 9,
    templatename: 'DownloadCenter',
    description: 'Шаблон для вывода файлов для загрузки',
  },
  {
    id: 11,
    templatename: 'Клиент',
    description: 'Шаблон для вывода страниц MODX с сайдбаром',
  },
  {
    id: 12,
    templatename: 'Работа',
    description: 'Шаблон для вывода страниц MODX с сайдбаром',
  },
  {
    id: 13,
    templatename: 'Главная страница',
    description: '',
  },
  {
    id: 14,
    templatename: 'Блог',
    description: 'Template',
  },
  {
    id: 15,
    templatename: 'Топик',
    description: 'Template',
  },
  {
    id: 16,
    templatename: 'Блог (персональный)',
    description: 'Template',
  },
  {
    id: 18,
    templatename: 'Manual',
    description: 'Template',
  },
  {
    id: 19,
    templatename: 'Профиль',
    description: 'Template',
  },
  {
    id: 20,
    templatename: 'Активность',
    description: 'Template',
  },
  {
    id: 22,
    templatename: 'Комментарий',
    description: 'Template',
  },
  {
    id: 24,
    templatename: 'Тег',
    description: 'Template',
  },
  {
    id: 26,
    templatename: 'Город',
    description: 'Template',
  },
  {
    id: 27,
    templatename: 'Заведение',
    description: 'Template',
  },
  {
    id: 28,
    templatename: 'Обзор заведения',
    description: 'Template',
  },
  {
    id: 29,
    templatename: 'Основной без оформления',
    description: 'Без оформления контента в блок panel',
  },
  {
    id: 30,
    templatename: 'Параметр рейтинга',
    description: 'Template',
  },
  {
    id: 31,
    templatename: 'Сауны',
    description: 'Template',
  },
]

export type Template = (typeof Templates)[number]
