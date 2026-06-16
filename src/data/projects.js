// بيانات المشاريع لشركة الجهيني للتطوير العقاري (ثنائية اللغة)

import j290Cover from '../../images/Elgeheny development_/الجهيني للتطوير العقاري كامل المشاريع/الحي التاني j290/الوجهات_(1).jpg'

// تحميل جميع صور المشاريع تلقائياً من مجلد كل مشروع داخل images/projects/<folder>/
const imageModules = import.meta.glob(
  '../../images/projects/*/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
)

const galleries = {}
for (const [path, url] of Object.entries(imageModules)) {
  const match = path.match(/\/projects\/([^/]+)\//)
  if (!match) continue
  const key = match[1]
  if (!galleries[key]) galleries[key] = []
  galleries[key].push({ path, url })
}
for (const key of Object.keys(galleries)) {
  galleries[key] = galleries[key]
    .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }))
    .map((item) => item.url)
}

// معرض صور المشروع حسب اسم مجلده (الصورة الأولى = الغلاف)
const galleryFor = (folder) => galleries[folder] || []

export const projectCategories = [
  { id: 'all', name: { ar: 'كل المشاريع', en: 'All Projects' } },
  { id: 'hay-thani', name: { ar: 'الحي الثاني', en: 'Second District' } },
  { id: 'hay-thalith', name: { ar: 'الحي الثالث', en: 'Third District' } },
  { id: 'hay-khamis', name: { ar: 'الحي الخامس', en: 'Fifth District' } },
  { id: 'hay-takmili', name: { ar: 'الحي التكميلي', en: 'Supplementary District' } },
  { id: 'north-orchid', name: { ar: 'شمال الأوركيد', en: 'North Orchid' } },
]

const defaultFeatures = [
  { ar: 'تصميم معماري عصري', en: 'Modern architectural design' },
  { ar: 'تشطيبات عالية الجودة', en: 'High-quality finishes' },
  { ar: 'موقع متميز بالتجمع الخامس', en: 'Prime location in the Fifth Settlement' },
  { ar: 'واجهات أنيقة وإضاءة مميزة', en: 'Elegant facades and distinctive lighting' },
  { ar: 'جراج ومداخل منظمة', en: 'Organized garage and entrances' },
  { ar: 'قرب من الخدمات والمحاور', en: 'Close to services and main axes' },
]

const defaultPayment = [
  { label: { ar: 'مقدم تعاقد', en: 'Down payment' }, value: { ar: '10%', en: '10%' } },
  { label: { ar: 'فترة السداد', en: 'Payment period' }, value: { ar: 'حتى 8 سنوات', en: 'Up to 8 years' } },
  { label: { ar: 'التشطيب', en: 'Finishing' }, value: { ar: 'نصف تشطيب', en: 'Semi-finished' } },
]

export const defaultUnitTypes = {
  ar: 'أرضي بحديقة · متكرر · روف',
  en: 'Ground with garden · Repeated · Roof',
}

// مواصفات التسليم المعتمدة لشركة الجهيني (موحّدة لجميع المشاريع)
const defaultDeliverySpecs = [
  { ar: 'انتر كم', en: 'Intercom' },
  { ar: 'جراج خاص', en: 'Private garage' },
  { ar: 'أبواب مصفحة', en: 'Armored doors' },
  { ar: 'مصاعد مستوردة', en: 'Imported elevators' },
  { ar: 'نصف تشطيب أو تشطيب كامل', en: 'Semi or full finishing' },
  { ar: 'دش مركزي', en: 'Central satellite dish' },
  { ar: 'سباكة بمواصفات معتمدة', en: 'Plumbing to approved specs' },
  { ar: 'أسقف فلات سلاب', en: 'Flat-slab ceilings' },
  { ar: 'سلالم من أرقى أنواع الرخام', en: 'Stairs in finest marble' },
  { ar: 'مداخل من أجود أنواع الرخام', en: 'Entrances in finest marble' },
  { ar: 'عزل مائي وحراري للأسطح', en: 'Waterproof & thermal roof insulation' },
  { ar: 'تشطيب الواجهات بأفضل المواد', en: 'Facades finished with premium materials' },
  { ar: 'تأسيس كهرباء معتمد', en: 'Certified electrical setup' },
  { ar: 'تأسيس صرف وحوامل تكييف', en: 'Drainage & A/C mount setup' },
  { ar: 'قطاعات ألومنيوم عازلة للضوضاء والأتربة', en: 'Aluminum sections insulating noise & dust' },
]

