import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AIChatPanel as Component } from './'

const meta = {
  title: 'UI Kit/AIChatPanel',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
