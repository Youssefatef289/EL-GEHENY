import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n'

import heroSlide1 from '../../images/slider - hero (1).jpeg'
import heroSlide2 from '../../images/slider - hero (2).jpeg'
import heroSlide3 from '../../images/slider - hero (3).jpeg'

const SLIDE_IMAGES = [heroSlide1, heroSlide2, heroSlide3]
const AUTO_PLAY_MS = 5500

function SlideContent({ slide, animate, reduceMotion }) {
  const maskClass = animate && !reduceMotion ? 'hero-slide-mask' : ''

  return (
    <div className={`hero-slide-content ${maskClass}`}>
      <div className="mask">
        <p className="hero-slide-eyebrow">{slide.eyebrow}</p>
      </div>

      <div className="mask">
        <h1 className="hero-slide-title">{slide.title}</h1>
      </div>

      <div className="hero-slide-divider" aria-hidden="true" />

      <div className="mask">
        <p className="hero-slide-caption">{slide.caption}</p>
        <div className="hero-slide-actions">
          <Link to="/projects" className="btn-primary">
            {slide.btnProjects}
            <ArrowIcon />
          </Link>
          <Link to="/contact" className="btn-outline">
            {slide.btnContact}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { t, lang } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const [animateKey, setAnimateKey] = useState(1)
  const timerRef = useRef(null)

  const slides = t('hero.slides').map((slide, index) => ({
    ...slide,
    image: SLIDE_IMAGES[index],
    btnProjects: t('hero.btnProjects'),
    btnContact: t('hero.btnContact'),
  }))

  const goToSlide = useCallback(
    (index) => {
      setActiveIndex((index + slides.length) % slides.length)
      setAnimateKey((key) => key + 1)
    },
    [slides.length],
  )

  const scheduleNext = useCallback(() => {
    if (reduceMotion) return undefined

    timerRef.current = window.setTimeout(() => {
      goToSlide(activeIndex + 1)
    }, AUTO_PLAY_MS)

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [activeIndex, goToSlide, reduceMotion])

  useEffect(() => {
    return scheduleNext()
  }, [scheduleNext])

  return (
    <section className="hero-slider relative isolate flex h-[100svh] min-h-[100svh] flex-col overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex

        return (
          <div
            key={slide.image}
            className={`hero-slider-cell absolute inset-0 transition-opacity duration-1000 ease-out ${
              isActive ? 'z-[1] opacity-100' : 'z-0 opacity-0'
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt=""
              className={`h-full w-full object-cover ${isActive && !reduceMotion ? 'hero-slider-kenburns' : ''}`}
            />
            <div className="hero-slider-overlay" aria-hidden="true" />
          </div>
        )
      })}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-44 bg-gradient-to-b from-ink/75 to-transparent" />

      <div className="container-x relative z-[3] flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-[5.25rem] text-center sm:pb-24 sm:pt-[5.75rem] lg:pt-[6.5rem] xl:pt-[7rem] -translate-y-3 sm:-translate-y-4">
        <div className="relative w-full max-w-4xl">
          {slides.map((slide, index) =>
            index === activeIndex ? (
              <SlideContent
                key={`${index}-${animateKey}`}
                slide={slide}
                animate={!reduceMotion && animateKey > 0}
                reduceMotion={reduceMotion}
              />
            ) : null,
          )}
        </div>
      </div>

      <div className="hero-slider-dots" role="tablist" aria-label={lang === 'ar' ? 'شرائح الهيرو' : 'Hero slides'}>
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`${lang === 'ar' ? 'الشريحة' : 'Slide'} ${index + 1}`}
            className={`hero-slider-dot ${index === activeIndex ? 'is-selected' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
