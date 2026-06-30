import { motion, useReducedMotion } from 'framer-motion'
import { useLang, L } from '../i18n'
import { motionConfig, revealTransition, revealViewport } from '../utils/motion'
import { getFounder, getTeamMembers } from '../data/team'
import { useSectionImage } from '../hooks/useSiteData'

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

function PortraitFrame({ src, alt, tall = false, uniform = false, showSignature = false, signatureSrc }) {
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
      {showSignature && signatureSrc && (
        <img
          src={signatureSrc}
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
      <h3 className="text-2xl font-extrabold text-gradient-primary sm:text-3xl lg:text-[2.15rem]">{name}</h3>
      <p className="mt-3 font-display text-lg font-bold text-primary-300 sm:text-xl lg:text-2xl">{role}</p>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-white sm:text-lg lg:text-xl lg:leading-9">{bio}</p>
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
  const signatureSrc = useSectionImage('aboutTeam.signature')
  const founder = getFounder()
  const teamMembers = getTeamMembers()
  const founderName = L(founder.name, lang)
  const founderRole = L(founder.role, lang)
  const founderBio = L(founder.bio, lang)

  return (
    <section className="relative overflow-x-hidden bg-ink py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-primary-500/5 blur-[120px]" />

      <div className="container-x relative">
        <div
          className={`flex flex-col items-center gap-10 lg:gap-14 xl:gap-20 ${
            dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          <SideReveal from="start" className="w-full lg:w-[44%] lg:max-w-2xl">
            <div className="relative mx-auto w-full overflow-visible">
              <PortraitFrame src={founder.image} alt={founderName} tall showSignature signatureSrc={signatureSrc} />
            </div>
          </SideReveal>

          <SideReveal from="end" delay={0.1} className="w-full flex-1 text-center lg:text-start">
            <h2 className="text-3xl font-extrabold text-gradient-primary sm:text-4xl lg:text-5xl">{founderName}</h2>
            <p className="mt-4 font-display text-xl font-bold text-primary-300 sm:text-2xl">{founderRole}</p>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-white sm:text-lg lg:text-xl lg:leading-9">{founderBio}</p>
          </SideReveal>
        </div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20 lg:mt-24 lg:space-y-24">
          {teamMembers.map((member, i) => (
            <TeamCard
              key={member.id || L(member.name, 'ar')}
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
