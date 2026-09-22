import React, { useCallback, useState } from 'react'
import { MetaMaskAuthStyled } from './styles'
import {
  useAuthEthAccountMutation,
  useEthAccountNonceMutation,
} from 'src/gql/generated'
import { useAppContext } from 'src/components/AppContext'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string
        params?: unknown[]
      }) => Promise<unknown>
      isMetaMask?: boolean
    }
  }
}

export interface MetaMaskAuthProps {
  onSuccess?: () => void
  referrerToken: string | null
}

export const MetaMaskAuth: React.FC<MetaMaskAuthProps> = ({
  onSuccess,
  referrerToken,
}) => {
  const { onAuth } = useAppContext()
  const { addMessage } = useSnackbar() || {}
  const [loading, setLoading] = useState(false)

  const [getNonce] = useEthAccountNonceMutation()
  const [authEthAccount] = useAuthEthAccountMutation()

  const handleConnect = useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      addMessage?.('MetaMask не установлен', { variant: 'error' })
      return
    }

    setLoading(true)

    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error('Аккаунты не найдены')
      }

      const address = accounts[0]

      const nonceResult = await getNonce({ variables: { address } })
      const nonce = nonceResult.data?.ethAccountNonce?.nonce
      const message = nonceResult.data?.ethAccountNonce?.message

      if (!nonce || !message) {
        throw new Error('Не удалось получить одноразовый код')
      }

      const signature = (await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      })) as string

      const authResult = await authEthAccount({
        variables: {
          data: { address, signature, nonce, referrerToken },
        },
      })

      if (authResult.data?.response?.token) {
        await onAuth?.(authResult.data.response.token)
        onSuccess?.()
      } else {
        throw new Error(
          authResult.data?.response?.message || 'Не удалось войти',
        )
      }
    } catch (error) {
      addMessage?.((error as Error).message || 'Что-то пошло не так', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [addMessage, authEthAccount, getNonce, onAuth, onSuccess, referrerToken])

  return (
    <MetaMaskAuthStyled>
      <Button
        type="button"
        onClick={handleConnect}
        disabled={loading}
        variant={ComponentVariant.SECONDARY}
      >
        {loading ? 'Подключение...' : 'Подключить MetaMask'}
      </Button>
    </MetaMaskAuthStyled>
  )
}
