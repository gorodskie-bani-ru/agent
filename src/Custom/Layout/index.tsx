import 'leaflet/dist/leaflet.css'

import React from 'react'
import { ChatWidget } from 'src/components/Chat/ChatWidget'
import { CustomLayoutMainStyled, CustomLayoutStyled } from './styles'
import { Header } from './Header'
import { Footer } from './Footer'

type LayoutV2Props = React.PropsWithChildren

export const CustomLayout: React.FC<LayoutV2Props> = ({ children }) => {
  return (
    <>
      <CustomLayoutStyled>
        <a className="skip-link" href="#main-content">
          К содержимому
        </a>
        <Header />
        <CustomLayoutMainStyled id="main-content" tabIndex={-1}>
          {children}
        </CustomLayoutMainStyled>
        <Footer />
      </CustomLayoutStyled>
      <ChatWidget />
    </>
  )
}
