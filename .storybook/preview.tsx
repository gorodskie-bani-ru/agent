import type { Preview, Decorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client/react'
import { theme } from '../src/theme'
import { GlobalStyle } from '../src/theme/GlobalStyle'
import { withAppContext } from './decorators/withAppContext'
import { withMsw } from './addons/msw/msw-decorator'
import { useApollo } from 'src/gql/apolloClient'
import { ChatProvider } from 'src/components/Chat/ChatWidget/context'

const WithProviders: Decorator = (Story) => {
  const apolloClient = useApollo(undefined, false)

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ApolloProvider client={apolloClient}>
          <ChatProvider>
            <Story />
          </ChatProvider>
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
  decorators: [withMsw, withAppContext, WithProviders],
}

export default preview
