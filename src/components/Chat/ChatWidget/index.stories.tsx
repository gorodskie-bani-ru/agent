import React, { useCallback } from 'react'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  ChatForm,
  ChatTextarea,
  SendButton,
  StopButton,
  MessageStyled as Message,
  ChatMessages,
  ChatWindow,
  ChatHeader,
  ChatTitle,
  HeaderButtons,
  ExpandButton,
  CloseButton,
  ChatContentContainer,
  ChatInputContainer,
  WelcomeMessage,
} from './styles'
import { Markdown } from 'src/components/Markdown'

const meta: Meta = {
  title: 'Компоненты/Чат',
}

export default meta

const PreventDefault: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleSubmit = useCallback((e: React.SubmitEvent) => {
    e.preventDefault()
  }, [])
  return <ChatForm onSubmit={handleSubmit}>{children}</ChatForm>
}

export const InputFormDefault: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <PreventDefault>
        <ChatTextarea placeholder="Напишите сообщение..." rows={1} />
        <SendButton type="submit" $hasText={false}>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </SendButton>
      </PreventDefault>
    </div>
  ),
}

export const InputFormWithText: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <PreventDefault>
        <ChatTextarea
          placeholder="Напишите сообщение..."
          rows={1}
          defaultValue="Здравствуйте, как дела?"
        />
        <SendButton type="submit" $hasText={true}>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </SendButton>
      </PreventDefault>
    </div>
  ),
}

export const InputFormDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <PreventDefault>
        <ChatTextarea placeholder="Напишите сообщение..." rows={1} disabled />
        <SendButton type="submit" $hasText={false} disabled>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </SendButton>
      </PreventDefault>
    </div>
  ),
}

export const InputFormStreaming: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <PreventDefault>
        <ChatTextarea placeholder="Напишите сообщение..." rows={1} disabled />
        <StopButton type="button">
          <svg viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </StopButton>
      </PreventDefault>
    </div>
  ),
}

export const MessageUser: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <Message $isUser={true}>
        <Markdown>Здравствуйте! Как мне изучить React?</Markdown>
      </Message>
    </div>
  ),
}

export const MessageBot: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <Message $isUser={false}>
        <Markdown>
          Хороший вопрос! Вот как можно изучить React: 1. **Изучите основы
          JavaScript** — возможности ES6+ 2. **Разберитесь с JSX** — синтаксисом
          React 3. **Изучите компоненты и пропсы** — основу интерфейса 4.
          **Освойте состояние и хуки** — управление данными
        </Markdown>
      </Message>
    </div>
  ),
}

export const MessageBotStreaming: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <Message $isUser={false}>
        <Markdown>Хороший вопрос! Вот как можно изучить React...</Markdown>
      </Message>
    </div>
  ),
}

export const MessageBotEmpty: StoryObj = {
  render: () => (
    <div style={{ width: 380, padding: 16, background: '#f5f5f5' }}>
      <Message $isUser={false}>{null}</Message>
    </div>
  ),
}

export const ChatConversation: StoryObj = {
  render: () => (
    <div style={{ width: 380, background: '#f5f5f5' }}>
      <ChatMessages style={{ maxHeight: 400 }}>
        <Message $isUser={true}>
          <Markdown>Здравствуйте! Как мне изучить React?</Markdown>
        </Message>
        <Message $isUser={false}>
          <Markdown>
            Хороший вопрос! Вот первые шаги: 1. **Изучите основы JavaScript** 2.
            **Разберитесь с JSX** 3. **Изучите компоненты и пропсы**
          </Markdown>
        </Message>
        <Message $isUser={true}>
          <Markdown>А что насчёт хуков?</Markdown>
        </Message>
        <Message $isUser={false}>
          <Markdown>
            Хуки — это функции, которые позволяют использовать состояние и
            другие возможности React. Чаще всего применяют `useState` и
            `useEffect`.
          </Markdown>
        </Message>
      </ChatMessages>
    </div>
  ),
}

export const ChatWindowDefault: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: 500 }}>
      <ChatWindow
        style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
      >
        <ChatHeader>
          <ChatTitle>Помощник в чате</ChatTitle>
          <HeaderButtons>
            <ExpandButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            </ExpandButton>
            <CloseButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </CloseButton>
          </HeaderButtons>
        </ChatHeader>
        <ChatContentContainer $hasMessages={false}>
          <WelcomeMessage>
            <h4>Здравствуйте! Чем я могу помочь?</h4>
            <p>Задайте мне любой вопрос</p>
          </WelcomeMessage>
          <ChatInputContainer>
            <PreventDefault>
              <ChatTextarea placeholder="Напишите вопрос..." rows={1} />
              <SendButton type="submit" $hasText={false}>
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </SendButton>
            </PreventDefault>
          </ChatInputContainer>
        </ChatContentContainer>
      </ChatWindow>
    </div>
  ),
}

export const ChatWindowWithMessages: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: 500 }}>
      <ChatWindow
        style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
      >
        <ChatHeader>
          <ChatTitle>Помощник в чате</ChatTitle>
          <HeaderButtons>
            <ExpandButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            </ExpandButton>
            <CloseButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </CloseButton>
          </HeaderButtons>
        </ChatHeader>
        <ChatContentContainer $hasMessages={true}>
          <ChatMessages>
            <Message $isUser={true}>
              <Markdown>Здравствуйте!</Markdown>
            </Message>
            <Message $isUser={false}>
              <Markdown>Здравствуйте! Чем я могу вам помочь?</Markdown>
            </Message>
          </ChatMessages>
          <ChatInputContainer>
            <PreventDefault>
              <ChatTextarea placeholder="Напишите вопрос..." rows={1} />
              <SendButton type="submit" $hasText={false}>
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </SendButton>
            </PreventDefault>
          </ChatInputContainer>
        </ChatContentContainer>
      </ChatWindow>
    </div>
  ),
}

export const ChatWindowStreaming: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: 500 }}>
      <ChatWindow
        style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
      >
        <ChatHeader>
          <ChatTitle>Помощник в чате</ChatTitle>
          <HeaderButtons>
            <ExpandButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            </ExpandButton>
            <CloseButton>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </CloseButton>
          </HeaderButtons>
        </ChatHeader>
        <ChatContentContainer $hasMessages={true}>
          <ChatMessages>
            <Message $isUser={true}>
              <Markdown>Как мне изучить React?</Markdown>
            </Message>
            <Message $isUser={false}>
              <Markdown>
                Хороший вопрос! Вот как можно изучить React...
              </Markdown>
            </Message>
          </ChatMessages>
          <ChatInputContainer>
            <PreventDefault>
              <ChatTextarea
                placeholder="Напишите вопрос..."
                rows={1}
                disabled
              />
              <StopButton type="button">
                <svg viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </StopButton>
            </PreventDefault>
          </ChatInputContainer>
        </ChatContentContainer>
      </ChatWindow>
    </div>
  ),
}
