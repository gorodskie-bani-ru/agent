// import { MainPageView } from '@/components/pages/MainPage/View/MainPageView'
// import dynamic from 'next/dynamic'
// import { useMemo } from 'react'
import { Company } from 'src/Custom/interfaces'
import { ConceptItemCustom } from '../../Concepts/View/ConceptItem'
// import { MarkdownField } from 'src/components/MarkdownField'
// import { CompanyFragment } from 'src/gql/generated'
// import { createResizedUrl } from 'src/helpers/imageFormats'
// import { MainPageView } from 'src/Layout/V2/components/pages/MainPage/View/MainPageView'
// import { Company } from 'src/Layout/V2/types'
// import { makeCompanyUrl } from 'src/uikit/Link/Company'

// const OsmMap = dynamic(
//   () => import('../../../components/OsmMap').then((r) => r.OsmMap),
//   {
//     ssr: false,
//   }
// )

// const SUGGESTIONS = [
//   'Баня с бассейном',
//   'Парная на дровах',
//   'До 2000₽ за час',
//   'Хамам и СПА',
// ]

// const MainPageMap: React.FC = () => {
//   return (
//     <div
//       style={{
//         height: '100%',
//       }}
//     >
//       <OsmMap />
//     </div>
//   )
// }

type ViewProps = {
  companies: Company[]
}

export const View: React.FC<ViewProps> = ({ companies }) => {
  return (
    <>
      {companies.map((n) => (
        <ConceptItemCustom key={n.id} concept={n} variant="list" />
      ))}
    </>
  )
}
