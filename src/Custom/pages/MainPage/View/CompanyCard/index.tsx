import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Company } from 'src/Custom/interfaces'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { CompanyCardStyled } from './styles'

const placeholder = '/media/home/company-placeholder.webp'

type CompanyCardProps = {
  company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { name, intro, uri, image, Files, lat, lng } = company

  const images = useMemo(() => {
    return Array.from(
      new Set(
        [image, ...(Files?.map(({ File }) => File?.path) ?? [])].filter(
          (path): path is string => !!path && path !== image,
        ),
      ),
    )
  }, [Files, image])

  const [selected, setSelected] = useState(0)
  const [failedImages, setFailedImages] = useState<string[]>([])
  const active = images.length ? selected % images.length : 0
  const path = images[active]
  const isPlaceholder = !path || failedImages.includes(path)
  const hasCoordinates =
    typeof lat === 'number' &&
    Number.isFinite(lat) &&
    typeof lng === 'number' &&
    Number.isFinite(lng)

  const handleImageError = useCallback(() => {
    if (path && !isPlaceholder) {
      setFailedImages((previous) => [...previous, path])
    }
  }, [path, isPlaceholder])
  const previousImage = useCallback(() => {
    setSelected((active + images.length - 1) % images.length)
  }, [active, images.length])
  const nextImage = useCallback(() => {
    setSelected((active + 1) % images.length)
  }, [active, images.length])

  return (
    <CompanyCardStyled>
      <div className="card-photo">
        <Link href={uri} aria-label={`Подробнее: ${name}`}>
          <img
            src={
              isPlaceholder
                ? placeholder
                : getResizedImagePath({ path, size: 'middle' })
            }
            alt={
              isPlaceholder
                ? 'Банные принадлежности — иллюстрация'
                : `${name} — фото ${active + 1}`
            }
            width={800}
            height={533}
            loading="lazy"
            onError={handleImageError}
          />
        </Link>
        {isPlaceholder && (
          <span className="photo-label">Фото появится позже</span>
        )}
        {images.length > 1 && (
          <div className="gallery-controls">
            <button
              type="button"
              aria-label={`Предыдущее фото: ${name}`}
              onClick={previousImage}
            >
              <ChevronLeft size={18} />
            </button>
            <span aria-live="polite">
              {active + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label={`Следующее фото: ${name}`}
              onClick={nextImage}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="card-body">
        <h3>
          <Link href={uri}>{name}</Link>
        </h3>
        {intro && (
          <div className="card-intro">
            <ReactMarkdown
              allowedElements={['p', 'strong', 'em']}
              unwrapDisallowed
              skipHtml
            >
              {intro}
            </ReactMarkdown>
          </div>
        )}
        <div className="card-links">
          <Link href={uri}>
            Подробнее <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          {hasCoordinates && (
            <Link
              href={`/map?lat=${lat}&lng=${lng}`}
              aria-label={`${name} на карте`}
            >
              <MapPin size={16} aria-hidden="true" /> На карте
            </Link>
          )}
        </div>
      </div>
    </CompanyCardStyled>
  )
}
