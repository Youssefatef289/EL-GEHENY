import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LazyImage from './LazyImage'
import { useLang, L } from '../i18n'

export default function PlanLightbox({ items, index, onClose, onChange, title, imageVariant = 'default' }) {
  const { t, lang } = useLang()
  const open = index !== null && index >= 0 && index < items.length
  const current = open ? items[index] : null

  const goPrev = useCallback(() => {
    if (!open) return
    onChange(index === 0 ? items.length - 1 : index - 1)
  }, [index, items.length, onChange, open])

  const goNext = useCallback(() => {
    if (!open) return
    onChange(index === items.length - 1 ? 0 : index + 1)
  }, [index, items.length, onChange, open])

  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, goPrev, goNext])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('project.layoutPlansTitle')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6"
        >
          <button
            type="button"
            aria-label={t('common.close')}
            onClick={onClose}
            className="absolute inset-0 bg-black/92 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative z-10 flex w-full flex-col ${
              imageVariant === 'gallery'
                ? 'max-w-[min(99vw,1680px)]'
                : 'h-[min(96vh,940px)] max-w-[min(98vw,1360px)]'
            }`}
          >
            <div className="mb-3 flex shrink-0 items-center justify-between gap-4 sm:mb-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gradient-primary">{title}</p>
                <p className="mt-1 text-xs font-medium text-primary-200/85">
                  {L(current.label, lang)} · {index + 1} / {items.length}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('common.close')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-400/40 bg-primary-500/10 text-primary-100 transition-colors hover:border-primary-300 hover:bg-primary-500/20"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-primary-400/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] bg-transparent ${
                imageVariant === 'gallery' ? 'w-full' : 'min-h-0 flex-1'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className={`flex w-full items-center justify-center ${
                    imageVariant === 'gallery' ? 'p-1 sm:p-2' : 'h-full p-2 sm:p-4'
                  }`}
                >
                  <LazyImage
                    src={current.src}
                    alt={`${title} - ${L(current.label, lang)}`}
                    fit="contain"
                    className="w-full bg-transparent"
                    imgClassName={
                      imageVariant === 'gallery'
                        ? 'max-h-[min(90vh,960px)] w-full'
                        : 'mx-auto max-h-[min(82vh,860px)] w-full max-w-full'
                    }
                  />
                </motion.div>
              </AnimatePresence>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t('common.prev')}
                    className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-400/40 bg-ink/60 text-primary-100 shadow-lg backdrop-blur-md transition-colors hover:border-primary-300 hover:bg-ink/80 sm:start-5 sm:h-12 sm:w-12"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 rtl:rotate-180" aria-hidden="true">
                      <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t('common.next')}
                    className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary-400/40 bg-ink/60 text-primary-100 shadow-lg backdrop-blur-md transition-colors hover:border-primary-300 hover:bg-ink/80 sm:end-5 sm:h-12 sm:w-12"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 rtl:rotate-180" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
