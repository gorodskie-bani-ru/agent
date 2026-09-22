import React, { useCallback } from 'react'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignInFormStyled } from './styles'
import { SignInFormData, signInSchema } from './interfaces'
import { SigninMutation, useSigninMutation } from 'src/gql/generated'
import { FormControl } from 'src/ui-kit/FormControl'
import { TextField } from 'src/ui-kit/controls/TextField'
import { useAppContext } from 'src/components/AppContext'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { Button } from 'src/ui-kit/Button'
import { AuthProviders } from '../AuthProviders'
import { AuthFormFooterStyled } from '../styles'

export type { SignInFormData }

export interface SignInFormProps {
  onSuccessHandler?: (data: SigninMutation['response']) => void
  loading?: boolean
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSuccessHandler,
  loading = false,
}) => {
  const { onAuth } = useAppContext()

  const form = useForm<SignInFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema),
  })

  const { addMessage } = useSnackbar() || {}

  const [signinMutation] = useSigninMutation({})

  const onSubmit = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault()

      form.trigger().then(async (isValid) => {
        if (isValid) {
          const { username, password } = form.getValues()

          try {
            await signinMutation({
              variables: {
                where: { username },
                data: { password },
              },
            }).then(async (r) => {
              if (r.data?.response?.token) {
                await onAuth?.(r.data?.response.token)

                onSuccessHandler?.(r.data.response)
              } else {
                throw new Error(
                  r.data?.response?.message || 'Неверный логин или пароль',
                )
              }
            })
          } catch (error) {
            addMessage?.(
              (error as Error).message ||
                'Что-то пошло не так. Попробуйте позже',
              {
                variant: 'error',
              },
            )
          }
        }
      })
    },
    [addMessage, form, onAuth, onSuccessHandler, signinMutation],
  )

  const fieldRenderer = useCallback<
    ControllerProps<SignInFormData, 'username' | 'password'>['render']
  >(
    ({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
      let label: string
      let placeholder: string
      let type = 'text'

      switch (name) {
        case 'username':
          label = 'Логин'
          placeholder = 'Введите логин'
          break
        case 'password':
          label = 'Пароль'
          placeholder = 'Введите пароль'
          type = 'password'
          break
      }

      return (
        <FormControl
          label={label}
          required
          helperText={error?.message}
          error={!!error}
        >
          <TextField
            type={type}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={loading}
          />
        </FormControl>
      )
    },
    [loading],
  )

  return (
    <SignInFormStyled onSubmit={onSubmit}>
      <FormProvider {...form}>
        <Controller name="username" render={fieldRenderer} />
        <Controller name="password" render={fieldRenderer} />

        <AuthFormFooterStyled>
          <AuthProviders
            onSuccessHandler={onSuccessHandler}
            referrerToken={null}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </AuthFormFooterStyled>
      </FormProvider>
    </SignInFormStyled>
  )
}
