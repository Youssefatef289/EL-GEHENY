import iconDeveloper from '../../images/imgi_41_developer.png'
import iconHook from '../../images/imgi_45_hook-3.png'
import iconShelf from '../../images/imgi_37_shelf.png'
import { getSiteCache } from '../lib/siteDataCache'
import { getData, STORAGE_KEYS } from '../admin/storage'
import { isApiConfigured } from '../lib/apiClient'

export const baseServices = [
  {
    id: 'development',
    icon: iconDeveloper,
    title: { ar: 'التطوير العقاري', en: 'Real Estate Development' },
    description: {
      ar: 'نسعى لتقديم مشروعات عقارية عالية الجودة تلبي تطلعات عملائنا، مع التركيز على الأمان والثقة في كل خطوة من خطوات التطوير.',
      en: 'We strive to deliver high-quality real estate projects that meet our clients’ aspirations, with a focus on security and trust at every stage of development.',
    },
  },
  {
    id: 'contracting',
    icon: iconHook,
    title: { ar: 'المقاولات والإنشاءات', en: 'Contracting & Construction' },
    description: {
      ar: 'نلتزم في إنجاز مشروعاتنا بأعلى معايير الجودة والكفاءة، مع الالتزام بالمواعيد الزمنية والتكلفة المتفق عليها.',
      en: 'We commit to completing our projects to the highest standards of quality and efficiency, while honoring agreed timelines and budgets.',
    },
  },
  {
    id: 'finishing',
    icon: iconShelf,
    title: { ar: 'التشطيبات', en: 'Finishing & Interiors' },
    description: {
      ar: 'نقدم أعمال تشطيبات عالية الجودة تضيف لمسة فاخرة للمشروعات، لضمان تجربة سكنية راقية تلبي أعلى توقعات عملائنا.',
      en: 'We provide high-quality finishing works that add a luxurious touch to every project, ensuring a refined living experience that exceeds expectations.',
    },
  },
]

export function getServices() {
  if (isApiConfigured()) {
    const cached = getSiteCache().services
    if (Array.isArray(cached) && cached.length > 0) {
      return cached.map((service) => {
        const base = baseServices.find((s) => s.id === service.id)
        return { ...base, ...service, icon: base?.icon ?? service.icon }
      })
    }
    return baseServices
  }

  const stored = getData(STORAGE_KEYS.services, null)
  if (Array.isArray(stored) && stored.length > 0) {
    return stored.map((service) => {
      const base = baseServices.find((s) => s.id === service.id)
      return { ...base, ...service, icon: base?.icon ?? service.icon }
    })
  }
  return baseServices
}
