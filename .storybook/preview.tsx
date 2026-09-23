import type { Preview, Decorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client/react'
import { theme } from '../src/theme'
import { GlobalStyle } from '../src/theme/GlobalStyle'
import { withAppContext } from './decorators/withAppContext'
import { withMsw } from './addons/msw/msw-decorator'
import { useApollo } from 'src/gql/apolloClient'
import { withChatContext } from './decorators/withChatContext'

const WithProviders: Decorator = (Story) => {
  const apolloClient = useApollo(undefined, false)

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ApolloProvider client={apolloClient}>
          <Story />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withMsw, withAppContext, withChatContext, WithProviders],
}

export default preview
