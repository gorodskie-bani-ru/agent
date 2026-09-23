import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CompanyConceptItem as Concepts } from './'
import { mockConcept } from '.storybook/mocks/concepts'
import { Company } from 'src/Custom/interfaces'

const meta = {
  title: 'Custom/pages/Concepts/View/ConceptItem/CompanyConceptItem',
  component: Concepts,
  args: {
    concept: mockConcept as Company,
  },
} satisfies Meta<typeof Concepts>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
