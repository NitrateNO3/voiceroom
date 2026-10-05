// Google Analytics 4 wrapper. With VITE_GA_ID set, loads gtag.js and sends real
// page views / events. Without it, events are logged to the console so the
// tracking plan can be checked during the prototype.
const GA_ID = import.meta.env.VITE_GA_ID

export function initAnalytics() {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  if (!GA_ID) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function track(event, params = {}) {
  if (GA_ID) window.gtag('event', event, params)
  else console.info('[analytics]', event, params)
}

export const pageview = (path) => track('page_view', { page_path: path })
