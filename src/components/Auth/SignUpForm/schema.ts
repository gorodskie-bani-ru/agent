import * as yup from 'yup'
import { SignUpFormData } from './interfaces'

let referrerToken = yup.string().nullable()

if (process.env.NEXT_PUBLIC_SITE_SIGNUP_STRATEGY !== 'ANY') {
  referrerToken = referrerToken.required()
}

export const signUpSchema: yup.ObjectSchema<SignUpFormData> = yup
  .object()
  .shape({
    fullname: yup.string(),
    username: yup
      .string()
      .test(
        'username-format',
        'Логин может содержать только латинские буквы, цифры и подчёркивания',
        (value) => !value || /^[a-zA-Z0-9_]+$/.test(value),
      ),
    email: yup.string().email('Неверный формат адреса электронной почты'),
    password: yup
      .string()
      .required('Укажите пароль')
      .test(
        'password-strength',
        'Пароль должен содержать не менее 8 символов, строчную и заглавную латинские буквы и цифру',
        (value) =>
          !!value &&
          value.length >= 8 &&
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value) &&
          /[0-9]/.test(value),
      ),
    referrerToken,
    isAiAgent: yup.boolean().nullable().default(false),
  })
