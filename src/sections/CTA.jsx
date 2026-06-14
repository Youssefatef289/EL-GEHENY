import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { company } from '../data/site'
import { useLang } from '../i18n'

export default function CTA() {
  const { t } = useLang()
  return (
    <section className="section-pad">
      <div className="container-x">
        <Reveal>
          <div className="glass-primary relative overflow-hidden rounded-[2.5rem] border border-primary-200/70 px-8 py-16 text-start shadow-[0_40px_120px_-55px_rgba(202,161,63,0.5)] sm:px-16">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-navy-300/30 blur-[100px]" />
            <div className="relative">
              <SectionTitle className="mb-6">{t('cta.eyebrow')}</SectionTitle>
              <h2 className="heading-lg max-w-3xl text-navy-900">
                {t('cta.titleA')} <span className="text-gradient-primary">{t('cta.titleB')}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-navy-700">
                {t('cta.paragraph')}
              </p>
              <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Link to="/contact" className="btn-primary w-full sm:w-auto">
                  {t('cta.contact')}
                </Link>
                <a href={`tel:${company.phone}`} className="btn-outline w-full sm:w-auto" dir="ltr">
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
