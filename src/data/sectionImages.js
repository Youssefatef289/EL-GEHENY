import heroSlide1 from '../../images/slider - hero (1).jpeg'
import heroSlide2 from '../../images/slider - hero (2).jpeg'
import heroSlide3 from '../../images/slider - hero (3).jpeg'
import visionImage from '../../images/Our vision.jpeg'
import heritageImage from '../../images/hero-residential.png'
import companyBriefImage from '../../images/hero-residential.png'
import aboutGehenyImage from '../../images/من نحن.jpeg'
import servicesBg from '../../images/imgi_99_MMG-Re-Brand-Presentation_pages-to-jpg-0015-scaled-e1748253692652.jpg'

export const defaultSectionImages = {
  'hero.slide0': heroSlide1,
  'hero.slide1': heroSlide2,
  'hero.slide2': heroSlide3,
  'vision.main': visionImage,
  'heritage.background': heritageImage,
  'companyBrief.main': companyBriefImage,
  'aboutGeheny.main': aboutGehenyImage,
  'services.background': servicesBg,
}

export function resolveSectionImage(key, overrides = {}) {
  const custom = overrides?.[key]
  if (typeof custom === 'string' && custom.trim()) return custom.trim()
  return defaultSectionImages[key] || ''
}

export function resolveSectionImages(overrides = {}) {
  const keys = Object.keys(defaultSectionImages)
  return Object.fromEntries(keys.map((key) => [key, resolveSectionImage(key, overrides)]))
}

export function getHeroSlideImages(overrides = {}) {
  return [0, 1, 2].map((i) => resolveSectionImage(`hero.slide${i}`, overrides))
}
