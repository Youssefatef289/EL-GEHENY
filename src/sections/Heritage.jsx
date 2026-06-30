import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import FixedParallaxBackground from '../components/FixedParallaxBackground'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useLang, L } from '../i18n'
import { useSectionImage } from '../hooks/useSiteData'
import { motionConfig, revealFromBottom, revealToVisible, revealTransition, revealViewport } from '../utils/motion'

const heritageProjects = [
  {
    ar: 'إنشاء كمبوند فلاور سيتى العجمى - الإسكندرية (1، 2، 3، 4)',
    en: 'Development of Flor City Compound, Agami — Alexandria (Phases 1, 2, 3, 4)',
  },
  {
    ar: 'إنشاء برج سكنى 7  فلاور سيتى 4 أكتوبر - الإسكندرية',
    en: 'Construction of 7 Flower City residential tower, 4 October — Alexandria',
  },
  {
    ar: 'إنشاء فيلا سكنية بالتجمع الأول - القاهرة الجديدة',
    en: 'Construction of a residential villa in First Settlement — New Cairo',
  },
  {
    ar: 'إنشاء برج سكنى فلاور سيتى زهراء مدينة نصر',
    en: 'Construction of Flower City residential building — Zahraa, Nasr City',
  },
  {
    ar: 'إنشاء مجموعة أبراج الجهيني للتطوير العقاري (1، 2، 3، 4، 5، 6، 7) - زهراء مدينة نصر',
    en: 'Development of El-Geheny Real Estate Development Towers Group (1–7) — Zahraa, Nasr City',
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
    ar: 'السوق التجارى - المنطقة 10 - مدينة نصر',
    en: 'Commercial Market — Zone 10, Nasr City',
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
    ar: '90 كيلو طريق عين الدله الفرافره',
    en: '90 km — Ain El-Delta Road — Al Fayoum',
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
      initial={revealFromBottom()}
      whileInView={revealToVisible}
      viewport={revealViewport}
      transition={revealTransition(index * motionConfig.stagger)}
      className="heritage-item group flex gap-4 rounded-xl border border-white/10 bg-ink/35 p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary-400/30 hover:bg-ink/50 hover:shadow-[0_12px_32px_-16px_rgba(212,175,55,0.28)] sm:p-5"
    >
      <span className="gold-check mt-0.5 h-7 w-7 shrink-0 shadow-gold-sm transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="body-md font-medium leading-relaxed text-white sm:text-lg">{L(item, lang)}</span>
    </motion.li>
  )
}

export default function Heritage() {
  const sectionRef = useRef(null)
  const { t, lang } = useLang()
  const buildingImage = useSectionImage('heritage.background')
  const reduceMotion = useReducedMotion()

  const overlayClassName = lang === 'ar' ? 'heritage-overlay-rtl' : 'heritage-overlay-ltr'

  return (
    <section ref={sectionRef} id="heritage" className="relative isolate min-h-[88vh] w-full overflow-hidden bg-ink">
      <FixedParallaxBackground
        targetRef={sectionRef}
        image={buildingImage}
        alt={t('heritage.title')}
        overlayClassName={overlayClassName}
      />

      <div className="container-x relative z-10 px-5 py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={revealFromBottom(reduceMotion, motionConfig.sectionOffsetY)}
          whileInView={revealToVisible}
          viewport={revealViewport}
          transition={revealTransition(0, motionConfig.sectionDuration)}
          className="mx-auto max-w-6xl"
        >
          <Reveal delay={0.02}>
            <SectionTitle tone="gold" className="mb-6">
              {t('heritage.eyebrow')}
            </SectionTitle>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="heading-lg max-w-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {t('heritage.title')}
            </h3>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="body-lg mt-5 max-w-3xl font-medium leading-relaxed text-white sm:text-xl">
              {t('heritage.description')}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
            {heritageProjects.map((item, i) => (
              <HeritageItem key={i} item={item} index={i} />
            ))}
          </ul>

          <Reveal delay={0.2} className="relative z-20 mt-12 flex justify-center sm:mt-14">
            <Link to="/projects" className="btn-primary w-full max-w-sm px-8 py-3.5 sm:w-auto sm:max-w-none sm:px-10">
              {t('heritage.cta')}
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
