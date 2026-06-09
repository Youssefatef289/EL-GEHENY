import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import { blogPosts } from '../data/blog'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PostCard({ post, index, featured = false }) {
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
            alt={post.title}
            className={featured ? 'aspect-video h-full w-full md:aspect-auto' : 'aspect-video w-full'}
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-100/60 to-transparent" />
          <span className="absolute right-4 top-4 rounded-full bg-navy-100/70 px-3 py-1 text-xs font-semibold text-primary-600 backdrop-blur-md ring-1 ring-primary-300/30">
            {post.category}
          </span>
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? 'md:justify-center md:p-8' : ''}`}>
          <div className="mb-3 flex items-center gap-3 text-xs text-navy-600">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-navy-400" />
            <span>{post.readTime}</span>
          </div>
          <h3
            className={`font-display font-bold text-navy-900 transition-colors group-hover:text-primary-600 ${
              featured ? 'text-2xl' : 'text-lg'
            }`}
          >
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy-700">{post.excerpt}</p>
          <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
            اقرأ المقال
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

  return (
    <>
      <PageHeader
        eyebrow="المدونة"
        title="رؤى ومقالات عقارية"
        description="نصائح وتحليلات وأخبار من عالم العقارات لمساعدتك على اتخاذ قرارات استثمارية أذكى."
        breadcrumb={[{ label: 'الرئيسية', to: '/' }, { label: 'المدونة' }]}
      />

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
    </>
  )
}
