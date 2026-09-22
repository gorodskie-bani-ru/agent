import { useReducer } from 'react'
import {
  CompanyFormAction,
  CompanyFormActions,
  CompanyFormState,
} from './interfaces'

function companyFormReducer(
  state: CompanyFormState,
  action: CompanyFormAction,
): CompanyFormState {
  switch (action.type) {
    case CompanyFormActions.SetDataSource:
      return {
        ...state,
        dataSource: action.payload,
      }
    case CompanyFormActions.SetData:
      return {
        ...state,
        data: action.payload,
      }
    case CompanyFormActions.AddGalleryFiles:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      }
    case CompanyFormActions.SetCompanyId:
      return {
        ...state,
        companyId: action.payload,
      }
    default:
      return state
  }
}

const initialState: CompanyFormState = {
  dataSource: '',
  data: '',
  files: [],
}

export function useCompanyForm() {
  // const [state, dispatch] = useReducer(tabReducer, initialState)
  const [state, reducer] = useReducer(companyFormReducer, initialState)

  return {
    state,
    reducer,
  }
}
