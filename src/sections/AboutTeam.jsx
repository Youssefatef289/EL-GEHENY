import { motion, useReducedMotion } from 'framer-motion'
import { useLang, L } from '../i18n'
import { motionConfig, revealTransition, revealViewport } from '../utils/motion'

import founderImg from '../../images/الحاج صلاح الجهينى.png'
import alaaImg from '../../images/علاء صلاح الجهينى.png'
import ahmedImg from '../../images/احمد صلاح الجهينى.png'
import waleedImg from '../../images/وليد كمال الجهينى.png'
import signatureImg from '../../images/التوقيع.png'

const founder = {
  name: { ar: 'الحاج صلاح كمال الجهيني', en: 'Haj Salah Kamal Al-Juhaini' },
  role: { ar: 'رئيس مجلس الإدارة والمؤسس', en: 'Chairman of the Board and Founder' },
  bio: {
    ar: 'يُعد الحاج صلاح كمال الجهيني المؤسس ورئيس مجلس إدارة شركة الجهيني للتطوير العقاري، ويتمتع بخبرة طويلة تمتد لسنوات في مجالات التطوير العقاري والمقاولات والإنشاءات. قاد تنفيذ العديد من المشروعات السكنية والتجارية والبنية التحتية في مختلف أنحاء الجمهورية، واضعًا أسس الشركة على مبادئ الثقة والالتزام والجودة، مما ساهم في بناء سجل قوي من المشروعات الناجحة وعلاقات طويلة الأمد مع العملاء والشركاء.',
    en: 'Haj Salah Kamal Al-Juhaini is the founder and Chairman of the Board of El-Geheny Real Estate Development Company. With many years of experience in real estate development, contracting, and construction, he has led the execution of numerous residential, commercial, and infrastructure projects across Egypt. He built the company on the principles of trust, commitment, and quality, establishing a strong record of successful projects and long-term relationships with clients and partners.',
  },
  image: founderImg,
}

const teamMembers = [
  {
    name: { ar: 'علاء صلاح الجهينى', en: 'Alaa Salah Al-Juhaini' },
    role: { ar: 'المدير العام', en: 'General Manager' },
    bio: {
      ar: 'يتولى علاء صلاح الجهيني إدارة العمليات اليومية للشركة والإشراف على تنفيذ الخطط التشغيلية والاستراتيجية، مع التركيز على تحقيق أعلى مستويات الجودة والكفاءة وضمان الالتزام بالجداول الزمنية للمشروعات.',
      en: "Alaa Salah Al-Juhaini manages the company's daily operations and oversees the implementation of operational and strategic plans, with a focus on achieving the highest levels of quality and efficiency and ensuring commitment to project timelines.",
    },
    image: alaaImg,
  },
  {
    name: { ar: 'احمد صلاح الجهينى', en: 'Ahmed Salah Al-Juhaini' },
    role: { ar: 'مدير العمليات', en: 'Operations Manager' },
    bio: {
      ar: 'يشرف أحمد صلاح الجهيني على إدارة العمليات التشغيلية ومتابعة سير العمل بين مختلف الإدارات، لضمان تنفيذ المشروعات وفق أعلى معايير الجودة وتحقيق التكامل بين التخطيط والتنفيذ بما يدعم أهداف الشركة ونموها المستمر.',
      en: "Ahmed Salah Al-Juhaini supervises operational management and workflow across departments, ensuring projects are executed to the highest quality standards and that planning and implementation are integrated to support the company's goals and continuous growth.",
    },
    image: ahmedImg,
  },
  {
    name: { ar: 'وليد كمال الجهينى', en: 'Waleed Kamal Al-Juhaini' },
    role: { ar: 'مدير المشروعات', en: 'Projects Manager' },
    bio: {
      ar: 'يمتلك وليد كمال الجهيني خبرة عملية في إدارة وتنفيذ المشروعات العقارية، ويتولى الإشراف على مراحل التنفيذ المختلفة، مع الحرص على تطبيق أعلى معايير الجودة والالتزام بالمواصفات الفنية والجداول الزمنية المحددة.',
      en: 'Waleed Kamal Al-Juhaini has practical experience in managing and executing real estate projects. He supervises various implementation stages while ensuring the highest quality standards and adherence to technical specifications and schedules.',
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
