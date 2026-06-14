import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'gold',
  className = '',
}) {
  const label = eyebrow || title
  const subtitle = eyebrow && title && eyebrow !== title ? title : null

  if (!label) return null

  return (
    <div className={`section-heading flex w-full flex-col gap-4 ${className}`}>
      <SectionTitle tone={tone}>{label}</SectionTitle>

      {subtitle && (
        <Reveal direction="up" delay={0.05}>
          <h3 className="heading-lg max-w-3xl text-navy-900">{subtitle}</h3>
        </Reveal>
      )}

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
