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
          <h3 className="section-subtitle">{subtitle}</h3>
        </Reveal>
      )}

      {description && (
        <Reveal direction="up" delay={0.1}>
          <p className="section-desc">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
