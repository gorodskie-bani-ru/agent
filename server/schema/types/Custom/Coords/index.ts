import { builder } from 'server/schema/builder'

export const CoordsInput = builder.inputType('CoordsInput', {
  fields: (t) => ({
    lat: t.float({
      required: true,
    }),
    lng: t.float({
      required: true,
    }),
    alt: t.float({
      required: false,
    }),
  }),
})

export const Coords = builder.simpleObject('Coords', {
  fields: (t) => ({
    lat: t.float({
      nullable: false,
    }),
    lng: t.float({
      nullable: false,
    }),
    alt: t.float({
      nullable: true,
    }),
  }),
})

export type Coords = typeof Coords.$inferType
