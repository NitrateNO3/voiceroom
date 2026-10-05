import { useEffect, useRef, useState } from 'react'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

// Live audio-meter bars — the visual signature of "voice".
export function Wave({ bars = 28, className = '' }) {
  return (
    <span className={`wave-live ${className}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <i key={i} style={{ '--h': `${30 + Math.abs(Math.sin(i * 1.3)) * 70}%`, '--d': `${(i % 7) * -0.13}s`, '--t': `${0.7 + (i % 5) * 0.12}s` }} />
      ))}
    </span>
  )
}

export function CountUp({ to, suffix = '', duration = 1600 }) {
  const [ref, seen] = useInView(0.5)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduced()) return setN(to)
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix && <sup>{suffix}</sup>}</span>
}

// Words light up one by one as the paragraph scrolls through the viewport.
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const [p, setP] = useState(reduced() ? 1 : 0)
  const words = text.split(' ')
  useEffect(() => {
    if (reduced()) return
    const on = () => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const vh = window.innerHeight
      setP(Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35))))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((w, i) => {
        const lit = p * words.length - i
        const em = w.startsWith('*')
        return (
          <span key={i} className={em ? 'em' : ''} style={{ opacity: 0.14 + 0.86 * Math.max(0, Math.min(1, lit)) }}>
            {em ? w.slice(1) : w}{' '}
          </span>
        )
      })}
    </p>
  )
}

// Tracks the pointer inside an element as CSS vars (--mx / --my in px) for spotlight effects.
export function useSpotlight() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || !window.matchMedia('(hover: hover)').matches) return
    let raf
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
        el.classList.add('tracking')
      })
    }
    const leave = () => el.classList.remove('tracking')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf) }
  }, [])
  return ref
}
