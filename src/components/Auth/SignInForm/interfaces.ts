import * as yup from 'yup'

export interface SignInFormData {
  username: string
  password: string
}

export const signInSchema: yup.ObjectSchema<SignInFormData> = yup
  .object()
  .shape({
    username: yup.string().required('Укажите логин'),
    password: yup.string().required('Укажите пароль'),
  })
