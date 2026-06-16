import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SectionReveal from '../components/SectionReveal'
import { blogPosts } from '../data/blog'
import { useLang, L } from '../i18n'

function formatDate(dateStr, locale) {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PostCard({ post, index, featured = false }) {
  const { t, lang } = useLang()
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className={featured ? 'lg:col-span-2' : ''}
    >
      <Link
        to={`/blog/${post.id}`}
        className={`group flex h-full overflow-hidden rounded-3xl border border-navy-200 bg-navy-50 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-lg ${
          featured ? 'flex-col md:flex-row' : 'flex-col'
        }`}
      >
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <LazyImage
            src={post.cover}
            alt={L(post.title, lang)}
            className={featured ? 'aspect-video h-full w-full md:aspect-auto' : 'aspect-video w-full'}
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-100/60 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-navy-100/70 px-3 py-1 text-xs font-semibold text-primary-600 backdrop-blur-md ring-1 ring-primary-300/30">
            {L(post.category, lang)}
          </span>
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? 'md:justify-center md:p-8' : ''}`}>
          <div className="mb-3 flex items-center gap-3 label-caps text-subtle">
            <span>{formatDate(post.date, t('blog.locale'))}</span>
            <span className="h-1 w-1 rounded-full bg-navy-400" />
            <span>{L(post.readTime, lang)}</span>
          </div>
          <h3
            className={`card-title text-navy-900 transition-colors group-hover:text-primary-400 ${
              featured ? 'text-2xl sm:text-3xl' : ''
            }`}
          >
            {L(post.title, lang)}
          </h3>
          <p className="mt-3 line-clamp-3 body-sm text-body">{L(post.excerpt, lang)}</p>
          <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
            {t('blog.readArticle')}
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  const [first, ...rest] = blogPosts
  const { t } = useLang()

  return (
    <>
      {/* ترويسة مبسّطة */}
      <section className="relative overflow-hidden bg-ink pt-32 pb-6 sm:pt-36">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-primary-500/10 blur-[130px]" />
        <div className="container-x relative">
          <SectionTitle as="h1">{t('blog.eyebrow')}</SectionTitle>
          <Reveal delay={0.05}>
            <h2 className="section-subtitle mt-4">{t('blog.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-desc mt-5">
              {t('blog.desc')}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionReveal>
      <section className="section-pad pt-10">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <PostCard post={first} index={0} featured />
            {rest.map((post, i) => (
              <PostCard key={post.id} post={post} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
      </SectionReveal>
    </>
  )
}
