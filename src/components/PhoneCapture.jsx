import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { X, Phone, Check, ArrowRight } from 'lucide-react'
import Art from './Art'
import { addLead } from '../lib/store'
import { track } from '../lib/analytics'

// Brief: "collect phone number as and when person lands on website".
// Slides in a few seconds after landing (not instantly — less hostile, better
// conversion). If dismissed, collapses to a small pill so it's still reachable.
// Any button can open it with: window.dispatchEvent(new Event('miyagi:callback'))
const KEY = 'miyagi-capture'
const DELAY_MS = 3500

const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const write = (v) => { try { localStorage.setItem(KEY, v) } catch {} }
export const openCallback = () => window.dispatchEvent(new Event('miyagi:callback'))

// The phone form itself — used in the popup and inline on the home page.
export function PhoneForm({ source, onDone, dark }) {
  const { pathname } = useLocation()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (!/^[6-9]\d{9}$/.test(digits)) return setErr('Enter a valid 10-digit mobile number')
    addLead('phone', `+91 ${digits.slice(0, 5)} ${digits.slice(5)}${name ? ` · ${name}` : ''}`, `${source} (${pathname})`)
    track('phone_captured', { source, page: pathname })
    write('done')
    setDone(true)
    onDone?.()
  }

  if (done)
    return (
      <div className="success-box" style={{ padding: 8 }}>
        <div className="tick"><Check /></div>
        <h3>Thanks{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
        <p className={dark ? '' : 'muted'} style={{ margin: '8px 0 0' }}>A Miyagi coach will call you within one working day.</p>
      </div>
    )

  return (
    <form onSubmit={submit} className={`phone-form ${dark ? 'on-dark' : ''}`}>
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
      {err && <p className="err">{err}</p>}
      <button className="btn btn-ember btn-block" style={{ marginTop: 12 }}>Call me back <ArrowRight /></button>
      <p className="capture-fine">We’ll only call about Miyagi. No spam, ever.</p>
    </form>
  )
}

export default function PhoneCapture() {
  const [mode, setMode] = useState('hidden') // hidden | open | pill | done

  useEffect(() => {
    const saved = read()
    const open = () => { setMode('open'); track('phone_capture_shown', { trigger: 'button' }) }
    window.addEventListener('miyagi:callback', open)
    let t
    if (saved === 'done') setMode('done')
    else if (saved === 'dismissed') setMode('pill')
    else t = setTimeout(() => { setMode('open'); track('phone_capture_shown', { trigger: 'landing' }) }, DELAY_MS)
    return () => { clearTimeout(t); window.removeEventListener('miyagi:callback', open) }
  }, [])

  const dismiss = () => { if (read() !== 'done') { write('dismissed'); setMode('pill') } else setMode('done') }

  if (mode === 'pill')
    return (
      <button className="capture-pill" onClick={() => setMode('open')}>
        <i><Phone /></i> Get a free callback
      </button>
    )

  if (mode !== 'open') return null

  return (
    <aside className="capture" aria-label="Request a callback">
      <button className="capture-close" onClick={dismiss} aria-label="Close"><X /></button>
      <Art tone="ember" src="/img/mic-blue.jpg" shade="bottom" className="capture-art">
        <span className="display">Not sure where<br /><em>to start?</em></span>
      </Art>
      <div className="capture-body">
        <p>Leave your number — a coach will call to suggest the right next step for you or your child. Takes 5 minutes.</p>
        <PhoneForm source="Welcome popup" onDone={() => setTimeout(() => setMode('done'), 3200)} />
      </div>
    </aside>
  )
}
