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
    <div className="news-card" id="newsletter">
      <div>
        <span className="label label-dot">The Sunday Letter</span>
        <h3>One idea a week to <em>speak better.</em></h3>
        <p>Short drills, new articles and podcast drops. Free, no spam.</p>
      </div>
      {done ? (
        <p className="news-done"><Check size={20} color="var(--gold)" /> You’re in. First letter lands Sunday.</p>
      ) : (
        <form className="news-form" onSubmit={submit}>
          <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button className="btn btn-sm btn-ember" type="submit">Subscribe <ArrowRight /></button>
        </form>
      )}
    </div>
  )
}
