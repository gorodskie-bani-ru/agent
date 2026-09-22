import React, { useMemo } from 'react'
import {
  CompanyFormContentStyled,
  CompanyStyled,
  // CompanyFormTextareaStyled,
  CompanyFormToolbarStyled,
} from './styles'
import { useCompanyFormToolbar } from './hooks/useCompanyFormToolbar'
import { CompanyFormSteps } from './interfaces'
import { CompanyFormStepIntro } from './Step/Intro'
// import { CompanyFormStepInfo } from './Step/Info'
// import { CompanyFormStepGallery } from './Step/Gallery'
// import { CompanyFormStepPreview } from './Step/Preview'
// import { CompanyFormStepReview } from './Step/Review'
import { useCompanyForm } from './hooks/useCompanyForm'
// import { CompanyFormActions } from './hooks/useCompanyForm/interfaces'
import { useAppContext } from 'src/components/AppContext'
import { useRouter } from 'next/router'

// import dynamic from 'next/dynamic'
// const CompanyFormStepGallery = dynamic(
//   () => import('./Step/Gallery').then((r) => r.CompanyFormStepGallery),
//   {
//     ssr: false,
//   }
// )

type CompanyFormProps = {
  step: CompanyFormSteps
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ step }) => {
  const { state: formState, reducer: _formReducer } = useCompanyForm()

  // const text = formState.dataSource

  const { toolbar, activeTab } = useCompanyFormToolbar({
    step,
    companyId: formState.companyId,
    formState,
  })

  // const [text, textSetter] = useState()

  // const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
  //   (event) => {
  //     const value = event.currentTarget.value

  //     // textSetter(value)
  //     formReducer({
  //       type: CompanyFormActions.SetDataSource,
  //       payload: value,
  //     })
  //   },
  //   [formReducer],
  // )

  // const { currentUser, onClickOpenLoginForm } = useCurrentUser()

  const { user: currentUser, openLoginForm: onClickOpenLoginForm } =
    useAppContext()

  const router = useRouter()

  const content = useMemo(() => {
    let content: React.ReactNode

    switch (activeTab) {
      case CompanyFormSteps.Intro:
        content = (
          <CompanyFormStepIntro
            currentUser={currentUser}
            onClickOpenLoginForm={onClickOpenLoginForm}
            formState={formState}
          />
        )

        break
      // case CompanyFormSteps.ClientFill:
      //   content = (
      //     <CompanyFormStepInfo
      //       text={text}
      //       onChange={onChange}
      //       currentUser={currentUser}
      //       onClickOpenLoginForm={onClickOpenLoginForm}
      //       formState={formState}
      //     />
      //   )

      //   break

      // case CompanyFormSteps.ClientEditGallery:
      //   content = (
      //     <CompanyFormStepGallery
      //       formState={formState}
      //       formReducer={formReducer}
      //       currentUser={currentUser}
      //       onClickOpenLoginForm={onClickOpenLoginForm}
      //     />
      //   )

      //   break

      // case CompanyFormSteps.Preview:
      //   content = (
      //     <CompanyFormStepPreview
      //       formState={formState}
      //       formReducer={formReducer}
      //       currentUser={currentUser}
      //       onClickOpenLoginForm={onClickOpenLoginForm}
      //     />
      //   )

      //   break

      // case CompanyFormSteps.Review:
      //   content = currentUser ? (
      //     <CompanyFormStepReview
      //       formState={formState}
      //       formReducer={formReducer}
      //       currentUser={currentUser}
      //       onClickOpenLoginForm={onClickOpenLoginForm}
      //     />
      //   ) : null

      //   break

      default:
        router.push('/companies/create')
    }

    return content
  }, [activeTab, currentUser, formState, onClickOpenLoginForm, router])

  return (
    <CompanyStyled>
      {currentUser && (
        <CompanyFormToolbarStyled>{toolbar}</CompanyFormToolbarStyled>
      )}

      <CompanyFormContentStyled>{content}</CompanyFormContentStyled>
    </CompanyStyled>
  )
}
