// بيانات الشركة الأساسية

export const company = {
  name: { ar: 'الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development' },
  nameShort: { ar: 'الجهيني', en: 'El-Geheny' },
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
  mapEmbed:
    'https://www.google.com/maps?q=%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B5%20%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9&output=embed',
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
  { to: '/about', key: 'about' },
  { to: '/projects', key: 'projects' },
  { to: '/blog', key: 'blog' },
  { to: '/contact', key: 'contact' },
]
