import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { getPostById, blogPosts } from '../data/blog'
import { useLang, L } from '../i18n'

function formatDate(dateStr, locale) {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const { id } = useParams()
  const post = getPostById(id)
  const { t, lang } = useLang()

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <>
      <section className="relative pt-32 sm:pt-40">
        <div className="absolute inset-0 h-[55vh]">
          <LazyImage src={post.cover} alt={L(post.title, lang)} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
        </div>

        <div className="container-x relative z-10 mx-auto flex min-h-[35vh] max-w-3xl flex-col justify-end pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-5">{L(post.category, lang)}</span>
            <h1 className="heading-lg mt-2 text-navy-900">{L(post.title, lang)}</h1>
            <div className="mt-5 flex items-center justify-center gap-4 text-sm text-navy-700">
              <span>{L(post.author, lang)}</span>
              <span className="h-1 w-1 rounded-full bg-navy-400" />
              <span>{formatDate(post.date, t('blog.locale'))}</span>
              <span className="h-1 w-1 rounded-full bg-navy-400" />
              <span>{L(post.readTime, lang)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="section-pad pt-12">
        <div className="container-x mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-8 border-r-4 border-primary-400 pr-5 text-lg font-medium leading-relaxed text-navy-700">
              {L(post.excerpt, lang)}
            </p>
          </Reveal>

          <div className="space-y-6">
            {L(post.content, lang).map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-loose text-navy-700">{para}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-navy-200 pt-8">
            <Link to="/blog" className="btn-outline">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('blog.allArticles')}
            </Link>
            <Link to="/contact" className="btn-primary">{t('blog.investWithUs')}</Link>
          </div>
        </div>
      </article>

      {/* مقالات ذات صلة */}
      <section className="section-pad pt-0">
        <div className="container-x">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy-900">{t('blog.relatedTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${p.id}`}
                  className="group block overflow-hidden rounded-3xl border border-navy-200 bg-navy-50 transition-all hover:-translate-y-1 hover:border-primary-400/40"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <LazyImage
                      src={p.cover}
                      alt={L(p.title, lang)}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary-600">{L(p.category, lang)}</span>
                    <h3 className="mt-1 font-display text-lg font-bold text-navy-900 group-hover:text-primary-600">
                      {L(p.title, lang)}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
