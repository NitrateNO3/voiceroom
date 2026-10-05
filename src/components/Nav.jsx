import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { openCallback } from './PhoneCapture'

export const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/learn', 'Articles'],
  ['/podcast', 'Podcast & videos'],
  ['/contact', 'Contact'],
]

export function Logo({ to = '/' }) {
  return (
    <Link to={to} className="logo" aria-label="Voiceroom home">
      <span className="logo-mark" aria-hidden="true" />
      Voiceroom
    </Link>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          </nav>
          <div className="nav-cta">
            <button className="btn btn-sm" onClick={openCallback}><Phone /> Call me back</button>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true">
          <div className="drawer-top">
            <Logo />
            <button className="burger" style={{ display: 'grid' }} onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <nav>
            {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          </nav>
          <button className="btn btn-block" onClick={() => { setOpen(false); openCallback() }}><Phone /> Ask us to call you</button>
        </div>
      )}
    </>
  )
}
