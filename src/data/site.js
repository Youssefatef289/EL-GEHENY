// بيانات الشركة الأساسية

export const company = {
  name: { ar: 'الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development' },
  nameShort: { ar: 'الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development' },
  slogan: { ar: 'قوة الخبرة... برؤية جديدة', en: 'The power of experience... with a new vision' },
  since: 1990,
  phone: '01070312000',
  phoneIntl: '201070312000',
  email: 'info@elgeheny.com',
  address: {
    ar: '22 شارع شمال الشويفات، التجمع الخامس، القاهرة الجديدة',
    en: '22 North El-Shweifat St., Fifth Settlement, New Cairo',
  },
  whatsapp: '201070312000',
  mapEmbed: 'https://maps.google.com/maps?q=30.0131,31.4961&z=17&output=embed',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
}

export const stats = [
  { value: 35, suffix: { ar: '+', en: '+' }, label: { ar: 'سنة خبرة', en: 'Years of experience' }, prefix: '' },
  { value: 100, suffix: { ar: '+', en: '+' }, label: { ar: 'مشروع منجز', en: 'Completed projects' }, prefix: '' },
  { value: 0.5, suffix: { ar: ' مليار', en: 'B' }, label: { ar: 'جنيه استثمارات', en: 'EGP in investments' }, prefix: '', decimals: 1 },
  { value: 500, suffix: { ar: '+', en: '+' }, label: { ar: 'عميل واثق', en: 'Confident clients' }, prefix: '' },
]

export const navLinks = [
  { to: '/', key: 'home' },
  { to: '/projects', key: 'projects' },
  { to: '/about', key: 'about' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]