// مميزات الحي الخامس (مشتركة بين مشاريع الحي الخامس)
const fifthDistrictHighlights = [
  {
    title: { ar: 'الموقع الاستراتيجي (قلب التجمع)', en: 'Strategic location (heart of the Settlement)' },
    desc: {
      ar: 'موقع ذهبي يتوسط أهم معالم القاهرة الجديدة: يحده شمالاً طريق السويس مباشرة (سهولة الوصول للعاصمة الإدارية والشروق)، وجنوباً محور محمد بن زايد الشمالي، وشرقاً ماونتن فيو iCity وهايد بارك، وغرباً منطقة النوادي الكبرى (بلاتينيوم، وادي دجلة، والنادي الأهلي).',
      en: "A golden location at the center of New Cairo's key landmarks: bordered north by Suez Road (easy access to the New Capital and El-Shorouk), south by the Mohamed Bin Zayed North axis, east by Mountain View iCity and Hyde Park, and west by the major clubs zone (Platinum, Wadi Degla, and Al-Ahly).",
    },
  },
  {
    title: { ar: 'القرب من الفيو زون (View Zone)', en: 'Close to the View Zone' },
    desc: {
      ar: 'يطل الحي الخامس مباشرة على أكبر منطقة خدمات وخضرة في بيت الوطن (View Zone) التي تضم حدائق ومراكز تجارية ومدارس، مما يمنح وحداته إطلالات مفتوحة ومناخًا نقيًا.',
      en: "The Fifth District overlooks Beit El-Watan's largest services and green area (the View Zone), with parks, commercial centers, and schools, giving its units open views and clean air.",
    },
  },
  {
    title: { ar: 'الكثافة السكانية المنخفضة', en: 'Low population density' },
    desc: {
      ar: 'تخطيط عمراني يعتمد على (أرضي + 3 أدوار مكررة) فقط، مما يقلل الزحام المروري ويوفر خصوصية وهدوءًا عاليًا للسكان.',
      en: 'An urban plan of only (ground + 3 repeated floors), reducing traffic and offering residents high privacy and quiet.',
    },
  },
  {
    title: { ar: 'بنية تحتية متطورة', en: 'Advanced infrastructure' },
    desc: {
      ar: 'بنية تحتية حديثة تشمل شبكات صرف صحي وكهرباء مستقلة، ومسارات ألياف ضوئية (Fiber Optics) لسرعة إنترنت عالية، وشوارع واسعة وتنسيق حضاري يمنع التكدس.',
      en: 'Modern infrastructure with independent sewage and electricity networks, fiber-optic routes for high internet speed, wide streets, and orderly planning that prevents congestion.',
    },
  },
  {
    title: { ar: 'قيمة استثمارية عالية', en: 'High investment value' },
    desc: {
      ar: 'الحي الخامس هو الأسرع في معدلات التنفيذ، وقربه من العاصمة الإدارية والنوادي يجعل الطلب عليه (سكنًا أو إيجارًا) في تزايد مستمر، مما يضمن عائدًا قويًا على الاستثمار.',
      en: 'The Fifth District has the fastest construction pace, and its proximity to the Capital and clubs keeps demand (for living or rent) rising, ensuring a strong return on investment.',
    },
  },
]

