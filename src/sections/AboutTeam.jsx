import { motion, useReducedMotion } from 'framer-motion'
import { useLang, L } from '../i18n'
import { motionConfig, revealTransition, revealViewport } from '../utils/motion'

import founderImg from '../../images/الحاج صلاح الجهينى.png'
import alaaImg from '../../images/علاء صلاح الجهينى.png'
import ahmedImg from '../../images/احمد صلاح الجهينى.png'
import waleedImg from '../../images/وليد كمال الجهينى.png'
import signatureImg from '../../images/التوقيع.png'

const founder = {
  name: { ar: 'الحاج صلاح كمال الجهيني', en: 'Salah Kamal El Geheny' },
  role: { ar: 'المؤسس ورئيس مجلس الإدارة', en: 'Founder & Chairman' },
  bio: {
    ar: 'يُعد الحاج صلاح كمال الجهيني المؤسس ورئيس مجلس إدارة شركة الجهيني للتطوير العقاري، ويتمتع بخبرة طويلة في مجالات التطوير العقاري والمقاولات والإنشاءات. قاد تنفيذ العديد من المشروعات السكنية والتجارية والهندسية في مختلف أنحاء مصر، ووضع أسس الشركة على مبادئ الثقة والالتزام والجودة، مما ساهم في بناء سجل قوي من المشروعات الناجحة وسمعة راسخة للشركة.',
    en: 'Salah Kamal El Geheny is the Founder and Chairman of El Geheny Development. With extensive experience in real estate development, construction, and infrastructure projects, he has led the execution of numerous residential, commercial, and engineering developments across Egypt. His vision is built on trust, commitment, and quality, forming the foundation of the company\'s strong reputation and successful project portfolio.',
  },
  image: founderImg,
}

const teamMembers = [
  {
    name: { ar: 'علاء صلاح الجهيني', en: 'Alaa Salah El Geheny' },
    role: { ar: 'المدير العام', en: 'General Manager' },
    bio: {
      ar: 'يتولى علاء صلاح الجهيني الإشراف على العمليات اليومية للشركة والتنفيذ الاستراتيجي، مع ضمان الكفاءة والجودة وتسليم المشروعات في مواعيدها بما يدعم أهداف النمو طويلة الأمد للشركة.',
      en: 'Alaa Salah El Geheny oversees the company\'s daily operations and strategic execution, ensuring efficiency, quality standards, and timely project delivery while supporting the company\'s long-term growth objectives.',
    },
    image: alaaImg,
  },
  {
    name: { ar: 'أحمد صلاح الجهيني', en: 'Ahmed Salah El Geheny' },
    role: { ar: 'مدير العمليات', en: 'Operations Manager' },
    bio: {
      ar: 'يشرف أحمد صلاح الجهيني على الأنشطة التشغيلية وتنسيق سير العمل بين الإدارات، ويلعب دوراً محورياً في ضمان تنفيذ المشروعات بسلاسة وتحقيق الكفاءة التشغيلية وفق معايير الجودة وأهداف الشركة.',
      en: 'Ahmed Salah El Geheny is responsible for overseeing operational activities and coordinating workflows across departments. He plays a key role in ensuring smooth project execution, operational efficiency, and alignment with the company\'s quality standards and business goals.',
    },
    image: ahmedImg,
  },
  {
    name: { ar: 'وليد كمال الجهيني', en: 'Waleed Kamal El Geheny' },
    role: { ar: 'مدير المشروع', en: 'Project Manager' },
    bio: {
      ar: 'يدير وليد كمال الجهيني تنفيذ المشروعات ويشرف على أنشطة الإنشاء في مختلف التطويرات، مع التركيز على الحفاظ على معايير الجودة والالتزام بالجداول الزمنية وضمان التسليم الناجح في كل مرحلة.',
      en: 'Waleed Kamal El Geheny manages project execution and oversees construction activities across various developments. His focus is on maintaining quality standards, meeting project timelines, and ensuring successful delivery at every stage of development.',
    },
    image: waleedImg,
  },
]

