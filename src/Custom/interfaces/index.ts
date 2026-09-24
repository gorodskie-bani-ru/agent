import { EnumValueConfigMap, SchemaTypes } from '@pothos/core'
import { KbConceptFragment } from 'src/gql/generated'

export const CustomKbConceptType = {
  City: {
    value: 'city:default',
    description: 'Город',
  },
  Company: {
    value: 'company:default',
    description: 'Компания',
  },
  ResourceDefault: {
    value: 'resource:default',
    description: 'Веб-страница',
  },
  ReviewCompany: {
    value: 'review:company',
    description: 'Отзыв о компании',
  },
  BlogDefault: {
    value: 'blog:default',
    description: 'Публичный блог',
  },
  BlogPersonal: {
    value: 'blog:personal',
    description: 'Персональный блог',
  },
  TopicDefault: {
    value: 'topic:default',
    description: 'Публикация',
  },
} as const satisfies EnumValueConfigMap<SchemaTypes>

export type MapItemCompany = KbConceptFragment & {
  type: `company:${string}`
  lat: number
  lng: number
}

export function isMapItemCompany(
  concept: KbConceptFragment,
): concept is MapItemCompany {
  return concept.type?.startsWith('company:') && concept.lat && concept.lng
    ? true
    : false
}

export type Company = KbConceptFragment & {
  type: `company:${string}`
}

export function isCompany(concept: KbConceptFragment): concept is Company {
  return concept.type?.startsWith('company:') ? true : false
}

export type City = KbConceptFragment & {
  type: `city:${string}`
  lat: number | null | undefined
  lng: number | null | undefined
}

export function isCity(concept: KbConceptFragment): concept is City {
  return concept.type?.startsWith('city:') ? true : false
}

export type ReviewCompany = KbConceptFragment & {
  type: typeof CustomKbConceptType.ReviewCompany.value
}

export function isReviewCompany(
  concept: KbConceptFragment,
): concept is ReviewCompany {
  return concept.type === CustomKbConceptType.ReviewCompany.value
}
