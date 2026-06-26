import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SectionReveal from '../components/SectionReveal'
import ProjectContactSection from '../components/ProjectContactSection'
import { useLang } from '../i18n'

export default function Contact() {
  const { t } = useLang()

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-6 sm:pt-36">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
        <div className="container-x relative">
          <SectionTitle as="h1">{t('contact.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h2 className="section-subtitle mt-4">{t('contact.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-desc mt-5">{t('contact.desc')}</p>
          </Reveal>
        </div>
      </section>

      <SectionReveal>
        <ProjectContactSection />
      </SectionReveal>
    </>
  )
}
