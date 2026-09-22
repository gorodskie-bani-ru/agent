import { AppContextValue } from 'src/components/AppContext'
import { CompanyFormState } from '../hooks/useCompanyForm/interfaces'

export type CompanyFormStepProps = {
  currentUser: AppContextValue['user']
  onClickOpenLoginForm: React.MouseEventHandler<HTMLElement>
  formState: CompanyFormState
}
