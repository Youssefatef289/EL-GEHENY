import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { company } from '../data/site'
import { useLang } from '../i18n'

export default function CTA() {
  const { t } = useLang()
  return (
    <section className="section-pad">
      <div className="container-x">
        <Reveal>
          <div className="glass-primary relative overflow-hidden rounded-[2.5rem] border border-primary-200/70 px-8 py-16 text-center shadow-[0_40px_120px_-55px_rgba(189,154,104,0.5)] sm:px-16">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/70 to-transparent" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-navy-300/30 blur-[100px]" />
            <div className="relative">
              <span className="eyebrow mb-6">{t('cta.eyebrow')}</span>
              <h2 className="heading-lg mx-auto max-w-3xl text-navy-900">
                {t('cta.titleA')} <span className="text-gradient-primary">{t('cta.titleB')}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-navy-700">
                {t('cta.paragraph')}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
