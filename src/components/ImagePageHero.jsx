import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroProjectImage from '../../images/hero project.webp'

export { heroProjectImage }

export default function ImagePageHero({
  image = heroProjectImage,
  imageAlt,
  eyebrow,
  title,
  titleStack,
  description,
  breadcrumb = [],
  children,
  className = '',
}) {
  return (
    <section className={`image-page-hero relative w-full bg-ink ${className}`}>
      <div className="image-page-hero-shell relative min-h-[calc(16rem+5.75rem)] w-full sm:min-h-[calc(18rem+6.5rem)] lg:min-h-[calc(20rem+7.25rem)] xl:min-h-[calc(21rem+7.75rem)]">
        <div className="image-page-hero-media absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title || ''}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="image-page-hero-shadow image-page-hero-shadow--base" aria-hidden="true" />
          <div className="image-page-hero-shadow image-page-hero-shadow--top" aria-hidden="true" />
          <div className="image-page-hero-shadow image-page-hero-shadow--bottom" aria-hidden="true" />
          <div className="image-page-hero-shadow image-page-hero-shadow--vignette" aria-hidden="true" />
        </div>

        <div className="image-page-hero-content relative z-10 flex min-h-[inherit] flex-col justify-end overflow-visible px-5 pb-10 pt-[5.75rem] sm:px-8 sm:pb-12 sm:pt-[6.5rem] lg:px-12 lg:pb-14 lg:pt-[7.25rem] xl:pt-[7.75rem]">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center overflow-visible text-center">
            {breadcrumb.length > 0 && (
              <motion.nav
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs text-white/75 sm:text-sm"
              >
                {breadcrumb.map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {item.to ? (
                      <Link to={item.to} className="transition-colors hover:text-primary-300">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-primary-300">{item.label}</span>
                    )}
                    {i < breadcrumb.length - 1 && (
                      <span className="text-white/35" aria-hidden="true">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </motion.nav>
            )}

            {titleStack ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="project-hero-stack w-full"
              >
                <p className="project-hero-company text-gradient-primary">{titleStack.company}</p>
                <h1 className="project-hero-district">{titleStack.district}</h1>
                <p className="project-hero-location">{titleStack.location}</p>
              </motion.div>
            ) : (
              <>
                {eyebrow && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.04 }}
                    className="eyebrow mb-3 border-white/25 bg-white/10 text-white backdrop-blur-md"
                  >
                    {eyebrow}
                  </motion.span>
                )}

                {title && (
                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="heading-md w-full text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] sm:text-3xl lg:text-4xl"
                  >
                    {title}
                  </motion.h1>
                )}
              </>
            )}

            {!titleStack && description && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-2 w-full max-w-2xl text-sm leading-relaxed text-white/88 sm:mt-2.5 sm:text-base"
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="mt-3 w-full sm:mt-4"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