export const projects = [
  {
    id: 'j290',
    title: { ar: 'الجهيني J290 - الحي الثاني', en: 'El-Geheny J290 - Second District' },
    category: 'hay-thani',
    categoryName: { ar: 'بيت الوطن - الحي الثاني', en: 'Beit El-Watan - Second District' },
    location: { ar: 'بيت الوطن، الحي الثاني، التجمع الخامس', en: 'Beit El-Watan, Second District, Fifth Settlement' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: 'من 125 م²', en: 'From 125 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 90,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'قيد التسليم', en: 'Under delivery' },
    unitTypes: defaultUnitTypes,
    cover: j290Cover,
    gallery: [j290Cover, ...galleryFor('j290')],
    shortDescription: {
      ar: 'مشروع سكني فاخر في بيت الوطن بواجهات كلاسيكية أنيقة وإضاءة مميزة.',
      en: 'A luxury residential project in Beit El-Watan with elegant classic facades and distinctive lighting.',
    },
    description: {
      ar: 'عمارة سكنية متميزة في الحي الثاني ببيت الوطن (القطعة 290 ز)، تجمع بين الطابع الكلاسيكي الفاخر والتشطيبات الحديثة، في موقع حيوي قريب من الخدمات والمحاور الرئيسية بالتجمع الخامس.',
      en: 'A distinctive residential building in the Second District of Beit El-Watan (Plot 290-Z), combining a luxurious classic character with modern finishes, in a vibrant location close to services and main axes in the Fifth Settlement.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      intro: {
        ar: 'لوكيشن مميز جدًا بالحي الثاني، بالقرب من منطقة الخدمات والطرق الرئيسية والفرعية.',
        en: 'A prime location in the Second District, close to the services area and the main and secondary roads.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'طريق السويس', en: 'Suez Road' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة (أمامي)', en: 'Ground model – right facade (front)' },
        area: { ar: '125 م²', en: '125 m²' },
        extra: { ar: 'جاردن 70 م²', en: '70 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '6.5 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '4.10 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.80' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2.28 × 2.04' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يسار الواجهة (أمامي)', en: 'Ground model – left facade (front)' },
        area: { ar: '140 م²', en: '140 m²' },
        extra: { ar: 'جاردن 100 م²', en: '100 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '6.5 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '4.10 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.80' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.60 × 2' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.5 × 2' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 4.22' },
          { name: { ar: 'غرفة معيشة', en: 'Living room' }, dim: '3.22 × 3.20' },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – خلفي الواجهة', en: 'Ground model – rear facade' },
        area: { ar: '125 م²', en: '125 m²' },
        extra: { ar: 'جاردن 150 م²', en: '150 m² garden' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '6.10 × 5.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '2.5 × 3' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.80 × 2.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.40' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.82' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '170 م²', en: '170 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '9.5 × 7.82' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '3.80 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.5' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2.04 × 2.28' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.80 × 3.5' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.64 × 3.60' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 4.30' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 3.50' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – يسار الواجهة', en: 'Repeated model – left facade' },
        area: { ar: '187 م²', en: '187 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' }, dim: '10.43 × 7.82' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '3.80 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1 × 2.23' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '2 × 2.40' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.5 × 2.40' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.60 × 3.5' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.60 × 4.52' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 4.64' },
          { name: { ar: 'غرفة معيشة', en: 'Living room' }, dim: '3.12 × 3.22' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 4.30' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '1.38 × 3.50' },
        ],
      },
      {
        name: { ar: 'نموذج متكرر – خلفي الواجهة', en: 'Repeated model – rear facade' },
        area: { ar: '156 م²', en: '156 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' }, dim: '5.22 × 6.5' },
          { name: { ar: 'مطبخ', en: 'Kitchen' }, dim: '2.5 × 3' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.76 × 2.60' },
          { name: { ar: 'حمام', en: 'Bathroom' }, dim: '1.80 × 0.93' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.5 × 3.80' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '3.70 × 4.20' },
          { name: { ar: 'غرفة نوم', en: 'Bedroom' }, dim: '4.20 × 3.82' },
          { name: { ar: 'تراس', en: 'Terrace' }, dim: '4.20 × 1' },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف – أمامي يمين الواجهة', en: 'Fourth-floor roof – front right facade' },
        area: { ar: '165 م²', en: '165 m²' },
        extra: { ar: 'تراس 45 م²', en: '45 m² terrace' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'تراس مكشوف', en: 'Open terrace' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف', en: 'Fourth-floor roof' },
        area: { ar: '125 م²', en: '125 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفتين نوم', en: '2 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج رابع رووف – خلفي الواجهة', en: 'Fourth-floor roof – rear facade' },
        area: { ar: '120 م²', en: '120 m²' },
        extra: { ar: 'تراس 65 م²', en: '65 m² terrace' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: 'غرفتين نوم', en: '2 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
    ],
  },
  {
    id: 'm75',
    title: { ar: 'الجهيني M75 - الحي الثالث', en: 'El-Geheny M75 - Third District' },
    category: 'hay-thalith',
    categoryName: { ar: 'بيت الوطن - الحي الثالث', en: 'Beit El-Watan - Third District' },
    location: { ar: 'بيت الوطن، الحي الثالث، التجمع الخامس', en: 'Beit El-Watan, Third District, Fifth Settlement' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: 'من 225 م²', en: 'From 225 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 75,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'قيد التسليم', en: 'Under delivery' },
    unitTypes: defaultUnitTypes,
    cover: galleryFor('m75')[0],
    gallery: galleryFor('m75'),
    unitDetails: [
      {
        name: { ar: 'الوحدة الأولى', en: 'Unit 1' },
        area: { ar: '250 م²', en: '250 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { ar: 'ريسبشن 3 قطع', en: 'Reception (3 pieces)' },
          { ar: 'مطبخ', en: 'Kitchen' },
          { ar: 'ليفينج روم', en: 'Living room' },
          { ar: '3 حمامات', en: '3 bathrooms' },
          { ar: '3 غرف نوم', en: '3 bedrooms' },
          { ar: 'دريسنج روم', en: 'Dressing room' },
          { ar: 'تراس', en: 'Terrace' },
          { ar: 'جاردن 60 م²', en: 'Garden 60 m²' },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة', en: 'Ground-floor model – right facade' },
        area: { ar: '225 م²', en: '225 m²' },
        status: { ar: 'تحت الإنشاء', en: 'Under construction' },
        rooms: [
          { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' },
          { ar: 'مطبخ', en: 'Kitchen' },
          { ar: 'ليفينج روم', en: 'Living room' },
          { ar: 'حمامان', en: '2 bathrooms' },
          { ar: '3 غرف نوم', en: '3 bedrooms' },
          { ar: 'دريسنج روم', en: 'Dressing room' },
          { ar: 'حديقة خاصة', en: 'Private garden' },
        ],
      },
    ],
    shortDescription: {
      ar: 'وحدات سكنية بتصميم عصري ومساحات مدروسة في الحي الثالث ببيت الوطن.',
      en: 'Residential units with a modern design and well-studied spaces in the Third District of Beit El-Watan.',
    },
    description: {
      ar: 'مشروع سكني في الحي الثالث ببيت الوطن يقدم وحدات بمساحات متنوعة وتشطيبات راقية، بتصميم معماري يجمع بين الأناقة والعملية في موقع مميز.',
      en: 'A residential project in the Third District of Beit El-Watan offering units of various sizes with elegant finishes, with an architectural design combining elegance and practicality in a prime location.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
  },
  {
    id: 'e80',
    title: { ar: 'الجهيني E80 - الحي الخامس', en: 'El-Geheny E80 - Fifth District' },
    category: 'hay-khamis',
    categoryName: { ar: 'بيت الوطن - الحي الخامس', en: 'Beit El-Watan - Fifth District' },
    location: { ar: 'بيت الوطن، الحي الخامس، التجمع الخامس', en: 'Beit El-Watan, Fifth District, Fifth Settlement' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: '130 – 300 م²', en: '130 – 300 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: galleryFor('e80')[0],
    gallery: galleryFor('e80'),
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Fifth District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'عمارة سكنية بتصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن (القطعة E80)، بمساحات تبدأ من 170 م² وحتى دوبلكس 300 م²، في لوكيشن مميز جدًا الأقرب للخدمات والطرق الرئيسية، والاستلام فوري.',
      en: 'A residential building with smart, innovative European designs in the Fifth District of Beit El-Watan (Plot E80), with areas from 170 m² up to a 300 m² duplex, in a prime location closest to services and main roads, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      tagline: { ar: 'خامس نمرة من بالم هيلز', en: 'Fifth plot from Palm Hills' },
      intro: {
        ar: 'يُعد الحي الخامس من أرقى أحياء بيت الوطن ويُطلق عليه «حي القصور» أو «حي الفيلات» لانخفاض الكثافة السكانية وتميّز تصميمه المعماري. لوكيشن مميز جدًا، الأقرب للطرق الرئيسية والفرعية والخدمات.',
        en: 'The Fifth District is among the finest in Beit El-Watan — nicknamed the "Palaces" or "Villas" district for its low density and distinctive architecture. A prime location, closest to main and secondary roads and services.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: fifthDistrictHighlights,
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي – يمين', en: 'Ground model – right' },
        area: { ar: '170 م²', en: '170 m²' },
        extra: { ar: 'جاردن 80 م²', en: '80 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن قطعتين', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر', en: 'Repeated model' },
        area: { ar: '220 م²', en: '220 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج يمين بزمنت', en: 'Right basement model' },
        area: { ar: '130 م²', en: '130 m²' },
        extra: { ar: 'جاردن 80 م²', en: '80 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن', en: 'Reception' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمام', en: 'Bathroom' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج دوبلكس (بزمنت 130 م² + أرضي 170 م²)', en: 'Duplex model (basement 130 m² + ground 170 m²)' },
        area: { ar: '300 م²', en: '300 m²' },
        extra: { ar: 'جاردن 160 م²', en: '160 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (4) قطع', en: 'Reception (4 pieces)' } },
          { name: { ar: 'مطبخان', en: '2 kitchens' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '5 غرف نوم', en: '5 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
    ],
  },
  {
    id: 'm36',
    title: { ar: 'الجهيني M36 - الحي الخامس', en: 'El-Geheny M36 - Fifth District' },
    category: 'hay-khamis',
    categoryName: { ar: 'الحي الخامس', en: 'Fifth District' },
    location: { ar: 'الحي الخامس، التجمع الخامس، القاهرة الجديدة', en: 'Fifth District, Fifth Settlement, New Cairo' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: '190 – 220 م²', en: '190 – 220 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: galleryFor('m36')[0],
    gallery: galleryFor('m36'),
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Fifth District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'عمارة سكنية بتصميمات أوروبية ذكية ومبتكرة في الحي الخامس ببيت الوطن (القطعة M36)، بمساحات تبدأ من 190 م² وحتى 220 م²، في لوكيشن مميز جدًا الأقرب للفيو زون والخدمات والطرق الرئيسية، والاستلام فوري.',
      en: 'A residential building with smart, innovative European designs in the Fifth District of Beit El-Watan (Plot M36), with areas from 190 m² up to 220 m², in a prime location closest to the View Zone, services, and main roads, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      tagline: { ar: 'خامس نمرة من الفيو زون', en: 'Fifth plot from the View Zone' },
      intro: {
        ar: 'يُعد الحي الخامس من أرقى أحياء بيت الوطن ويُطلق عليه «حي القصور» أو «حي الفيلات» لانخفاض الكثافة السكانية وتميّز تصميمه المعماري. لوكيشن مميز جدًا، الأقرب للفيو زون والطرق الرئيسية والفرعية والمدارس والجامعات والنوادي.',
        en: 'The Fifth District is among the finest in Beit El-Watan — nicknamed the "Palaces" or "Villas" district for its low density and distinctive architecture. A prime location, closest to the View Zone, main and secondary roads, schools, universities, and clubs.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: fifthDistrictHighlights,
    },
    unitDetails: [
      {
        name: { ar: 'نموذج متكرر – يمين الواجهة', en: 'Repeated model – right facade' },
        area: { ar: '220 م²', en: '220 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: '3 حمامات', en: '3 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
      {
        name: { ar: 'نموذج أرضي – يمين الواجهة', en: 'Ground model – right facade' },
        area: { ar: '190 م²', en: '190 m²' },
        extra: { ar: 'جاردن 160 م²', en: '160 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
    ],
  },
  {
    id: 'a149',
    title: { ar: 'الجهيني A149 - الحي التكميلي', en: 'El-Geheny A149 - Supplementary District' },
    category: 'hay-takmili',
    categoryName: { ar: 'بيت الوطن - الحي التكميلي', en: 'Beit El-Watan - Supplementary District' },
    location: { ar: 'بيت الوطن، الحي التكميلي، التجمع الخامس', en: 'Beit El-Watan, Supplementary District, Fifth Settlement' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: '150 – 160 م²', en: '150 – 160 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 100,
    statusKey: 'delivered',
    deliveryStatus: { ar: 'استلام فوري', en: 'Immediate delivery' },
    unitTypes: defaultUnitTypes,
    cover: galleryFor('a149')[0],
    gallery: galleryFor('a149'),
    shortDescription: {
      ar: 'تصميمات أوروبية ذكية ومبتكرة في الحي التكميلي ببيت الوطن — استلام فوري.',
      en: 'Smart, innovative European designs in the Supplementary District of Beit El-Watan — immediate delivery.',
    },
    description: {
      ar: 'عمارة سكنية بتصميمات أوروبية ذكية ومبتكرة في الحي التكميلي (جنوب السويس) ببيت الوطن (القطعة A149)، بمساحات تبدأ من 150 م² وحتى 160 م²، في لوكيشن مميز جدًا الأقرب للطرق الرئيسية وشارع التسعين الشمالي، والاستلام فوري.',
      en: 'A residential building with smart, innovative European designs in the Supplementary District (South Suez) of Beit El-Watan (Plot A149), with areas from 150 m² up to 160 m², in a prime location closest to main roads and North 90th Street, with immediate delivery.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
    locationFeatures: {
      intro: {
        ar: 'لوكيشن مميز جدًا بالحي التكميلي (جنوب السويس)، الأقرب للطرق الرئيسية والفرعية وشارع التسعين الشمالي، بالقرب من الأحياء الرئيسية في بيت الوطن.',
        en: 'A prime location in the Supplementary District (South Suez), closest to main and secondary roads and North 90th Street, near the main districts of Beit El-Watan.',
      },
      points: [
        { ar: 'التسعين الشمالي', en: 'North 90th Street' },
        { ar: 'شارع النوادي', en: 'Clubs Street' },
        { ar: 'محور محمد بن زايد', en: 'Mohamed Bin Zayed Axis' },
        { ar: 'الطريق الدائري الأوسطي', en: 'Middle Ring Road' },
      ],
      highlights: [
        {
          title: { ar: 'الموقع المتميز', en: 'Prime location' },
          desc: {
            ar: 'يقع الحي التكميلي بالقرب من الأحياء الرئيسية في مشروع بيت الوطن مثل الحي الأول والثاني، وقريب من الطرق والمحاور الرئيسية مثل محور محمد بن زايد، مما يسهّل الوصول للعاصمة الإدارية الجديدة والقاهرة الكبرى.',
            en: 'The Supplementary District is close to the main districts of Beit El-Watan (such as the First and Second), and near major roads and axes like the Mohamed Bin Zayed axis, easing access to the New Administrative Capital and Greater Cairo.',
          },
        },
        {
          title: { ar: 'الهدوء والتنظيم', en: 'Calm and organization' },
          desc: {
            ar: 'يتميز الحي بتصميمه العصري وتنظيمه المتقن، مع شوارع واسعة ومساحات خضراء، وكثافة سكانية أقل نسبيًا مقارنة ببعض الأحياء الأخرى.',
            en: 'A modern, well-organized district with wide streets and green spaces, and a relatively lower population density than some other districts.',
          },
        },
        {
          title: { ar: 'القرب من الخدمات والمرافق', en: 'Close to services and facilities' },
          desc: {
            ar: 'قريب من مجموعة متنوعة من المرافق مثل المدارس الدولية والمستشفيات والمراكز التجارية، وبالقرب من مناطق ترفيهية كالنوادي الرياضية والمساحات المفتوحة.',
            en: 'Close to a variety of facilities such as international schools, hospitals, and commercial centers, and near recreational areas like sports clubs and open spaces.',
          },
        },
        {
          title: { ar: 'الأسعار التنافسية', en: 'Competitive prices' },
          desc: {
            ar: 'يعتبر الحي التكميلي من الخيارات الجيدة من حيث أسعار الأراضي والشقق مقارنةً ببعض المناطق الأخرى داخل المشروع، مما يجذب المستثمرين والمشترين.',
            en: 'The Supplementary District offers good value in land and apartment prices compared to some other areas within the project, attracting investors and buyers.',
          },
        },
        {
          title: { ar: 'البنية التحتية الحديثة', en: 'Modern infrastructure' },
          desc: {
            ar: 'تم تنفيذ البنية التحتية وفقًا لأحدث المواصفات، بما في ذلك شبكات المياه والكهرباء والصرف الصحي، وتوفر الخدمات الأساسية بشكل مريح للمقيمين.',
            en: 'Infrastructure built to the latest standards, including water, electricity, and sewage networks, providing essential services conveniently for residents.',
          },
        },
        {
          title: { ar: 'التنوع العقاري', en: 'Real-estate variety' },
          desc: {
            ar: 'يوفر الحي وحدات سكنية متنوعة بين الشقق والفيلات، مما يتيح خيارات متعددة تناسب احتياجات العائلات المختلفة.',
            en: 'The district offers diverse units between apartments and villas, providing multiple options to suit different families.',
          },
        },
        {
          title: { ar: 'الاستثمار المستقبلي', en: 'Future investment' },
          desc: {
            ar: 'فرصة استثمارية واعدة نظرًا للتطور المستمر في منطقة بيت الوطن وقرب العاصمة الإدارية الجديدة، والطلب المتزايد على السكن يرفع قيمة العقارات على المدى الطويل.',
            en: 'A promising investment given the continuous growth of Beit El-Watan and the proximity of the New Administrative Capital; rising housing demand increases property value over the long term.',
          },
        },
      ],
    },
    unitDetails: [
      {
        name: { ar: 'نموذج أرضي', en: 'Ground model' },
        area: { ar: '150 م²', en: '150 m²' },
        extra: { ar: 'جاردن 100 م²', en: '100 m² garden' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (2) قطع', en: 'Reception (2 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'حديقة خاصة', en: 'Private garden' } },
        ],
      },
      {
        name: { ar: 'نموذج متكرر', en: 'Repeated model' },
        area: { ar: '160 م²', en: '160 m²' },
        status: { ar: 'استلام فوري', en: 'Immediate delivery' },
        rooms: [
          { name: { ar: 'ريسبشن (3) قطع', en: 'Reception (3 pieces)' } },
          { name: { ar: 'مطبخ', en: 'Kitchen' } },
          { name: { ar: 'ليفينج روم', en: 'Living room' } },
          { name: { ar: 'حمامان', en: '2 bathrooms' } },
          { name: { ar: '3 غرف نوم', en: '3 bedrooms' } },
          { name: { ar: 'دريسنج روم', en: 'Dressing room' } },
          { name: { ar: 'تراس', en: 'Terrace' } },
        ],
      },
    ],
  },
  {
    id: 'north-orchid-179',
    title: { ar: 'الجهيني 179 - شمال الأوركيد', en: 'El-Geheny 179 - North Orchid' },
    category: 'north-orchid',
    categoryName: { ar: 'شمال الأوركيد', en: 'North Orchid' },
    location: { ar: 'شمال الأوركيد، التجمع الخامس، القاهرة الجديدة', en: 'North Orchid, Fifth Settlement, New Cairo' },
    type: { ar: 'عمارة سكنية', en: 'Residential building' },
    area: { ar: '179 م²', en: '179 m²' },
    units: { ar: 'وحدات متنوعة', en: 'Various units' },
    progress: 45,
    statusKey: 'in-progress',
    deliveryStatus: { ar: 'تحت الإنشاء', en: 'Under construction' },
    unitTypes: defaultUnitTypes,
    cover: galleryFor('orchid179')[0],
    gallery: galleryFor('orchid179'),
    shortDescription: {
      ar: 'مشروع سكني عصري في شمال الأوركيد بواجهات أنيقة وموقع واعد.',
      en: 'A modern residential project in North Orchid with elegant facades and a promising location.',
    },
    description: {
      ar: 'عمارة سكنية في منطقة شمال الأوركيد الواعدة بتصميم معماري حديث وواجهات مميزة، توفر نمط حياة عصري في واحدة من أكثر المناطق نمواً بالتجمع الخامس.',
      en: 'A residential building in the promising North Orchid area with a modern architectural design and distinctive facades, offering a modern lifestyle in one of the fastest-growing areas of the Fifth Settlement.',
    },
    features: defaultFeatures,
    payment: defaultPayment,
    deliverySpecs: defaultDeliverySpecs,
  },
]

export const getProjectById = (id) => projects.find((p) => p.id === id)
