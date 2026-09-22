import 'leaflet/dist/leaflet.css'

import React from 'react'
import { ChatWidget } from 'src/components/Chat/ChatWidget'
import { Header } from './Header'
import { Footer } from './Footer'
import { CustomLayoutMainStyled, CustomLayoutStyled } from './styles'

type LayoutV2Props = React.PropsWithChildren

export const CustomLayout: React.FC<LayoutV2Props> = ({ children }) => {
  return (
    <CustomLayoutStyled>
      <Header />
      <CustomLayoutMainStyled>{children}</CustomLayoutMainStyled>
      <Footer />

      <ChatWidget />
    </CustomLayoutStyled>
  )
}
