import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

export const LINKS = [
  ['/about', 'About'],
  ['/team', 'Team'],
  ['/programs', 'Programs'],
  ['/corporate', 'Corporate'],
  ['/events', 'Events'],
  ['/learn', 'Learn'],
  ['/contact', 'Contact'],
]

export function Logo({ to = '/' }) {
  return (
    <Link to={to} className="logo" aria-label="Miyagi home">
      <span className="seal">m</span>
      miyagi
    </Link>
  )
}

const NEWS = [
  <>Inter-School Debate League · Season 3 opens 2 Nov — <Link to="/events/debate-league-s3">register your team</Link></>,
  <>Open Mic Night · 18 Oct · Hauz Khas — <Link to="/events/open-mic-october">19 seats left</Link></>,
  <>New: corporate communication workshops for teams — <Link to="/corporate">see formats</Link></>,
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  // Pages that open on a dark photo hero mark it with data-hero-dark; the nav
  // goes transparent with light text while it's over that hero.
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 8)
      const hero = document.querySelector('[data-hero-dark]')
      setOnDark(!!hero && hero.getBoundingClientRect().bottom > 90)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <div className="announce">
        <div className="marquee">
          {[0, 1].map((k) => NEWS.map((n, i) => <span key={`${k}-${i}`}>{n}</span>))}
        </div>
      </div>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${onDark ? 'on-dark' : ''}`}>
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {LINKS.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          </nav>
          <div className="nav-cta">
            <Link to="/events" className="btn btn-sm btn-ember">Book an event <ArrowRight /></Link>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true">
          <div className="drawer-top">
            <Link to="/" className="logo" style={{ color: 'var(--paper)' }}><span className="seal">m</span>miyagi</Link>
            <button className="burger" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <nav>
            {[['/', 'Home'], ...LINKS].map(([to, label], i) => (
              <Link key={to} to={to} style={{ animationDelay: `${60 + i * 45}ms` }}>{label}<small>0{i + 1}</small></Link>
            ))}
          </nav>
          <Link to="/events" className="btn btn-block btn-ember">Book an event <ArrowRight /></Link>
        </div>
      )}
    </>
  )
}
