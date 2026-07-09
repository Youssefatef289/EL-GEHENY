// بيانات الشركة الأساسية

import { getSiteCache } from '../lib/siteDataCache'
import { getData, STORAGE_KEYS } from '../admin/storage'
import { isApiConfigured } from '../lib/apiClient'

export const baseCompany = {
  name: { ar: 'الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development' },
  nameShort: { ar: 'الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development' },
  slogan: { ar: 'قوة الخبرة... برؤية جديدة', en: 'The power of experience... with a new vision' },
  since: 1990,
  phone: '01070312000',
  phoneIntl: '201070312000',
  email: 'info@elgeheny.com',
  address: {
    ar: '22 شارع شمال الشويفات، القاهرة الجديدة',
    en: '22 North El-Shweifat St., New Cairo',
  },
  whatsapp: '201070312000',
  mapUrl: 'https://maps.app.goo.gl/Y8D1P3tHM1mKXv2y9',
  mapEmbed: 'https://maps.google.com/maps?q=30.003849,31.404486&z=17&output=embed',
  social: {
    x: 'https://x.com/elgehenyd64877',
    tiktok: 'https://www.tiktok.com/@elgehenydevelopment',
    youtube: 'https://www.youtube.com/@el-gehenydevelopment',
    facebook: 'https://www.facebook.com/profile.php?id=61589951937782',
    instagram: 'https://www.instagram.com/elgehenydevelopment/',
    linkedin: 'https://www.linkedin.com/in/elgeheny-development-a09122357',
  },
}

export function getCompany() {
  if (isApiConfigured()) {
    const { company, social } = getSiteCache()
    let merged = company ? { ...baseCompany, ...company } : { ...baseCompany }
    if (social) {
      merged = { ...merged, social: { ...baseCompany.social, ...social } }
    }
    return merged
  }

  const stored = getData(STORAGE_KEYS.company, null)
  const socialStored = getData(STORAGE_KEYS.social, null)
  let merged = stored ? { ...baseCompany, ...stored } : { ...baseCompany }
  if (socialStored) {
    merged = { ...merged, social: { ...baseCompany.social, ...socialStored } }
  }
  return merged
}

export const company = new Proxy(
  {},
  {
    get(_, prop) {
      return getCompany()[prop]
    },
  },
)

export const baseStats = [
  { value: 35, suffix: { ar: '+', en: '+' }, label: { ar: 'سنة خبرة', en: 'Years of experience' }, prefix: '' },
  { value: 100, suffix: { ar: '+', en: '+' }, label: { ar: 'مشروع منجز', en: 'Completed projects' }, prefix: '' },
  { value: 0.5, suffix: { ar: ' مليار', en: 'B' }, label: { ar: 'جنيه استثمارات', en: 'EGP in investments' }, prefix: '', decimals: 1 },
  { value: 500, suffix: { ar: '+', en: '+' }, label: { ar: 'عميل واثق', en: 'Confident clients' }, prefix: '' },
]

export function getStats() {
  if (isApiConfigured()) {
    const cached = getSiteCache().stats
    return cached?.length ? cached : baseStats
  }
  return getData(STORAGE_KEYS.stats, baseStats)
}

export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/projects', key: 'projects' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]
