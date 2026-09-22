import { CompanyForm as Component } from '../'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Component> = {
  title: 'pages/Companies/Company/Form',
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return <Story />
    },
  ],
}

export default meta

type Story = StoryObj<typeof Component>

export const CompanyForm: Story = {
  args: {},
}
