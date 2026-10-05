import { useEffect } from 'react'

// Per-page <title> and meta description. For production SEO, pre-render
// these pages (e.g. vite-plugin-ssr / static export) so crawlers see them.
export function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — Miyagi` : 'Miyagi — Find your voice'
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
