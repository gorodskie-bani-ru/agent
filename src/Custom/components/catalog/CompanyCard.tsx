import styled from 'styled-components'
// import { Star, MapPin, Clock } from 'lucide-react'
// import { useCallback } from 'react'
import Link from 'next/link'
import { Company } from 'src/Custom/interfaces'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'

type CardProps = { $highlighted?: boolean }

const Card = styled.article<CardProps>`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 14px;
  background: white;
  border: 1px solid
    ${({ theme, $highlighted }) =>
      $highlighted
        ? theme.lovable.colors.primary
        : theme.lovable.colors.border};
  border-radius: ${({ theme }) => theme.lovable.radii.lg};
  overflow: hidden;
  transition:
    border-color 0.15s,
    transform 0.15s,
    box-shadow 0.15s;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.lovable.colors.primary};
    box-shadow: ${({ theme }) => theme.lovable.shadows.card};
    transform: translateY(-2px);
  }
  @media (min-width: ${({ theme }) => theme.lovable.bp.sm}) {
    grid-template-columns: 180px 1fr;
  }
  overflow: hidden;
  max-height: 180px;
`

const Img = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  min-height: 130px;
`

const Body = styled.div`
  padding: 14px 14px 14px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled(Link)`
  font-family: ${({ theme }) => theme.lovable.fonts.heading};
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.lovable.colors.text};
  &:hover {
    color: ${({ theme }) => theme.lovable.colors.primary};
    text-decoration: none;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.lovable.colors.muted};
  svg {
    flex-shrink: 0;
  }
`

// const Rating = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 4px;
//   font-weight: 700;
//   color: ${({ theme }) => theme.lovable.colors.text};
//   svg {
//     color: ${({ theme }) => theme.lovable.colors.star};
//     fill: ${({ theme }) => theme.lovable.colors.star};
//   }
//   small {
//     font-weight: 400;
//     color: ${({ theme }) => theme.lovable.colors.muted};
//     margin-left: 4px;
//   }
// `

// const Status = styled.span<{ $open: boolean }>`
//   font-size: 12.5px;
//   font-weight: 600;
//   color: ${({ $open, theme }) =>
//     $open ? theme.lovable.colors.success : theme.lovable.colors.danger};
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   &::before {
//     content: '';
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background: currentColor;
//   }
// `

// const Tags = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 6px;
//   margin-top: 6px;
// `

// const Tag = styled.span`
//   font-size: 12px;
//   background: ${({ theme }) => theme.lovable.colors.accent};
//   color: ${({ theme }) => theme.lovable.colors.primaryDark};
//   padding: 3px 10px;
//   border-radius: ${({ theme }) => theme.lovable.radii.pill};
// `

const TopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

type Props = {
  company: Company
  highlighted?: boolean
  // onHover?: (id: string | null) => void
}

export function CompanyCard({ company, highlighted }: Props) {
  // const onMouseEnter = useCallback(() => onHover?.(id), [id, onHover])
  // const onMouseLeave = useCallback(() => onHover?.(null), [onHover])

  const { name, uri: href, image: imageProps, intro } = company

  const image = imageProps
    ? getResizedImagePath({
        path: imageProps,
        size: 'middle',
      })
    : undefined

  return (
    <Card
      $highlighted={highlighted}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
    >
      {image && <Img $src={image} role="img" aria-label={name} />}
      <Body>
        <TopLine>
          <Title href={href}>{name}</Title>
          {/* {!!rating && (
            <Rating>
              <Star size={15} />
              {rating.toFixed(1)}
              <small>({reviewsCount})</small>
            </Rating>
          )} */}
        </TopLine>
        {/* {city || address ? (
          <Row>
            <MapPin size={14} /> {[city, address].join(', ')}
          </Row>
        ) : undefined} */}
        {/* {hours && (
          <Row>
            <Clock size={14} /> {hours}
            {isOpenNow !== undefined && (
              <span style={{ marginLeft: 8 }}>
                <Status $open={isOpenNow}>
                  {isOpenNow ? 'Открыто' : 'Закрыто'}
                </Status>
              </span>
            )}
          </Row>
        )} */}
        {/* {priceFrom && (
          <Row style={{ color: 'inherit' }}>
            <strong>от {priceFrom.toLocaleString('ru-RU')} ₽</strong>
          </Row>
        )} */}
        {intro && <Row style={{ color: 'inherit' }}>{intro}</Row>}
        {/* <Tags>
          {tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Tags> */}
      </Body>
    </Card>
  )
}
