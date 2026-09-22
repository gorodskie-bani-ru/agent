// import { FileNode } from '@prisma-cms/uploader'

export enum CompanyFormActions {
  SetDataSource = 'SetDataSource',
  SetData = 'SetData',
  AddGalleryFiles = 'AddGalleryFiles',
  SetCompanyId = 'SetCompanyId',
}

export type CompanyFormState = {
  // Исходный текст
  dataSource: string

  // Конечные данные компании
  data: string | undefined

  // files: FileNode[]
  files: File[]

  /**
   * ID созданной компании
   */
  companyId?: string
}

export type CompanyFormAction =
  | {
      type: CompanyFormActions.SetDataSource
      payload: CompanyFormState['dataSource']
    }
  | {
      type: CompanyFormActions.SetData
      payload: CompanyFormState['data']
    }
  | {
      type: CompanyFormActions.AddGalleryFiles
      payload: CompanyFormState['files']
    }
  | {
      type: CompanyFormActions.SetCompanyId
      payload: CompanyFormState['companyId']
    }
