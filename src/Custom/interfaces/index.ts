import { EnumValueConfigMap, SchemaTypes } from '@pothos/core'

export const CustomKbConceptType = {
  City: {
    value: 'city:default',
    description: 'Город',
  },
  Company: {
    value: 'company:default',
    description: 'Компания',
  },
} as const satisfies EnumValueConfigMap<SchemaTypes>
