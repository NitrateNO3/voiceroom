import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { X, Phone, Check } from 'lucide-react'
import { addLead } from '../lib/store'
import { track } from '../lib/analytics'

// Brief: "collect phone number as and when person lands on website".
// Slides in a few seconds after landing (not instantly — less hostile, better
// conversion). If dismissed, collapses to a small pill so it's still reachable.
// Any button can open it with: window.dispatchEvent(new Event('voiceroom:callback'))
const KEY = 'voiceroom-capture'
const DELAY_MS = 3500

const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const write = (v) => { try { localStorage.setItem(KEY, v) } catch {} }
export const openCallback = () => window.dispatchEvent(new Event('voiceroom:callback'))

// The phone form itself — used in the popup and inline on the home page.
export function PhoneForm({ source, onDone, cta = 'Call me back' }) {
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
        <p className="muted" style={{ margin: '6px 0 0' }}>We’ll call you within one working day, usually sooner.</p>
      </div>
    )

  return (
    <form onSubmit={submit} className="phone-form">
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
      <button className="btn btn-block" style={{ marginTop: 12 }}>{cta}</button>
      <p className="fine">We only use your number to call you back about classes.</p>
    </form>
  )
}

export default function PhoneCapture() {
  const [mode, setMode] = useState('hidden') // hidden | open | pill | done

  useEffect(() => {
    const saved = read()
    const open = () => { setMode('open'); track('phone_capture_shown', { trigger: 'button' }) }
    window.addEventListener('voiceroom:callback', open)
    let t
    if (saved === 'done') setMode('done')
    else if (saved === 'dismissed') setMode('pill')
    else t = setTimeout(() => { setMode('open'); track('phone_capture_shown', { trigger: 'landing' }) }, DELAY_MS)
    return () => { clearTimeout(t); window.removeEventListener('voiceroom:callback', open) }
  }, [])

  const dismiss = () => { if (read() !== 'done') { write('dismissed'); setMode('pill') } else setMode('done') }

  if (mode === 'pill')
    return (
      <button className="capture-pill" onClick={() => setMode('open')}>
        <Phone /> Call me back
      </button>
    )

  if (mode !== 'open') return null

  return (
    <aside className="capture" aria-label="Request a callback">
      <button className="capture-close" onClick={dismiss} aria-label="Close"><X /></button>
      <h3>Want us to call you?</h3>
      <p>Leave your number and a coach will ring you to talk about classes for you or your child. No obligation.</p>
      <PhoneForm source="Welcome popup" onDone={() => setTimeout(() => setMode('done'), 3200)} />
    </aside>
  )
}
