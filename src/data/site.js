// بيانات الشركة الأساسية

export const company = {
  name: 'الجهيني للتطوير العقاري',
  nameShort: 'الجهيني',
  slogan: 'قوة الخبرة... برؤية جديدة',
  since: 1990,
  phone: '01070312000',
  phoneIntl: '201070312000',
  email: 'info@elgeheny.com',
  address: '22 شارع شمال الشويفات، التجمع الخامس، القاهرة الجديدة',
  whatsapp: '201070312000',
  mapEmbed:
    'https://www.google.com/maps?q=%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B3%20%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9&output=embed',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
}

export const stats = [
  { value: 35, suffix: '+', label: 'سنة خبرة', prefix: '' },
  { value: 100, suffix: '+', label: 'مشروع منجز', prefix: '' },
  { value: 0.5, suffix: ' مليار', label: 'جنيه استثمارات', prefix: '', decimals: 1 },
  { value: 500, suffix: '+', label: 'عميل واثق', prefix: '' },
]

export const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/projects', label: 'المشاريع' },
  { to: '/blog', label: 'المدونة' },
  { to: '/contact', label: 'تواصل معنا' },
]
