// مقالات المدونة العقارية لشركة الجهيني للتطوير العقاري (ثنائية اللغة)

import { getSiteCache } from '../lib/siteDataCache'
import { getData, STORAGE_KEYS } from '../admin/storage'
import { isSupabaseConfigured } from '../lib/supabase'

export const baseBlogPosts = [
  {
    id: 'beit-elwatan-investment',
    title: {
      ar: 'لماذا يعد بيت الوطن فرصة استثمارية قوية؟',
      en: 'Why is Beit El-Watan a strong investment opportunity?',
    },
    category: { ar: 'استثمار عقاري', en: 'Real Estate Investment' },
    date: '2025-12-15',
    readTime: { ar: '6 دقائق', en: '6 min read' },
    author: { ar: 'فريق الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development Team' },
    cover:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ar: 'يتمتع بيت الوطن بموقع استراتيجي وبنية تحتية متطورة تجعله من أقوى الفرص الاستثمارية في القاهرة الجديدة. تعرف على أهم الأسباب.',
      en: 'Beit El-Watan enjoys a strategic location and advanced infrastructure that make it one of the strongest investment opportunities in New Cairo. Learn the key reasons.',
    },
    content: {
      ar: [
        'يعتبر بيت الوطن من أبرز المناطق السكنية في التجمع الخامس، حيث يجمع بين الموقع المتميز والبنية التحتية المتكاملة، مما يجعله وجهة مثالية للاستثمار العقاري طويل الأجل.',
        'تتميز المنطقة بقربها من المحاور الرئيسية مثل الطريق الدائري والمحور الأوسط، بالإضافة إلى قربها من الجامعات والمدارس الدولية والمراكز التجارية الكبرى.',
        'الطلب المستمر على الوحدات السكنية في بيت الوطن يضمن ارتفاعاً مطرداً في القيمة السوقية، مما يحقق عوائد استثمارية مجزية سواء عبر البيع أو التأجير.',
        'مع مشاريع الجهيني للتطوير العقاري في بيت الوطن، يحصل المستثمر على جودة بناء عالية وتشطيبات راقية وأنظمة سداد مرنة تناسب مختلف الفئات.',
      ],
      en: [
        'Beit El-Watan is one of the most prominent residential areas in the Fifth Settlement, combining a prime location with integrated infrastructure, making it an ideal destination for long-term real estate investment.',
        'The area is distinguished by its proximity to main axes such as the Ring Road and the Middle Axis, in addition to its closeness to universities, international schools, and major shopping centers.',
        'The continuous demand for residential units in Beit El-Watan ensures a steady rise in market value, achieving rewarding investment returns whether through sale or rent.',
        'With El-Geheny Real Estate projects in Beit El-Watan, investors get high build quality, elegant finishes, and flexible payment plans that suit various segments.',
      ],
    },
  },
  {
    id: 'choose-investment-property',
    title: {
      ar: 'كيف تختار العقار المناسب للاستثمار؟',
      en: 'How to choose the right property for investment?',
    },
    category: { ar: 'دليل المستثمر', en: 'Investor Guide' },
    date: '2025-11-28',
    readTime: { ar: '7 دقائق', en: '7 min read' },
    author: { ar: 'فريق الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development Team' },
    cover:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ar: 'اختيار العقار الاستثماري الصحيح يتطلب دراسة عدة عوامل أساسية. دليل عملي يساعدك على اتخاذ قرار استثماري ذكي.',
      en: 'Choosing the right investment property requires studying several key factors. A practical guide to help you make a smart investment decision.',
    },
    content: {
      ar: [
        'الاستثمار العقاري قرار مهم يتطلب دراسة متأنية لعدة عوامل تضمن تحقيق أعلى عائد ممكن وتقليل المخاطر.',
        'العامل الأول والأهم هو الموقع؛ فالعقار في منطقة واعدة قريبة من الخدمات والمحاور يحقق نمواً أسرع في القيمة. اختر دائماً المناطق ذات خطط التطوير المستقبلية.',
        'العامل الثاني هو سمعة المطور العقاري وسجله السابق، فالتعامل مع شركة موثوقة مثل الجهيني للتطوير العقاري بخبرة تتجاوز 35 عاماً يضمن جودة التنفيذ والالتزام بمواعيد التسليم.',
        'كما يجب دراسة أنظمة السداد المتاحة، وحساب العائد المتوقع من التأجير أو إعادة البيع، والتأكد من اكتمال أوراق العقار القانونية قبل الشراء.',
      ],
      en: [
        'Real estate investment is an important decision that requires careful study of several factors to ensure the highest possible return and minimize risks.',
        'The first and most important factor is location; a property in a promising area close to services and axes achieves faster value growth. Always choose areas with future development plans.',
        'The second factor is the developer’s reputation and track record. Dealing with a trusted company like El-Geheny Real Estate Development, with over 35 years of experience, guarantees execution quality and commitment to delivery dates.',
        'You should also study the available payment plans, calculate the expected return from renting or reselling, and ensure the property’s legal documents are complete before buying.',
      ],
    },
  },
  {
    id: 'future-real-estate-new-cairo',
    title: {
      ar: 'مستقبل الاستثمار العقاري في القاهرة الجديدة',
      en: 'The future of real estate investment in New Cairo',
    },
    category: { ar: 'تحليل السوق', en: 'Market Analysis' },
    date: '2025-11-10',
    readTime: { ar: '8 دقائق', en: '8 min read' },
    author: { ar: 'فريق الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development Team' },
    cover:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ar: 'تشهد القاهرة الجديدة نمواً عمرانياً متسارعاً يعيد رسم خريطة الاستثمار العقاري في مصر. نظرة على المستقبل الواعد.',
      en: 'New Cairo is witnessing rapid urban growth that is redrawing the real estate investment map in Egypt. A look at the promising future.',
    },
    content: {
      ar: [
        'تُعد القاهرة الجديدة من أسرع المناطق نمواً في مصر، حيث تتحول إلى مركز حضري متكامل يجمع بين السكن والأعمال والترفيه.',
        'مع توسع شبكة الطرق والمحاور الجديدة وقرب العاصمة الإدارية، ترتفع جاذبية القاهرة الجديدة كوجهة استثمارية وسكنية على حد سواء.',
        'تتجه السوق نحو المشاريع المتكاملة التي توفر نمط حياة شامل، وهو ما تتبناه الجهيني للتطوير العقاري في مشاريعها الجديدة بشمال الأوركيد والأحياء المختلفة.',
        'الخبراء يتوقعون استمرار ارتفاع أسعار العقارات في المنطقة خلال السنوات القادمة، مما يجعل الاستثمار الآن قراراً ذكياً للاستفادة من النمو المستقبلي.',
      ],
      en: [
        'New Cairo is one of the fastest-growing areas in Egypt, transforming into an integrated urban center that combines housing, business, and entertainment.',
        'With the expansion of the road network and new axes and the proximity of the New Administrative Capital, New Cairo’s appeal rises as both an investment and residential destination.',
        'The market is heading toward integrated projects that provide a comprehensive lifestyle, which El-Geheny Real Estate adopts in its new projects in North Orchid and the various districts.',
        'Experts expect property prices in the area to keep rising over the coming years, making investing now a smart decision to benefit from future growth.',
      ],
    },
  },
  {
    id: 'factors-increase-property-value',
    title: {
      ar: 'أهم العوامل التي ترفع قيمة العقار',
      en: 'The key factors that raise a property’s value',
    },
    category: { ar: 'دليل المستثمر', en: 'Investor Guide' },
    date: '2025-10-22',
    readTime: { ar: '5 دقائق', en: '5 min read' },
    author: { ar: 'فريق الجهيني للتطوير العقاري', en: 'El-Geheny Real Estate Development Team' },
    cover:
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ar: 'هناك عوامل محددة تساهم في رفع القيمة السوقية للعقار بمرور الوقت. تعرف على أبرزها لتحقيق أفضل عائد.',
      en: 'There are specific factors that help raise a property’s market value over time. Learn the most important ones to achieve the best return.',
    },
    content: {
      ar: [
        'قيمة العقار ليست ثابتة، بل تتأثر بمجموعة من العوامل التي يمكن للمستثمر الذكي الاستفادة منها لتعظيم العائد.',
        'الموقع يبقى العامل الأقوى؛ فالقرب من الخدمات والمحاور والمناطق الحيوية يرفع القيمة باستمرار. كذلك تطور البنية التحتية المحيطة يضيف قيمة كبيرة.',
        'جودة البناء والتشطيبات وحالة الصيانة تلعب دوراً مهماً، إلى جانب التصميم المعماري العصري الذي يجذب المشترين والمستأجرين.',
        'وجود مرافق وخدمات متكاملة مثل المساحات الخضراء والأمن والمناطق الترفيهية يضيف قيمة نوعية للعقار ويميزه في السوق.',
      ],
      en: [
        'A property’s value is not fixed; it is affected by a set of factors that a smart investor can leverage to maximize returns.',
        'Location remains the strongest factor; proximity to services, axes, and vibrant areas continuously raises value. The development of surrounding infrastructure also adds significant value.',
        'Build quality, finishes, and maintenance condition play an important role, along with modern architectural design that attracts buyers and tenants.',
        'The presence of integrated facilities and services such as green spaces, security, and recreational areas adds qualitative value to the property and distinguishes it in the market.',
      ],
    },
  },
]

export function getBlogPosts() {
  if (isSupabaseConfigured()) {
    const cached = getSiteCache().blog
    if (Array.isArray(cached) && cached.length > 0) return cached
    return baseBlogPosts
  }
  const stored = getData(STORAGE_KEYS.blog, null)
  if (Array.isArray(stored) && stored.length > 0) return stored
  return baseBlogPosts
}

export const blogPosts = baseBlogPosts
export { baseBlogPosts as defaultPosts }

export const getPostById = (id) => getBlogPosts().find((p) => p.id === id)
