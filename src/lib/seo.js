import { useEffect } from 'react'

// Basic SEO: per-page <title>, meta description, Open Graph / Twitter tags,
// canonical URL and optional JSON-LD. For production, pre-render these pages
// (e.g. vite-plugin-ssg) so crawlers see the tags without running JavaScript.
export const SITE_URL = 'https://voiceroom.in'
const DEFAULT_TITLE = 'Voiceroom · Public speaking classes in Gurugram'
const DEFAULT_IMAGE = '/img/discussion.jpg'

function meta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export function useSEO(title, description, { image = DEFAULT_IMAGE, type = 'website', jsonLd } = {}) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const full = title ? `${title} · Voiceroom` : DEFAULT_TITLE
    const url = SITE_URL + window.location.pathname
    document.title = full
    if (description) {
      meta('name', 'description', description)
      meta('property', 'og:description', description)
      meta('name', 'twitter:description', description)
    }
    meta('property', 'og:title', full)
    meta('name', 'twitter:title', full)
    meta('property', 'og:type', type)
    meta('property', 'og:url', url)
    meta('property', 'og:image', SITE_URL + image)

    let canon = document.head.querySelector('link[rel="canonical"]')
    if (!canon) {
      canon = document.createElement('link')
      canon.rel = 'canonical'
      document.head.appendChild(canon)
    }
    canon.href = url

    let script = document.getElementById('page-jsonld')
    if (ld) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'page-jsonld'
        document.head.appendChild(script)
      }
      script.textContent = ld
    } else script?.remove()
  }, [title, description, image, type, ld])
}
