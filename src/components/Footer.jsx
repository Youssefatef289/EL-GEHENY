import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company, navLinks } from '../data/site'
import { projectCategories } from '../data/projects'
import { socialPlatforms } from '../data/socialLinks'
import { useLang, L } from '../i18n'

export default function Footer() {
  const { t, lang } = useLang()
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-ink">
      <div className="pointer-events-none absolute -top-24 right-1/4 h-48 w-48 rounded-full bg-primary-500/10 blur-[100px]" />
      <div className="container-x relative grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-10">
        <div className="flex w-fit max-w-xs flex-col gap-3">
          <Logo />
          <p className="text-xs leading-relaxed text-muted sm:text-sm">
            {t('footer.aboutSince')} {company.since} — {t('footer.about')}
          </p>
          <div className="mt-1">
            <p className="mb-2 text-xs font-bold text-navy-900">{t('footer.followUs')}</p>
            <div className="flex flex-wrap items-center gap-2">
              {socialPlatforms.map((item) => (
                <FooterSocialLink
                  key={item.key}
                  href={company.social[item.key]}
                  label={item.label}
                  icon={item.icon}
                  brand={item.key}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-fit">
          <h4 className="mb-3 text-sm font-bold text-navy-900">{t('footer.quickLinks')}</h4>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-body link-hover">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-fit">
          <h4 className="mb-3 text-sm font-bold text-navy-900">{t('footer.ourProjects')}</h4>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm">
            {projectCategories.slice(1, 7).map((c) => (
              <li key={c.id}>
                <Link to="/projects" className="text-body link-hover">
                  {L(c.name, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-fit max-w-xs">
          <h4 className="mb-3 text-sm font-bold text-navy-900">{t('footer.contact')}</h4>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5 text-body">
              <IconWrap>
                <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </IconWrap>
              <span className="leading-relaxed">{L(company.address, lang)}</span>
            </li>
            <li>
              <a href={`tel:+${company.phoneIntl}`} className="flex items-center gap-2.5 text-body link-hover">
                <IconWrap>
                  <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />
                </IconWrap>
                <span dir="ltr">{company.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-body link-hover">
                <IconWrap>
                  <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                </IconWrap>
                <span dir="ltr">{company.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-center text-[0.65rem] uppercase tracking-wide text-subtle sm:flex-row sm:text-xs">
          <p>
            © {new Date().getFullYear()} {L(company.name, lang)}. {t('footer.rights')}
          </p>
          <p>{t('footer.devLine').replace('{year}', company.since)}</p>
        </div>
      </div>
    </footer>
  )
}

function IconWrap({ children }) {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-400/10 text-primary-600">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        {children}
      </svg>
    </span>
  )
}

function FooterSocialLink({ href, label, icon, brand }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`journey-contact-social-link journey-contact-social-link--${brand} h-9 w-9`}
    >
      <i className={icon} aria-hidden="true" />
    </a>
  )
}
