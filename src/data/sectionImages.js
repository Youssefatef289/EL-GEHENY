import heroSlide1 from '../../images/slider - hero (1).jpeg'
import heroSlide2 from '../../images/slider - hero (2).jpeg'
import heroSlide3 from '../../images/slider - hero (3).jpeg'
import visionImage from '../../images/Our vision.jpeg'
import heritageImage from '../../images/hero-residential.png'
import companyBriefImage from '../../images/hero-residential.png'
import aboutGehenyImage from '../../images/من نحن.jpeg'
import servicesBg from '../../images/imgi_99_MMG-Re-Brand-Presentation_pages-to-jpg-0015-scaled-e1748253692652.jpg'
import heroProjectImage from '../../images/hero project.webp'
import signatureImg from '../../images/التوقيع.png'
import { defaultPartners } from './partners'

export const defaultSectionImages = {
  'hero.slide0': heroSlide1,
  'hero.slide1': heroSlide2,
  'hero.slide2': heroSlide3,
  'companyBrief.main': companyBriefImage,
  'aboutGeheny.main': aboutGehenyImage,
  'vision.main': visionImage,
  'services.background': servicesBg,
  'heritage.background': heritageImage,
  'aboutTeam.signature': signatureImg,
  'pageHero.about': heroProjectImage,
  'pageHero.projects': heroProjectImage,
  'pageHero.contact': heroProjectImage,
  'pageHero.blog': heroProjectImage,
}

export const defaultSectionImageLists = {
  'partners.logos': defaultPartners.map((p) => p.src),
}

export const SECTION_IMAGE_LIST_KEYS = Object.keys(defaultSectionImageLists)

export function resolveSectionImage(key, overrides = {}) {
  const custom = overrides?.[key]
  if (typeof custom === 'string' && custom.trim()) return custom.trim()
  return defaultSectionImages[key] || ''
}

export function resolveSectionImageList(key, overrides = {}) {
  const custom = overrides?.[key]
  if (Array.isArray(custom) && custom.length > 0) {
    return custom.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
  }
  return defaultSectionImageLists[key] || []
}

export function resolveSectionImages(overrides = {}) {
  const keys = new Set([
    ...Object.keys(defaultSectionImages),
    ...Object.keys(overrides || {}),
  ])
  return Object.fromEntries(
    [...keys]
      .filter((key) => !SECTION_IMAGE_LIST_KEYS.includes(key))
      .map((key) => [key, resolveSectionImage(key, overrides)]),
  )
}

export function getHeroSlideImages(overrides = {}) {
  return [0, 1, 2].map((i) => resolveSectionImage(`hero.slide${i}`, overrides))
}
