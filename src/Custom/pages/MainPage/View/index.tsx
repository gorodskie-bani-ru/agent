import { Company } from 'src/Custom/interfaces'
import { MainPageViewCompanyStyled, MainPageViewStyled } from './styles'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

type ViewProps = {
  companies: Company[]
}

export const MainPageView: React.FC<ViewProps> = ({ companies }) => {
  const router = useRouter()

  const onClickMapLink = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const link = event.currentTarget.value

      link && router.push(link)
    },
    [router],
  )

  return (
    <MainPageViewStyled>
      {companies.map((n) => {
        const { id, name, image, lat, lng } = n

        const imageSrc = image
          ? getResizedImagePath({
              path: image,
              size: 'middle',
            })
          : undefined

        return (
          <MainPageViewCompanyStyled key={id}>
            <h3>{name}</h3>

            {imageSrc && <img src={imageSrc} alt={name} title={name} />}

            {lat && lng ? (
              <button
                value={`/map?lat=${lat}&lng=${lng}`}
                onClick={onClickMapLink}
              >
                На карте
              </button>
            ) : null}
          </MainPageViewCompanyStyled>
        )
      })}
    </MainPageViewStyled>
  )
}
