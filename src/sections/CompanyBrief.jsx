import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { useLang } from '../i18n'

import companyVisual from '../../images/hero-residential.png'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CompanyBrief() {
  const { t } = useLang()

  return (
    <section id="company-brief" className="relative w-full overflow-hidden bg-ink">
      <div className="grid w-full lg:min-h-[min(80vh,760px)] lg:grid-cols-2">
        {/* صورة — عرض كامل */}
        <Reveal direction="start" duration={0.78} className="relative order-1 min-h-[18rem] sm:min-h-[22rem] lg:min-h-full">
          <img
            src={companyVisual}
            alt={t('companyBrief.imageAlt')}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/45"
            aria-hidden="true"
          />
        </Reveal>

        {/* نص */}
        <Reveal direction="end" duration={0.78} delay={0.08} className="order-2 flex items-center border-t border-white/10 lg:border-t-0 lg:border-s lg:border-white/10">
          <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <SectionTitle className="mb-5">{t('companyBrief.eyebrow')}</SectionTitle>

              <Reveal direction="end" delay={0.14}>
                <h2 className="heading-lg max-w-xl text-gradient-primary lg:max-w-2xl lg:text-4xl xl:text-[2.65rem]">
                  {t('companyBrief.headline')}
                </h2>
              </Reveal>

              <Reveal direction="end" delay={0.2}>
                <p className="section-desc mt-6 max-w-xl">{t('companyBrief.description')}</p>
              </Reveal>

              <Reveal direction="end" delay={0.26}>
                <div className="mt-8 flex items-start gap-3.5 border-t border-white/10 pt-8 sm:mt-10">
                  <span className="gold-check mt-0.5 h-7 w-7 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <p className="body-sm leading-relaxed text-body sm:body-md">{t('companyBrief.highlight')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
