import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company, navLinks } from '../data/site'
import { projectCategories } from '../data/projects'

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-navy-200 bg-navy-50">
      <div className="pointer-events-none absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[120px]" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-navy-700">
            منذ عام {company.since}، نبني سجلاً من النجاحات يعتمد على الجودة والالتزام والثقة في
            مجال التطوير العقاري.
          </p>
          <div className="flex gap-3">
            <Social href={company.social.facebook} label="فيسبوك">
              <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.5-1.5H16V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H7.5v3H10v8h3z" />
            </Social>
            <Social href={company.social.instagram} label="انستجرام">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 01-1.4-.9 3.9 3.9 0 01-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.9 2.6 10.3 2.6 12s0 2.1.1 3.3c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-3.3s0-2.1-.1-3.3c-.1-1.1-.2-1.7-.4-2.1a3.5 3.5 0 00-.8-1.3 3.5 3.5 0 00-1.3-.8c-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zm6.3-8.2a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z" />
            </Social>
            <Social href={company.social.linkedin} label="لينكدإن">
              <path d="M6.5 8.5a2 2 0 100-4 2 2 0 000 4zM4.8 20h3.4V9.7H4.8V20zM10.3 9.7h3.3v1.4h.1c.5-.9 1.6-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V20h-3.4v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V20h-3.4V9.7z" />
            </Social>
            <Social href={company.social.youtube} label="يوتيوب">
              <path d="M21.6 7.2a2.6 2.6 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 002.4 7.2 27 27 0 002 12a27 27 0 00.4 4.8 2.6 2.6 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 001.8-1.8A27 27 0 0022 12a27 27 0 00-.4-4.8zM10 15V9l5.2 3L10 15z" />
            </Social>
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-navy-900">روابط سريعة</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-navy-700 transition-colors hover:text-primary-600"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-navy-900">مشاريعنا</h4>
          <ul className="flex flex-col gap-3 text-sm">
            {projectCategories.slice(1, 7).map((c) => (
              <li key={c.id}>
                <Link
                  to="/projects"
                  className="text-navy-700 transition-colors hover:text-primary-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg font-bold text-navy-900">تواصل معنا</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3 text-navy-700">
              <IconWrap>
                <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </IconWrap>
              <span className="leading-relaxed">{company.address}</span>
            </li>
            <li>
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-3 text-navy-700 transition-colors hover:text-primary-600"
              >
                <IconWrap>
                  <path d="M3 5.5C3 4.12 4.12 3 5.5 3H7c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.3 1.3a13 13 0 005.6 5.6l1.3-1.3c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.5c0 1.4-1.1 2.5-2.5 2.5C10.5 21 3 13.5 3 5.5z" />
                </IconWrap>
                <span dir="ltr">{company.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-navy-700 transition-colors hover:text-primary-600"
              >
                <IconWrap>
                  <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4 7v1l8 5 8-5V7l-8 5z" />
                </IconWrap>
                <span dir="ltr">{company.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-200">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-navy-600 sm:flex-row sm:text-right">
          <p>
            © {new Date().getFullYear()} {company.name}. جميع الحقوق محفوظة.
          </p>
          <p>
            تطوير عقاري بخبرة منذ عام {company.since} — القاهرة الجديدة
          </p>
        </div>
      </div>
    </footer>
  )
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy-300 bg-navy-50 text-navy-700 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/40 hover:text-primary-600"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        {children}
      </svg>
    </a>
  )
}

function IconWrap({ children }) {
  return (
    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary-400/10 text-primary-600">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        {children}
      </svg>
    </span>
  )
}
