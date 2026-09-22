import styled, { css, keyframes } from 'styled-components'
import { Send, Sparkles } from 'lucide-react'
import React, { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
// import Link from 'next/link'
import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'
// import { Company } from 'src/Custom/interfaces'

const Card = styled.div<{ $compact?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.lovable.colors.bg};
  border-radius: ${({ theme }) => theme.lovable.radii.xl};
  padding: ${({ $compact }) => ($compact ? '16px' : '20px')};
  box-shadow: ${({ theme }) => theme.lovable.shadows.card};
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.lovable.colors.primary},
      ${({ theme }) => theme.lovable.colors.primaryGlow},
      transparent 60%
    );
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.9;
  }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.lovable.fonts.heading};
  font-weight: 700;
  color: ${({ theme }) => theme.lovable.colors.text};
  svg {
    color: ${({ theme }) => theme.lovable.colors.primary};
  }
`

const Hint = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.lovable.colors.muted};
  margin-bottom: 14px;
`

const Messages = styled.div`
  max-height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px 2px;
  margin-bottom: 12px;
  &:empty {
    display: none;
  }
`

const Bubble = styled.div<{ $role: 'user' | 'assistant' }>`
  align-self: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 85%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.lovable.radii.lg};
  font-size: 14.5px;
  line-height: 1.5;
  background: ${({ $role, theme }) =>
    $role === 'user'
      ? theme.lovable.colors.primary
      : theme.lovable.colors.accent};
  color: ${({ $role, theme }) =>
    $role === 'user' ? 'white' : theme.lovable.colors.text};
  p {
    margin: 0 0 0.5em;
    &:last-child {
      margin: 0;
    }
  }
  ul,
  ol {
    padding-left: 18px;
    margin: 0.25em 0;
  }
`

// const ResultsRow = styled.div`
//   display: grid;
//   gap: 8px;
//   margin-top: 8px;
//   grid-template-columns: 1fr;
//   @media (min-width: ${({ theme }) => theme.lovable.bp.sm}) {
//     grid-template-columns: 1fr 1fr;
//   }
// `

// const Result = styled(Link)`
//   display: flex;
//   gap: 10px;
//   padding: 8px;
//   border-radius: ${({ theme }) => theme.lovable.radii.md};
//   background: white;
//   border: 1px solid ${({ theme }) => theme.lovable.colors.border};
//   color: ${({ theme }) => theme.lovable.colors.text};
//   text-decoration: none;
//   &:hover {
//     border-color: ${({ theme }) => theme.lovable.colors.primary};
//     text-decoration: none;
//   }
//   img {
//     width: 56px;
//     height: 56px;
//     object-fit: cover;
//     border-radius: 8px;
//   }
//   strong {
//     font-size: 14px;
//     display: block;
//   }
//   span {
//     font-size: 12px;
//     color: ${({ theme }) => theme.lovable.colors.muted};
//   }
// `

const InputRow = styled.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`

const Input = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  background: ${({ theme }) => theme.lovable.colors.surface};
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  padding: 12px 18px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.lovable.colors.text};
  outline: none;
  transition:
    border-color 0.15s,
    background 0.15s;
  &:focus {
    border-color: ${({ theme }) => theme.lovable.colors.primary};
    background: white;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.lovable.colors.accent};
  }
`

const SendBtn = styled.button`
  border: 0;
  background: ${({ theme }) => theme.lovable.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  padding: 0 20px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    background 0.15s,
    transform 0.05s;
  &:hover {
    background: ${({ theme }) => theme.lovable.colors.primaryDark};
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`

const chipActiveStyles = css`
  border-color: ${({ theme }) => theme.lovable.colors.primary};
  color: ${({ theme }) => theme.lovable.colors.primary};
  background: ${({ theme }) => theme.lovable.colors.accent};
`

type ChipProps = {
  $active: boolean
}

const Chip = styled.button<ChipProps>`
  border: 1px solid ${({ theme }) => theme.lovable.colors.border};
  background: white;
  color: ${({ theme }) => theme.lovable.colors.textSoft};
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.lovable.radii.pill};
  font-size: 13px;
  transition: all 0.15s;
  &:hover {
    ${chipActiveStyles}
  }

  ${({ $active }) => $active && chipActiveStyles}
`

