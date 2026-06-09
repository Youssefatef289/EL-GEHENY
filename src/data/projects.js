// بيانات المشاريع لشركة الجهيني للتطوير العقاري
// الصور تستخدم Unsplash كصور توضيحية يمكن استبدالها بصور المشاريع الفعلية

export const projectCategories = [
  { id: 'all', name: 'كل المشاريع' },
  { id: 'beit-elwatan', name: 'بيت الوطن' },
  { id: 'hay-awal', name: 'الحي الأول' },
  { id: 'hay-thani', name: 'الحي الثاني' },
  { id: 'hay-thalith', name: 'الحي الثالث' },
  { id: 'hay-khamis', name: 'الحي الخامس' },
  { id: 'hay-takmili', name: 'الحي التكميلي' },
  { id: 'north-orchid', name: 'شمال الأوركيد' },
]

export const projects = [
  {
    id: 'beit-elwatan-villa-01',
    title: 'فيلا الجهيني بيت الوطن A1',
    category: 'beit-elwatan',
    categoryName: 'بيت الوطن',
    location: 'بيت الوطن، التجمع الخامس، القاهرة الجديدة',
    type: 'فيلا مستقلة',
    area: '450 م²',
    units: '12 وحدة',
    progress: 85,
    status: 'قيد التنفيذ',
    deliveryYear: '2026',
    cover:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'فيلات فاخرة بتصميم عصري في قلب بيت الوطن مع مساحات خضراء واسعة وتشطيبات راقية.',
    description:
      'مشروع سكني متكامل يقدم فيلات مستقلة بتصميمات معمارية حديثة تجمع بين الفخامة والراحة. يتميز المشروع بموقع استراتيجي في بيت الوطن مع قربه من المحاور الرئيسية والخدمات المتكاملة.',
    features: [
      'تصميم معماري عصري فاخر',
      'مساحات خضراء وحدائق خاصة',
      'تشطيبات سوبر لوكس',
      'نظام أمن وحراسة 24 ساعة',
      'قرب من المدارس والخدمات',
      'جراج خاص لكل وحدة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '10%' },
      { label: 'فترة السداد', value: 'حتى 8 سنوات' },
      { label: 'الاستلام', value: 'نصف تشطيب / كامل' },
    ],
  },
  {
    id: 'hay-awal-residence',
    title: 'الجهيني ريزيدنس الحي الأول',
    category: 'hay-awal',
    categoryName: 'الحي الأول',
    location: 'الحي الأول، التجمع الخامس، القاهرة الجديدة',
    type: 'عمارات سكنية',
    area: '180 م²',
    units: '40 وحدة',
    progress: 100,
    status: 'تم التسليم',
    deliveryYear: '2023',
    cover:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'وحدات سكنية متنوعة المساحات بتصميم أنيق في موقع حيوي بالحي الأول.',
    description:
      'مشروع سكني مكتمل التسليم يضم وحدات بمساحات متنوعة تناسب جميع الاحتياجات، بتشطيبات عالية الجودة وموقع متميز يطل على الخدمات الرئيسية للحي الأول.',
    features: [
      'موقع حيوي قريب من الخدمات',
      'تشطيبات كاملة عالية الجودة',
      'مساحات متنوعة',
      'مدخل رئيسي فخم',
      'أسانسيرات حديثة',
      'مواقف سيارات منظمة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '15%' },
      { label: 'فترة السداد', value: 'حتى 6 سنوات' },
      { label: 'الاستلام', value: 'فوري' },
    ],
  },
  {
    id: 'hay-thani-towers',
    title: 'أبراج الجهيني الحي الثاني',
    category: 'hay-thani',
    categoryName: 'الحي الثاني',
    location: 'الحي الثاني، التجمع الخامس، القاهرة الجديدة',
    type: 'أبراج سكنية',
    area: '210 م²',
    units: '60 وحدة',
    progress: 70,
    status: 'قيد التنفيذ',
    deliveryYear: '2026',
    cover:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'أبراج سكنية بإطلالات بانورامية وتصميم معماري مميز في الحي الثاني.',
    description:
      'أبراج سكنية حديثة توفر إطلالات بانورامية رائعة مع مرافق متكاملة تشمل مناطق ترفيهية ومساحات مشتركة، في واحد من أرقى أحياء التجمع الخامس.',
    features: [
      'إطلالات بانورامية مميزة',
      'مرافق ترفيهية متكاملة',
      'لوبي استقبال فاخر',
      'نظام إدارة مباني ذكي',
      'مولد كهرباء احتياطي',
      'كاميرات مراقبة شاملة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '10%' },
      { label: 'فترة السداد', value: 'حتى 7 سنوات' },
      { label: 'الاستلام', value: 'نصف تشطيب' },
    ],
  },
  {
    id: 'hay-thalith-park',
    title: 'الجهيني بارك الحي الثالث',
    category: 'hay-thalith',
    categoryName: 'الحي الثالث',
    location: 'الحي الثالث، التجمع الخامس، القاهرة الجديدة',
    type: 'كمبوند سكني',
    area: '160 م²',
    units: '35 وحدة',
    progress: 55,
    status: 'قيد التنفيذ',
    deliveryYear: '2027',
    cover:
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'كمبوند سكني محاط بالمساحات الخضراء بتصميم يجمع بين الخصوصية والرفاهية.',
    description:
      'كمبوند سكني متكامل الخدمات يحيط به اللاندسكيب الأخضر، مصمم ليوفر بيئة هادئة وآمنة للعائلات مع مساحات مفتوحة وممرات للمشي.',
    features: [
      'مساحات خضراء واسعة',
      'ممرات مشي ومناطق ألعاب',
      'خصوصية تامة للوحدات',
      'بوابات إلكترونية',
      'منطقة تجارية داخلية',
      'تصميم موفر للطاقة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '5%' },
      { label: 'فترة السداد', value: 'حتى 9 سنوات' },
      { label: 'الاستلام', value: 'نصف تشطيب' },
    ],
  },
  {
    id: 'hay-khamis-elite',
    title: 'الجهيني إيليت الحي الخامس',
    category: 'hay-khamis',
    categoryName: 'الحي الخامس',
    location: 'الحي الخامس، التجمع الخامس، القاهرة الجديدة',
    type: 'فيلات وتاون هاوس',
    area: '320 م²',
    units: '18 وحدة',
    progress: 40,
    status: 'قيد التنفيذ',
    deliveryYear: '2027',
    cover:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'فيلات وتاون هاوس فاخرة بتصميمات حصرية في الحي الخامس الراقي.',
    description:
      'مجموعة حصرية من الفيلات والتاون هاوس بتصميمات معمارية فريدة تعكس الفخامة، في موقع متميز بالحي الخامس مع مساحات خاصة وتشطيبات استثنائية.',
    features: [
      'تصميمات معمارية حصرية',
      'حدائق خاصة لكل وحدة',
      'تشطيبات ألترا لوكس',
      'أنظمة منزل ذكي',
      'حمامات سباحة خاصة',
      'مواقف متعددة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '10%' },
      { label: 'فترة السداد', value: 'حتى 8 سنوات' },
      { label: 'الاستلام', value: 'كامل التشطيب' },
    ],
  },
  {
    id: 'hay-takmili-plaza',
    title: 'الجهيني بلازا الحي التكميلي',
    category: 'hay-takmili',
    categoryName: 'الحي التكميلي',
    location: 'الحي التكميلي، التجمع الخامس، القاهرة الجديدة',
    type: 'مبنى متعدد الاستخدامات',
    area: '140 م²',
    units: '50 وحدة',
    progress: 60,
    status: 'قيد التنفيذ',
    deliveryYear: '2026',
    cover:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'مبنى متعدد الاستخدامات يجمع بين الوحدات السكنية والتجارية في موقع حيوي.',
    description:
      'مشروع متعدد الاستخدامات يدمج بين المساحات السكنية والتجارية والإدارية، مصمم ليكون وجهة متكاملة في الحي التكميلي مع سهولة الوصول للخدمات.',
    features: [
      'وحدات سكنية وتجارية وإدارية',
      'موقع تجاري استراتيجي',
      'واجهات زجاجية حديثة',
      'مصاعد عالية السرعة',
      'مواقف متعددة الطوابق',
      'صيانة وإدارة احترافية',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '20%' },
      { label: 'فترة السداد', value: 'حتى 5 سنوات' },
      { label: 'الاستلام', value: 'نصف تشطيب' },
    ],
  },
  {
    id: 'north-orchid-gardens',
    title: 'الجهيني جاردنز شمال الأوركيد',
    category: 'north-orchid',
    categoryName: 'شمال الأوركيد',
    location: 'شمال الأوركيد، التجمع الخامس، القاهرة الجديدة',
    type: 'كمبوند سكني',
    area: '195 م²',
    units: '45 وحدة',
    progress: 30,
    status: 'قيد التنفيذ',
    deliveryYear: '2028',
    cover:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'كمبوند عصري بمساحات خضراء وتصميم متناغم مع الطبيعة في شمال الأوركيد.',
    description:
      'كمبوند سكني جديد يقدم نمط حياة عصري متكامل وسط الطبيعة، بتصميمات معمارية مستدامة ومرافق متطورة في منطقة شمال الأوركيد الواعدة.',
    features: [
      'تصميم مستدام صديق للبيئة',
      'مساحات خضراء وبحيرات صناعية',
      'كلوب هاوس متكامل',
      'مسارات دراجات ومشي',
      'منطقة خدمات متكاملة',
      'أمن وحراسة على مدار الساعة',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '5%' },
      { label: 'فترة السداد', value: 'حتى 10 سنوات' },
      { label: 'الاستلام', value: 'نصف تشطيب' },
    ],
  },
  {
    id: 'beit-elwatan-villa-02',
    title: 'فيلا الجهيني بيت الوطن B2',
    category: 'beit-elwatan',
    categoryName: 'بيت الوطن',
    location: 'بيت الوطن، التجمع الخامس، القاهرة الجديدة',
    type: 'فيلا توأم',
    area: '380 م²',
    units: '8 وحدات',
    progress: 95,
    status: 'قيد التنفيذ',
    deliveryYear: '2026',
    cover:
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'فيلات توأم بتصميم متناغم ومساحات مدروسة في موقع مميز ببيت الوطن.',
    description:
      'فيلات توأم بتصميم معماري راقٍ يجمع بين الخصوصية والمساحات المفتوحة، مع تشطيبات فاخرة وموقع استراتيجي قريب من الاكتمال والتسليم.',
    features: [
      'تصميم توأم متناغم',
      'حدائق ومساحات خارجية',
      'تشطيبات سوبر لوكس',
      'غرف خدمات منفصلة',
      'نظام تكييف مركزي',
      'جراج مغطى',
    ],
    payment: [
      { label: 'مقدم تعاقد', value: '15%' },
      { label: 'فترة السداد', value: 'حتى 6 سنوات' },
      { label: 'الاستلام', value: 'كامل التشطيب' },
    ],
  },
]

export const getProjectById = (id) => projects.find((p) => p.id === id)
