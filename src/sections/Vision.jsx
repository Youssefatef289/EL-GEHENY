import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

import visionImage from '../../images/Our vision.png'

const points = [
  'أن نكون الخيار الأول في التطوير العقاري بمصر',
  'تقديم مجتمعات عمرانية متكاملة ترتقي بأسلوب الحياة',
  'الابتكار المستمر في التصميم والتنفيذ',
  'بناء علاقات طويلة الأمد قائمة على الثقة',
]

export default function Vision() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* الجانب البصري بالصورة */}
        <Reveal direction="left" className="relative order-2 lg:order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-primary-200/70 shadow-[0_40px_120px_-50px_rgba(255,195,77,0.5)] lg:aspect-[5/4]">
            <img
              src={visionImage}
              alt="رؤيتنا - الجهيني للتطوير العقاري"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-primary-500/20 blur-[80px]" />
        </Reveal>

        {/* النص */}
        <div className="order-1 space-y-6 lg:order-1">
          <Reveal>
            <span className="eyebrow">رؤيتنا للمستقبل            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-lg text-navy-900">
              نُطوّر العقار لنُطوّر <span className="text-gradient-primary">جودة الحياة</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-navy-700 sm:text-lg">
              لا نبني مباني فقط، بل نصنع مجتمعات تواكب تطلعات الأجيال القادمة وتمنح عملاءنا
              أسلوب حياة أكثر جودة وقيمة واستدامة.
            </p>
          </Reveal>

          <ul className="space-y-4">
            {points.map((point, i) => (
              <Reveal key={point} delay={0.15 + i * 0.08} direction="left">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-gradient text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-navy-700">{point}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <Link to="/about" className="btn-primary mt-2">
              تعرّف علينا أكثر
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
