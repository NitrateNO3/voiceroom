import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { addLead } from '../lib/store'
import { track } from '../lib/analytics'

export default function Newsletter({ source = 'Footer' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    addLead('newsletter', email, source)
    track('newsletter_signup', { source })
    setDone(true)
  }

  return (
    <section className="dark section-tight news-section">
      <div className="wrap newsletter">
        <div>
          <span className="label label-dot">The Sunday Letter</span>
          <h2 style={{ marginTop: 18 }}>One idea a week to <em>speak better.</em></h2>
        </div>
        <div>
          <p className="muted" style={{ marginBottom: 20 }}>
            Short drills, new articles, podcast drops and first dibs on event seats. Free, no spam, unsubscribe anytime.
          </p>
          {done ? (
            <p style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 600 }}>
              <Check size={20} color="var(--sun)" /> You’re in. First letter lands Sunday.
            </p>
          ) : (
            <form className="news-form" onSubmit={submit}>
              <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
              <button className="btn btn-sm" type="submit">Subscribe <ArrowRight /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
