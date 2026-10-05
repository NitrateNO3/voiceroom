import { useState } from 'react'
import { Check } from 'lucide-react'
import { addLead } from '../lib/store'
import { track } from '../lib/analytics'

export default function EnquiryForm({ program, title = 'Enquire', compact }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', who: 'Parent', note: '' })
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    addLead('enquiry', `${f.name} (${f.who}) — ${program || 'General'} · ${f.phone}`, program ? `Programs / ${program}` : 'Contact page')
    track('generate_lead', { program })
    setDone(true)
  }

  if (done)
    return (
      <div className="panel success-box">
        <div className="tick"><Check /></div>
        <h3>Got it, {f.name.split(' ')[0] || 'thanks'}.</h3>
        <p className="muted" style={{ marginTop: 10 }}>We’ll call you on {f.phone} within one working day with batch timings and fees.</p>
      </div>
    )

  return (
    <form className="panel" onSubmit={submit}>
      <h3 style={{ marginBottom: 6 }}>{title}</h3>
      <p className="muted" style={{ fontSize: 15, marginBottom: 22 }}>
        {program ? <>About <b>{program}</b>. We reply within a working day.</> : 'We reply within a working day.'}
      </p>
      <div className="seg">
        {['Parent', 'Student', 'School / College', 'Company'].map((w) => (
          <button type="button" key={w} className={`filter-btn ${f.who === w ? 'on' : ''}`} style={{ height: 34, fontSize: 14 }} onClick={() => setF({ ...f, who: w })}>{w}</button>
        ))}
      </div>
      <div className="field"><label htmlFor="n">Full name</label><input id="n" required value={f.name} onChange={set('name')} /></div>
      <div className="row-2">
        <div className="field"><label htmlFor="p">Phone</label><input id="p" required inputMode="tel" placeholder="+91" value={f.phone} onChange={set('phone')} /></div>
        <div className="field"><label htmlFor="e">Email</label><input id="e" type="email" value={f.email} onChange={set('email')} /></div>
      </div>
      {!compact && (
        <div className="field"><label htmlFor="m">Anything we should know?</label><textarea id="m" value={f.note} onChange={set('note')} placeholder="Age / grade, preferred timings, school name…" /></div>
      )}
      <button className="btn btn-block">Send message</button>
    </form>
  )
}
