import { company } from '../data/site'
import { getProjects, getProjectById } from '../data/projects'
import { getBlogPosts } from '../data/blog'
import { L } from '../i18n'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://el-geheny.vercel.app').replace(/\/$/, '')
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/building.jpg`

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function resolveOgImage(image) {
  if (typeof image === 'string' && /^https?:\/\//.test(image)) return image
  return DEFAULT_OG_IMAGE
}

function trimDescription(text, max = 160) {
  if (!text) return ''
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trim()}…`
}

function titleWithBrand(pageTitle, lang) {
  const brand = L(company.name, lang)
  if (!pageTitle || pageTitle === brand) return `${brand} | ${L(company.slogan, lang)}`
  return `${pageTitle} | ${brand}`
}

export function getPageSeo(pathname, lang, t) {
  const path = pathname.replace(/\/$/, '') || '/'
  const brand = L(company.name, lang)

  const staticPages = {
    '/': {
      title: titleWithBrand(brand, lang),
      description: t('seo.home.description'),
      type: 'website',
    },
    '/about': {
      title: titleWithBrand(t('seo.about.title'), lang),
      description: t('seo.about.description'),
      type: 'website',
    },
    '/projects': {
      title: titleWithBrand(t('seo.projects.title'), lang),
      description: t('seo.projects.description'),
      type: 'website',
    },
    '/blog': {
      title: titleWithBrand(t('seo.blog.title'), lang),
      description: t('seo.blog.description'),
      type: 'website',
    },
    '/contact': {
      title: titleWithBrand(t('seo.contact.title'), lang),
      description: t('seo.contact.description'),
      type: 'website',
    },
  }

  if (staticPages[path]) {
    return {
      ...staticPages[path],
      url: absoluteUrl(path === '/' ? '/' : path),
      image: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      schemaType: path === '/' ? 'home' : 'page',
    }
  }

  const projectMatch = path.match(/^\/projects\/([^/]+)$/)
  if (projectMatch) {
    const project = getProjectById(projectMatch[1])
    if (project) {
      const title = L(project.title, lang)
      const description = L(project.shortDescription || project.description, lang)
      return {
        title: titleWithBrand(title, lang),
        description: trimDescription(description),
        url: absoluteUrl(path),
        image: resolveOgImage(project.cover),
        type: 'article',
        robots: 'index, follow',
        schemaType: 'project',
        project,
      }
    }
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/)
  if (blogMatch) {
    const post = getBlogPosts().find((p) => p.id === blogMatch[1])
    if (post) {
      const title = L(post.title, lang)
      const description = L(post.excerpt, lang)
      return {
        title: titleWithBrand(title, lang),
        description: trimDescription(description),
        url: absoluteUrl(path),
        image: resolveOgImage(post.cover),
        type: 'article',
        robots: 'index, follow',
        schemaType: 'article',
        post,
      }
    }
  }

  return {
    title: titleWithBrand(t('seo.notFound.title'), lang),
    description: t('seo.notFound.description'),
    url: absoluteUrl(path),
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    robots: 'noindex, follow',
    schemaType: 'notFound',
  }
}

export function buildStructuredData(seo, lang) {
  const organization = {
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organization`,
    name: L(company.name, lang),
    alternateName: L(company.nameShort, lang),
    description: L(
      {
        ar: 'شركة تطوير عقاري في القاهرة الجديدة منذ عام 1990، متخصصة في المشاريع السكنية والاستثمارية.',
        en: 'Real estate development company in New Cairo since 1990, specializing in residential and investment projects.',
      },
      lang,
    ),
    url: absoluteUrl('/'),
    logo: DEFAULT_OG_IMAGE,
    image: DEFAULT_OG_IMAGE,
    telephone: `+${company.phoneIntl}`,
    email: company.email,
    foundingDate: String(company.since),
    address: {
      '@type': 'PostalAddress',
      streetAddress: L(company.address, lang),
      addressLocality: lang === 'ar' ? 'القاهرة الجديدة' : 'New Cairo',
      addressRegion: lang === 'ar' ? 'القاهرة' : 'Cairo',
      addressCountry: 'EG',
    },
    sameAs: Object.values(company.social),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: lang === 'ar' ? 'القاهرة الجديدة' : 'New Cairo',
    },
  }

  const graph = [organization]

  if (seo.schemaType === 'home') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: absoluteUrl('/'),
      name: L(company.name, lang),
      description: seo.description,
      inLanguage: ['ar-EG', 'en-US'],
      publisher: { '@id': `${SITE_URL}/#organization` },
    })
  }

  if (seo.schemaType === 'project' && seo.project) {
    graph.push({
      '@type': 'Residence',
      name: L(seo.project.title, lang),
      description: L(seo.project.shortDescription || seo.project.description, lang),
      url: seo.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: L(seo.project.location, lang),
        addressCountry: 'EG',
      },
      provider: { '@id': `${SITE_URL}/#organization` },
    })
  }

  if (seo.schemaType === 'article' && seo.post) {
    graph.push({
      '@type': 'BlogPosting',
      headline: L(seo.post.title, lang),
      description: L(seo.post.excerpt, lang),
      datePublished: seo.post.date,
      author: {
        '@type': 'Organization',
        name: L(seo.post.author, lang),
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      image: resolveOgImage(seo.post.cover),
      url: seo.url,
      inLanguage: lang === 'ar' ? 'ar-EG' : 'en-US',
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function getSitemapPaths() {
  const paths = ['/', '/about', '/projects', '/blog', '/contact']
  getProjects().forEach((p) => paths.push(`/projects/${p.id}`))
  getBlogPosts().forEach((p) => paths.push(`/blog/${p.id}`))
  return paths
}
