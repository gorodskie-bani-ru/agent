import React, { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { useOpenChatWithMessage } from 'src/components/Chat/hooks/useOpenChatWithMessage'
import { CitiesPageViewStyled } from './styles'
import { City } from 'src/Custom/interfaces'

type CitiesPageViewProps = {
  cities: City[]
  loading?: boolean
  error?: boolean
}

const normalize = (value: string) =>
  value.toLocaleLowerCase('ru').replace(/ё/g, 'е').trim()
const featuredNames = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург']

export const CitiesPageView: React.FC<CitiesPageViewProps> = ({
  cities,
  loading,
  error,
}) => {
  const [query, setQuery] = useState('')
  const openChat = useOpenChatWithMessage()
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    [],
  )
  const clearSearch = useCallback(() => setQuery(''), [])
  const filtered = useMemo(
    () =>
      cities
        .filter((city) => normalize(city.name).includes(normalize(query)))
        .sort((a, b) => a.name.localeCompare(b.name, 'ru')),
    [cities, query],
  )
  const groups = useMemo(() => {
    const result = new Map<string, City[]>()
    for (const city of filtered) {
      const letter = city.name.trim().charAt(0).toLocaleUpperCase('ru')
      const group = result.get(letter) ?? []
      group.push(city)
      result.set(letter, group)
    }
    return Array.from(result.entries())
  }, [filtered])
  const featured = featuredNames.flatMap((name) => {
    const city = cities.find((item) => item.name === name)
    return city ? [city] : []
  })

  return (
    <CitiesPageViewStyled>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Города</span>
      </nav>
      <header className="cities-heading">
        <div>
          <span className="eyebrow">
            <MapPin size={14} aria-hidden="true" /> Хороший пар — ближе, чем
            кажется
          </span>
          <h1>
            В каком городе
            <br />
            будем <em>отдыхать?</em>
          </h1>
          <p>
            Знакомые места и новые открытия. Выберите город,
            <br className="desktop-break" /> а подходящую баню найдите в
            каталоге или вместе с ИИ.
          </p>
        </div>
        <aside className="ai-note">
          <span className="ai-icon">
            <Sparkles size={22} aria-hidden="true" />
          </span>
          <h2>Можно просто спросить</h2>
          <p>
            Расскажите, где хотите отдохнуть и какая баня вам по душе. ИИ поищет
            в каталоге и интернете.
          </p>
          <button
            type="button"
            value="Помоги подобрать баню. Сначала уточни, в каком городе или регионе я хочу отдохнуть."
            onClick={openChat}
          >
            Подобрать с ИИ <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </aside>
      </header>
      {featured.length > 0 && (
        <nav className="featured" aria-label="Быстрый выбор города">
          {featured.map((city, index) => (
            <Link key={city.id} href={city.uri}>
              <span className="city-number">0{index + 1}</span>
              <span>{city.name}</span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
      <section className="directory" aria-labelledby="directory-title">
        <div className="directory-heading">
          <div>
            <span className="section-kicker">От А до Я</span>
            <h2 id="directory-title">
              Все города <span>{cities.length}</span>
            </h2>
          </div>
          <div className="search">
            <Search size={20} aria-hidden="true" />
            <label className="sr-only" htmlFor="city-search">
              Поиск города
            </label>
            <input
              id="city-search"
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Найдите свой город"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                aria-label="Очистить поиск"
                onClick={clearSearch}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        <p className="search-status" role="status">
          {loading && !cities.length
            ? 'Загружаем города…'
            : error && !cities.length
              ? 'Не удалось загрузить города. Попробуйте обновить страницу или обратиться к ИИ.'
              : query
                ? `Найдено городов: ${filtered.length}`
                : 'Выберите букву или найдите город по названию'}
        </p>
        {groups.length > 0 && (
          <>
            <nav className="alphabet" aria-label="Алфавитный указатель">
              {groups.map(([letter]) => (
                <a key={letter} href={`#city-letter-${letter}`}>
                  {letter}
                </a>
              ))}
            </nav>
            <div className="city-groups">
              {groups.map(([letter, items]) => (
                <section
                  key={letter}
                  id={`city-letter-${letter}`}
                  className="letter-group"
                  aria-labelledby={`city-title-${letter}`}
                >
                  <h3 id={`city-title-${letter}`}>{letter}</h3>
                  <ul>
                    {items.map((city) => (
                      <li key={city.id}>
                        <Link href={city.uri}>
                          {city.name}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
        {!filtered.length && !loading && !error && (
          <div className="empty-state">
            <MapPin size={28} strokeWidth={1.4} aria-hidden="true" />
            <h3>
              {query
                ? 'Такой город пока не найден'
                : 'Скоро здесь появятся города'}
            </h3>
            <p>
              {query
                ? 'Проверьте название или поручите поиск ИИ — он может найти варианты за пределами каталога.'
                : 'А пока расскажите ИИ, где хотите отдохнуть. Он поможет с поиском в интернете.'}
            </p>
            <button
              className="ai-button"
              type="button"
              value={
                query.trim()
                  ? `Помоги найти баню. Город или регион: ${query.trim()}. Поищи в интернете, если в каталоге нет подходящих вариантов.`
                  : 'Помоги найти баню в интернете. Уточни город и пожелания.'
              }
              onClick={openChat}
            >
              Найти с ИИ <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
      <section className="cities-bottom">
        <div>
          <span className="section-kicker">Для отдыха нет границ</span>
          <h2>Вашего города ещё нет?</h2>
          <p>
            Наш ИИ-помощник ищет и за пределами каталога. Начните с места и
            пожеланий.
          </p>
        </div>
        <button
          type="button"
          className="ai-button"
          value="Моего города нет в каталоге. Помоги найти баню в интернете. Сначала уточни город и мои пожелания."
          onClick={openChat}
        >
          Поручить поиск ИИ <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </section>
    </CitiesPageViewStyled>
  )
}
