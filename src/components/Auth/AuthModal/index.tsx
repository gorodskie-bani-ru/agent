import React, { useCallback, useState } from 'react'
import { Modal } from 'src/ui-kit/Modal'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'
import { AuthModalFooter, AuthModalLink } from './styles'

type AuthMode = 'signIn' | 'signUp'

export interface AuthModalProps {
  isOpen: boolean
  onClose: (() => void) | undefined
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('signIn')

  const handleSwitchToSignUp = useCallback(() => {
    setMode('signUp')
  }, [])

  const handleSwitchToSignIn = useCallback(() => {
    setMode('signIn')
  }, [])

  const handleSuccess = useCallback(() => {
    onClose?.()
    setMode('signIn')
  }, [onClose])

  const title = mode === 'signIn' ? 'Войти' : 'Зарегистрироваться'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {mode === 'signIn' ? (
        <>
          <SignInForm onSuccessHandler={handleSuccess} />
          <AuthModalFooter>
            Нет аккаунта?{' '}
            <AuthModalLink type="button" onClick={handleSwitchToSignUp}>
              Зарегистрироваться
            </AuthModalLink>
          </AuthModalFooter>
        </>
      ) : (
        <>
          <SignUpForm onSuccessHandler={handleSuccess} />
          <AuthModalFooter>
            Уже есть аккаунт?{' '}
            <AuthModalLink type="button" onClick={handleSwitchToSignIn}>
              Войти
            </AuthModalLink>
          </AuthModalFooter>
        </>
      )}
    </Modal>
  )
}