const blink = keyframes`
  0%, 80%, 100% { opacity: .25; }
  40% { opacity: 1; }
`

const Typing = styled.div`
  display: inline-flex;
  gap: 4px;
  align-self: flex-start;
  padding: 12px 14px;
  background: ${({ theme }) => theme.lovable.colors.accent};
  border-radius: ${({ theme }) => theme.lovable.radii.lg};
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.lovable.colors.primary};
    animation: ${blink} 1.2s infinite;
  }
  span:nth-child(2) {
    animation-delay: 0.15s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`

// function ResultCards({ companies }: { companies: Company[] }) {
//   return (
//     <ResultsRow>
//       {companies.slice(0, 4).map((c) => (
//         <Result key={c.id} href={`/companies/${c.id}/`}>
//           {c.image && <img src={c.image} alt={c.name} loading="lazy" />}
//           <div>
//             <strong>{c.name}</strong>
//             {/* {!!c.rating && (
//               <span>
//                 {c.city} • ★ {c.rating.toFixed(1)}
//               </span>
//             )} */}
//           </div>
//         </Result>
//       ))}
//     </ResultsRow>
//   )
// }

const messages: string[] = []

const suggestions: string[] = [
  'Баня с бассейном',
  'Парная на дровах',
  'До 2000₽ за час',
  'Хамам и СПА',
]

type AIChatPanel = {
  // messages: ChatMessage[]
  isStreaming?: boolean
  // onSend: ((text: string) => void) | undefined
  // suggestions?: string[]
  compact?: boolean
}

export function AIChatPanel({
  // messages,
  isStreaming,
  // onSend,
  // suggestions = [],
  compact,
}: AIChatPanel) {
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   scrollRef.current?.scrollTo({ top: 9e9, behavior: 'smooth' })
  // }, [messages, isStreaming])

  // const openChatWithMessage = useOpenChatWithMessage({
  //   withSubmit: false,
  //   autoSendMessage: true,
  // })
  const openChatWithMessage = useOpenChatWithMessage()

  const onSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      openChatWithMessage(event)

      setText('')
    },
    [openChatWithMessage],
  )

  const onClickChip = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const value = event.currentTarget.value

      setText((text) => {
        if (text.includes(value)) {
          text = text.replace(value, '')
        } else {
          text += ' ' + value
        }

        return text.replaceAll(/" "{2,}/g, ' ').trim()
      })
    },
    [],
  )

  return (
    <Card $compact={compact}>
      <Head>
        <Sparkles size={20} />
        ИИ-помощник по баням
      </Head>
      <Hint>Опишите, что ищете — найду подходящие заведения</Hint>

      <Messages ref={scrollRef}>
        {messages.map((m) => (
          <Bubble key={m} $role={'user'}>
            <ReactMarkdown>{m}</ReactMarkdown>
            {/* {m.companies && m.companies.length > 0 && (
              <ResultCards companies={m.companies} />
            )} */}
          </Bubble>
        ))}
        {isStreaming && (
          <Typing>
            <span />
            <span />
            <span />
          </Typing>
        )}
      </Messages>

      <InputRow
        // onSubmit={submit}
        onSubmit={onSubmit}
      >
        <Input
          value={text}
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
            [],
          )}
          placeholder="Например: «баня с бассейном в Москве до 2500₽»"
          aria-label="Сообщение ИИ-помощнику"
          name="text"
        />
        <SendBtn type="submit" disabled={!text.trim() || isStreaming}>
          <Send size={16} /> Отправить
        </SendBtn>
      </InputRow>

      {suggestions.length > 0 && (
        <Chips>
          {suggestions.map((s) => (
            <Chip
              key={s}
              type="button"
              value={s}
              // onClick={() => onSend?.(s)}

              onClick={onClickChip}
              $active={text.includes(s)}
            >
              {s}
            </Chip>
          ))}
        </Chips>
      )}
    </Card>
  )
}
