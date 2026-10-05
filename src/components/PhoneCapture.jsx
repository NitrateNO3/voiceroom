import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { X, Phone, Check, ArrowRight } from 'lucide-react'
import Art from './Art'
import { addLead } from '../lib/store'
import { track } from '../lib/analytics'

// PRD: "collect phone number as and when person lands on website".
// Slides in a few seconds after landing (not instantly — less hostile, better
// conversion). If dismissed, collapses to a small pill so it's still reachable.
const KEY = 'miyagi-capture'
const DELAY_MS = 3500

const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const write = (v) => { try { localStorage.setItem(KEY, v) } catch {} }

export default function PhoneCapture() {
  const { pathname } = useLocation()
  const [mode, setMode] = useState('hidden') // hidden | open | pill | done
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    const saved = read()
    if (saved === 'done') return setMode('done')
    if (saved === 'dismissed') return setMode('pill')
    // Never interrupt checkout: on event pages, offer the pill instead of the popup.
    const t = setTimeout(() => {
      if (window.location.pathname.startsWith('/events/')) return setMode('pill')
      setMode('open'); track('phone_capture_shown')
    }, DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  if (pathname.startsWith('/admin')) return null

  const dismiss = () => { write('dismissed'); setMode('pill') }
  const submit = (e) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit mobile number')
    addLead('phone', `+91 ${digits.slice(0, 5)} ${digits.slice(5)}${name ? ` · ${name}` : ''}`, `Welcome popup (${pathname})`)
    track('phone_captured', { page: pathname })
    write('done')
    setMode('thanks')
    setTimeout(() => setMode('done'), 3200)
  }

  if (mode === 'pill')
    return (
      <button className="capture-pill" onClick={() => setMode('open')}>
        <i><Phone /></i> Get a free callback
      </button>
    )

  if (mode !== 'open' && mode !== 'thanks') return null

  return (
    <aside className="capture" aria-label="Request a callback">
      <button className="capture-close" onClick={dismiss} aria-label="Close"><X /></button>
      <Art tone="ember" src="/img/mic-blue.jpg" shade="bottom" className="capture-art">
        <span className="display">Not sure where<br /><em>to start?</em></span>
      </Art>
      <div className="capture-body">
        {mode === 'thanks' ? (
          <div className="success-box" style={{ padding: 8 }}>
            <div className="tick"><Check /></div>
            <h3>Thanks{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
            <p style={{ margin: '8px 0 0' }}>A Miyagi coach will call you within one working day.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p>Leave your number — a coach will call to suggest the right program for you or your child. Takes 5 minutes.</p>
            <div className="field">
              <input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
            </div>
            <div className="phone-input">
              <span>+91</span>
              <input
                inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210"
                value={phone} maxLength={11}
                onChange={(e) => { setPhone(e.target.value.replace(/[^\d ]/g, '')); setErr('') }}
                aria-label="Mobile number"
              />
            </div>
            {err && <p className="err" style={{ color: 'var(--ember-deep)', fontSize: 13, margin: '8px 0 0' }}>{err}</p>}
            <button className="btn btn-ember btn-block" style={{ marginTop: 12 }}>Call me back <ArrowRight /></button>
            <p className="capture-fine">We’ll only call about Miyagi programs. No spam, ever.</p>
          </form>
        )}
      </div>
    </aside>
  )
}
