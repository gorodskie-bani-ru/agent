import React from 'react'
import { CompanyViewStyled } from './styles'
import { Company } from 'src/Custom/interfaces'
import { useCompanyData } from 'src/Custom/hooks/useCompanyData'
import { Markdown } from 'src/components/Markdown'
// import { CompanyFragment } from 'src/gql/generated'
// import { CompanyDataView } from '../../components/CompanyDataView'
// import { useCompanyData } from '../../hooks/useCompanyData'
// import { CompanyMap } from 'src/components/CompanyMap'

type CompanyViewProps = {
  company: Company
}

export const CompanyView: React.FC<CompanyViewProps> = ({
  company,
  ...other
}) => {
  const { name, content } = company

  const { image } = useCompanyData({ company }) || {}

  return (
    <>
      <CompanyViewStyled {...other}>
        <h1>{name}</h1>
        {image && <img src={image} />}
        {/* {data && <CompanyDataView data={data} />} */}

        {content && <Markdown>{content}</Markdown>}

        {/* <CompanyMap company={company} /> */}
      </CompanyViewStyled>
    </>
  )
}