function SideReveal({ children, from = 'start', delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()
  const { dir } = useLang()
  const offset =
    from === 'start'
      ? dir === 'rtl'
        ? 64
        : -64
      : dir === 'rtl'
        ? -64
        : 64

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={revealViewport}
      transition={revealTransition(delay, motionConfig.sectionDuration)}
    >
      {children}
    </motion.div>
  )
}

function PortraitFrame({ src, alt, tall = false, uniform = false, showSignature = false }) {
  return (
    <div
      className={`relative w-full bg-transparent ${showSignature ? 'overflow-visible' : 'overflow-hidden'} ${
        tall
          ? 'min-h-[30rem] sm:min-h-[34rem] lg:min-h-[38rem]'
          : uniform
            ? 'h-[24rem] sm:h-[28rem] lg:h-[30rem]'
            : 'min-h-[24rem] sm:min-h-[28rem]'
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="relative z-[1] mx-auto h-full w-full object-contain object-bottom"
      />
      {showSignature && (
        <img
          src={signatureImg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-[-1%] right-0 z-[3] w-[100%] max-w-[18rem] translate-x-[10%] translate-y-[46%] select-none object-contain object-right mix-blend-screen sm:max-w-[22rem] lg:max-w-[26rem]"
        />
      )}
    </div>
  )
}

function MemberTextBlock({ name, role, bio, align = 'center' }) {
  const alignClass = align === 'start' ? 'text-center lg:text-start' : 'text-center'

  return (
    <div className={alignClass}>
      <h3 className="heading-md text-gradient-primary sm:text-2xl lg:text-[1.75rem]">{name}</h3>
      <p className="mt-2 font-display text-base font-bold text-primary-300 sm:text-lg">{role}</p>
      <p className="body-md mt-5 max-w-prose leading-relaxed text-hero-body sm:text-lg lg:leading-8">{bio}</p>
    </div>
  )
}

function TeamCard({ member, lang, delay = 0, reverse = false }) {
  const name = L(member.name, lang)
  const role = L(member.role, lang)
  const bio = L(member.bio, lang)

  return (
    <article
      className={`flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-12 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <SideReveal from="start" delay={delay} className="w-full shrink-0 md:w-[42%] lg:w-[38%]">
        <PortraitFrame src={member.image} alt={name} uniform />
      </SideReveal>

      <SideReveal from="end" delay={delay + 0.08} className="w-full flex-1">
        <MemberTextBlock name={name} role={role} bio={bio} align="start" />
      </SideReveal>
    </article>
  )
}

export default function AboutTeam() {
  const { lang, dir } = useLang()
  const founderName = L(founder.name, lang)
  const founderRole = L(founder.role, lang)
  const founderBio = L(founder.bio, lang)

  return (
    <section className="relative overflow-x-hidden bg-ink py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="container-x relative">
        {/* المؤسس — صورة من جانب / نص من الجانب الآخر */}
        <div
          className={`flex flex-col items-center gap-10 lg:gap-14 xl:gap-20 ${
            dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          <SideReveal from="start" className="w-full lg:w-[44%] lg:max-w-2xl">
            <div className="relative mx-auto w-full overflow-visible">
              <PortraitFrame src={founder.image} alt={founderName} tall showSignature />
            </div>
          </SideReveal>

          <SideReveal from="end" delay={0.1} className="w-full flex-1 text-center lg:text-start">
            <h2 className="heading-xl text-gradient-primary sm:text-3xl lg:text-4xl">{founderName}</h2>
            <p className="mt-3 font-display text-lg font-bold text-primary-300 sm:text-xl">{founderRole}</p>
            <p className="body-md mt-6 max-w-3xl leading-relaxed text-hero-body sm:text-lg lg:leading-8">{founderBio}</p>
          </SideReveal>
        </div>

        {/* فريق الإدارة */}
        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20 lg:mt-24 lg:space-y-24">
          {teamMembers.map((member, i) => (
            <TeamCard
              key={L(member.name, 'ar')}
              member={member}
              lang={lang}
              delay={i * 0.06}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
