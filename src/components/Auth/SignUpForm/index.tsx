import React, { useCallback } from 'react'
import {
  Controller,
  ControllerProps,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpFormStyled } from './styles'
import { SignupMutation, useSignupMutation } from 'src/gql/generated'
import { useAppContext } from 'src/components/AppContext'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { FormControl } from 'src/ui-kit/FormControl'
import { TextField } from 'src/ui-kit/controls/TextField'
import { Button } from 'src/ui-kit/Button'
import { AuthProviders } from '../AuthProviders'
import { useSearchParams } from 'next/navigation'
import { GET_PARAM_REFERRERTOKEN_NAME, SignUpFormData } from './interfaces'
import { signUpSchema } from './schema'
import { AuthFormFooterStyled } from '../styles'

export interface SignUpFormProps {
  onSuccessHandler?: (data: SignupMutation['response']) => void
  loading?: boolean
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccessHandler,
  loading = false,
}) => {
  const params = useSearchParams()

  const referrerToken = params.get(GET_PARAM_REFERRERTOKEN_NAME)

  const { onAuth } = useAppContext()

  const form = useForm<SignUpFormData>({
    defaultValues: {
      referrerToken,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signUpSchema),
  })

  form.watch('referrerToken')

  const { addMessage } = useSnackbar() || {}

  const [signupMutation] = useSignupMutation({})

  const onSubmit = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault()

      form.trigger().then(async (isValid) => {
        if (isValid) {
          const data = form.getValues()

          try {
            await signupMutation({
              variables: {
                data,
              },
            }).then(async (r) => {
              if (r.data?.response?.token) {
                await onAuth?.(r.data?.response.token)

                onSuccessHandler?.(r.data.response)
              } else {
                throw new Error(r.data?.response?.message || '')
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
    [addMessage, form, onAuth, onSuccessHandler, signupMutation],
  )

  const fieldRenderer = useCallback<
    ControllerProps<
      SignUpFormData,
      'fullname' | 'username' | 'email' | 'password' | 'referrerToken'
    >['render']
  >(
    ({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
      let label: string
      let placeholder: string
      let type = 'text'
      let required = false

      switch (name) {
        case 'fullname':
          label = 'Полное имя'
          placeholder = 'Введите полное имя'
          break
        case 'username':
          label = 'Логин'
          placeholder = 'Введите логин'
          break
        case 'email':
          label = 'Электронная почта'
          placeholder = 'Введите адрес электронной почты'
          type = 'email'
          break
        case 'password':
          label = 'Пароль'
          placeholder = 'Введите пароль'
          type = 'password'
          required = true
          break
        case 'referrerToken':
          label = 'Токен приглашения'
          placeholder = 'Введите токен приглашения'
          break
      }

      return (
        <FormControl
          label={label}
          required={required}
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
    <SignUpFormStyled onSubmit={onSubmit}>
      <FormProvider {...form}>
        <Controller name="fullname" render={fieldRenderer} />
        <Controller name="email" render={fieldRenderer} />
        <Controller name="username" render={fieldRenderer} />
        <Controller name="password" render={fieldRenderer} />
        <Controller name="referrerToken" render={fieldRenderer} />

        <AuthFormFooterStyled>
          <AuthProviders
            onSuccessHandler={onSuccessHandler}
            referrerToken={form.getValues().referrerToken ?? null}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </AuthFormFooterStyled>
      </FormProvider>
    </SignUpFormStyled>
  )
}
