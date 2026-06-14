import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useLang, L } from '../i18n'

import buildingImage from '../../images/building.jpg'

const heritageProjects = [
  {
    ar: 'إنشاء كمبوند فلور سيتى العجمى - الإسكندرية (1، 2، 3، 4)',
    en: 'Development of Flor City Compound, Agami — Alexandria (Phases 1, 2, 3, 4)',
  },
  {
    ar: 'إنشاء برج سكنى فلور سيتى 4 أكتوبر - الإسكندرية',
    en: 'Construction of Flor City residential tower, 4 October — Alexandria',
  },
  {
    ar: 'إنشاء فيلات سكنية بالتجمع الأول - القاهرة الجديدة',
    en: 'Construction of residential villas in First Settlement — New Cairo',
  },
  {
    ar: 'إنشاء برج سكنى فلاور تاور زهراء مدينة نصر',
    en: 'Construction of Flower Tower residential building — Zahraa, Nasr City',
  },
  {
    ar: 'إنشاء مجموعة أبراج الجهينى (1، 2، 3، 4، 5، 6، 7) - زهراء مدينة نصر',
    en: 'Development of El-Geheny Towers Group (1–7) — Zahraa, Nasr City',
  },
  {
    ar: 'إنشاء عمائر سكنية بمدينة بدر الحى المتميز 236',
    en: 'Construction of residential buildings in Badr City — Distinguished District 236',
  },
  {
    ar: 'تنفيذ وتشطيب معهد الأرقم - مدينة نصر',
    en: 'Execution and finishing of Al-Arqam Institute — Nasr City',
  },
  {
    ar: 'السوق التجارى - المنطقة 9 - مدينة نصر',
    en: 'Commercial Market — Zone 9, Nasr City',
  },
  {
    ar: 'السوق التجارى القديم - شرم الشيخ',
    en: 'Old Commercial Market — Sharm El-Sheikh',
  },
  {
    ar: 'تنفيذ وتشطيب شاليهات قرية المحروسة - رأس سدر',
    en: 'Execution and finishing of chalets — Al-Mahrousa Village, Ras Sidr',
  },
  {
    ar: 'تنفيذ محطة مياه أسيوط الجديدة',
    en: 'Construction of New Assiut Water Station',
  },
  {
    ar: 'استقطاع 2 كم بقناة السويس الجديدة',
    en: '2 km dredging in the New Suez Canal',
  },
  {
    ar: 'أعمال حفر بنهر النيل الأخضر - العاصمة الإدارية الجديدة',
    en: 'Excavation works on the Green Nile River — New Administrative Capital',
  },
  {
    ar: 'أعمال حفر أنفاق الحي الحكومي - العاصمة الإدارية الجديدة',
    en: 'Tunnel excavation for the Government District — New Administrative Capital',
  },
  {
    ar: 'أعمال حفر بكمبوند تاج سلطان - طريق السويس',
    en: 'Excavation works at Tag Sultan Compound — Suez Road',
  },
  {
    ar: 'Il Monte Galala — العين السخنة — أعمال حفر وإنشاءات بالقرية',
    en: 'Il Monte Galala — Ain Sokhna — village excavation and construction works',
  },
  {
    ar: 'Porto Sokhna Water Front — العين السخنة — أعمال تشطيبات شاليهات',
    en: 'Porto Sokhna Water Front — Ain Sokhna — chalet finishing works',
  },
]

function HeritageItem({ item, index }) {
  const { lang } = useLang()

  return (
    <motion.li
      initial={{ opacity: 0, x: lang === 'ar' ? 16 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3.5 body-sm text-hero-body"
    >
      <span className="gold-check mt-0.5 h-6 w-6 shadow-gold-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{L(item, lang)}</span>
    </motion.li>
  )
}

export default function WhyUs() {
  const { t, lang } = useLang()
  const reduceMotion = useReducedMotion()

  return (
    <section id="heritage" className="relative min-h-[85vh] w-full overflow-hidden bg-ink">
      {/* خلفية متحركة — zoom in بسيط */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="heritage-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${buildingImage})` }}
          initial={reduceMotion ? false : { scale: 1 }}
          whileInView={{ scale: reduceMotion ? 1 : 1.07 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* طبقات التغميق */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/72 to-ink/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(202,161,63,0.14),transparent_55%)]" />
        <div
          className={`absolute inset-0 ${
            lang === 'ar'
              ? 'bg-gradient-to-l from-ink/90 via-ink/55 to-transparent'
              : 'bg-gradient-to-r from-ink/90 via-ink/55 to-transparent'
          }`}
        />
      </div>

      {/* النص فوق الصورة */}
      <div className="container-x relative z-10 px-5 py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl"
        >
          <SectionTitle tone="gold" className="mb-5">
            {t('heritage.eyebrow')}
          </SectionTitle>
          <Reveal delay={0.05}>
            <h3 className="section-subtitle text-white">{t('heritage.title')}</h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="section-desc mt-4 text-hero-body">
              {t('heritage.description')}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
            {heritageProjects.map((item, i) => (
              <HeritageItem key={i} item={item} index={i} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
