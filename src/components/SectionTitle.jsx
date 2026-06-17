import Reveal from './Reveal'
import { useLang } from '../i18n'

/**
 * عنوان سكشن: نص ذهبي + خط أفقي
 * @param {'gold'|'light'} tone — ذهبي على خلفية داكنة، أو أبيض فوق صور
 */
export default function SectionTitle({
  as: Tag = 'h2',
  children,
  className = '',
  lineClassName = '',
  tone = 'gold',
  reveal = true,
  revealDelay = 0,
}) {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  const textTone =
    tone === 'light' ? 'text-white' : 'text-gradient-primary'
  const lineTone =
    tone === 'light' ? 'bg-white/85' : 'bg-primary-400'

  const content = (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`section-title flex w-full items-center gap-3 sm:gap-4 ${className}`}
    >
      <Tag
        dir="auto"
        className={`section-title-text heading-lg shrink-0 font-sans font-extrabold leading-tight ${textTone}`}
      >
        {children}
      </Tag>
      <span
        className={`section-title-line h-px flex-1 ${lineTone} ${lineClassName}`}
        aria-hidden="true"
      />
    </div>
  )

  if (!reveal) return content

  return (
    <Reveal direction="up" delay={revealDelay}>
      {content}
    </Reveal>
  )
}
