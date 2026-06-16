import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import { buildStructuredData, getPageSeo } from '../lib/seo'

const JSON_LD_ID = 'elgeheny-json-ld'

function upsertMeta({ name, property, content }) {
  if (!content) return
  const attr = property ? 'property' : 'name'
  const key = property || name
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink({ rel, href }) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { pathname } = useLocation()
  const { lang, t } = useLang()

  useEffect(() => {
    const seo = getPageSeo(pathname, lang, t)

    document.title = seo.title

    upsertMeta({ name: 'description', content: seo.description })
    upsertMeta({ name: 'robots', content: seo.robots })
    upsertMeta({ name: 'keywords', content: t('seo.keywords') })

    upsertLink({ rel: 'canonical', href: seo.url })

    upsertMeta({ property: 'og:title', content: seo.title })
    upsertMeta({ property: 'og:description', content: seo.description })
    upsertMeta({ property: 'og:type', content: seo.type })
    upsertMeta({ property: 'og:url', content: seo.url })
    upsertMeta({ property: 'og:image', content: seo.image })
    upsertMeta({ property: 'og:locale', content: lang === 'ar' ? 'ar_EG' : 'en_US' })
    upsertMeta({ property: 'og:site_name', content: t('seo.siteName') })

    upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta({ name: 'twitter:title', content: seo.title })
    upsertMeta({ name: 'twitter:description', content: seo.description })
    upsertMeta({ name: 'twitter:image', content: seo.image })

    let script = document.getElementById(JSON_LD_ID)
    if (!script) {
      script = document.createElement('script')
      script.id = JSON_LD_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildStructuredData(seo, lang))
  }, [pathname, lang, t])

  return null
}
