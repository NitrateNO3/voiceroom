import { useState } from 'react'
import { Check } from 'lucide-react'
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
        <h3>The Sunday Letter</h3>
        <p>One short speaking exercise every Sunday, plus new articles and episodes. Unsubscribe whenever you like.</p>
      </div>
      {done ? (
        <p className="news-done"><Check size={20} color="var(--marker)" /> Done. Your first letter arrives this Sunday.</p>
      ) : (
        <form className="news-form" onSubmit={submit}>
          <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
          <button className="btn btn-light" type="submit">Subscribe</button>
        </form>
      )}
    </div>
  )
}
