export const SECTION_CONFIG = [
  {
    id: 'hero',
    label: 'Hero',
    preview: '/',
    fields: [
      ...[0, 1, 2].flatMap((i) => ([
        { key: `hero.slides.${i}.eyebrow`, label: `سلايد ${i + 1} — eyebrow`, bilingual: true },
        { key: `hero.slides.${i}.title`, label: `سلايد ${i + 1} — عنوان`, bilingual: true },
        { key: `hero.slides.${i}.caption`, label: `سلايد ${i + 1} — وصف`, bilingual: true },
      ])),
      { key: 'hero.btnProjects', label: 'زر المشاريع', bilingual: false },
      { key: 'hero.btnContact', label: 'زر التواصل', bilingual: false },
    ],
    images: [
      { key: 'hero.slide0', label: 'صورة السلايد 1' },
      { key: 'hero.slide1', label: 'صورة السلايد 2' },
      { key: 'hero.slide2', label: 'صورة السلايد 3' },
    ],
  },
  {
    id: 'companyBrief',
    label: 'Company Brief',
    preview: '/#company-brief',
    fields: [
      { key: 'companyBrief.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'companyBrief.headline', label: 'العنوان', bilingual: false },
      { key: 'companyBrief.description', label: 'الوصف', bilingual: false },
      { key: 'companyBrief.highlight', label: 'نقطة مميزة', bilingual: false },
    ],
    images: [{ key: 'companyBrief.main', label: 'صورة القسم' }],
  },
  {
    id: 'aboutGeheny',
    label: 'About Geheny',
    preview: '/',
    fields: [],
    images: [{ key: 'aboutGeheny.main', label: 'صورة القسم' }],
  },
  {
    id: 'stats',
    label: 'Stats',
    preview: '/',
    fields: [
      { key: 'stats.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'stats.p1', label: 'الفقرة 1', bilingual: false },
      { key: 'stats.p2', label: 'الفقرة 2', bilingual: false },
    ],
    images: [],
    imagesNote: 'هذا القسم يعرض الإحصائيات فقط بدون صورة خلفية.',
  },
  {
    id: 'vision',
    label: 'Vision',
    preview: '/#vision',
    fields: [
      { key: 'vision.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'vision.titleA', label: 'العنوان A', bilingual: false },
      { key: 'vision.titleB', label: 'العنوان B', bilingual: false },
      { key: 'vision.paragraph', label: 'الفقرة', bilingual: false },
      { key: 'vision.cta', label: 'زر CTA', bilingual: false },
    ],
    images: [{ key: 'vision.main', label: 'صورة القسم' }],
  },
  {
    id: 'services',
    label: 'Services',
    preview: '/',
    fields: [],
    images: [{ key: 'services.background', label: 'صورة الخلفية' }],
  },
  {
    id: 'heritage',
    label: 'Heritage',
    preview: '/about',
    fields: [
      { key: 'heritage.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'heritage.title', label: 'العنوان', bilingual: false },
      { key: 'heritage.description', label: 'الوصف', bilingual: false },
      { key: 'heritage.cta', label: 'زر CTA', bilingual: false },
    ],
    images: [{ key: 'heritage.background', label: 'صورة الخلفية' }],
  },
  {
    id: 'featured',
    label: 'Featured',
    preview: '/',
    fields: [
      { key: 'featured.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'featured.title', label: 'العنوان', bilingual: false },
      { key: 'featured.description', label: 'الوصف', bilingual: false },
    ],
    images: [],
    imagesNote: 'صور هذا القسم تُدار من قسم المشاريع.',
  },
  {
    id: 'whyUs',
    label: 'Why Us',
    preview: '/',
    fields: [
      { key: 'whyUs.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'whyUs.title', label: 'العنوان', bilingual: false },
      { key: 'whyUs.description', label: 'الوصف', bilingual: false },
    ],
    images: [],
    imagesNote: 'هذا القسم نصي فقط.',
  },
  {
    id: 'cta',
    label: 'CTA',
    preview: '/about',
    fields: [
      { key: 'cta.eyebrow', label: 'Eyebrow', bilingual: false },
      { key: 'cta.titleA', label: 'العنوان A', bilingual: false },
      { key: 'cta.titleB', label: 'العنوان B', bilingual: false },
      { key: 'cta.paragraph', label: 'الفقرة', bilingual: false },
      { key: 'cta.contact', label: 'زر التواصل', bilingual: false },
    ],
    images: [],
    imagesNote: 'هذا القسم نصي فقط.',
  },
]

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

function setByPath(obj, path, lang, value) {
  const keys = path.split('.')
  const out = { ...obj }
  let cursor = out
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    const nextKey = keys[i + 1]
    const nextVal = cursor[key]
    cursor[key] = Number.isInteger(Number(nextKey))
      ? [...(Array.isArray(nextVal) ? nextVal : [])]
      : { ...(nextVal || {}) }
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return out
}

export { getByPath, setByPath }
