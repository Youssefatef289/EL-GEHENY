import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'center', className = '' }) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-right items-start'

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${align === 'center' ? 'max-w-3xl' : ''} ${className}`}>
      {eyebrow && (
        <Reveal direction="up">
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.05}>
        <h2 className="heading-lg text-navy-900">{title}</h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-navy-700 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
