import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutGrid, CalendarDays, PenLine, Ticket, Users, ExternalLink, LogOut, RotateCcw, Plus, Pencil, Trash2,
  ArrowRight, Download, Menu, Bold, Italic, Heading2, Link2, Quote, ImagePlus, Search,
} from 'lucide-react'
import Art from '../components/Art'
import { Logo } from '../components/Nav'
import { toast } from '../components/Toast'
import { store, useStore } from '../lib/store'
import { formatDate, rupees, isPastEvent } from '../data'
import { useSEO } from '../lib/seo'

const today = new Date().toISOString().slice(0, 10)
const isPast = isPastEvent
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const when = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

/* ───────────── Login ───────────── */
function Login({ onIn }) {
  const [email, setEmail] = useState('team@miyagi.in')
  const [pw, setPw] = useState('')
  return (
    <div className="admin-login">
      <Art tone="ink" pattern="rings">
        <Logo />
        <p className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', maxWidth: '12ch' }}>
          Publish without a <em>developer.</em>
        </p>
      </Art>
      <div className="form-side">
        <form style={{ width: '100%', maxWidth: 380 }} onSubmit={(e) => { e.preventDefault(); onIn() }}>
          <span className="label">Miyagi admin</span>
          <h1 style={{ fontSize: 44, margin: '12px 0 28px' }}>Sign in</h1>
          <div className="field"><label htmlFor="ae">Email</label><input id="ae" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="field"><label htmlFor="ap">Password</label><input id="ap" type="password" placeholder="Any password works in the prototype" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
          <button className="btn btn-block" style={{ marginTop: 8 }}>Sign in <ArrowRight /></button>
          <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>Prototype: no real authentication yet.</p>
          <Link to="/" className="link-arrow" style={{ marginTop: 24, fontSize: 14 }}>Back to website</Link>
        </form>
      </div>
    </div>
  )
}

/* ───────────── Overview ───────────── */
function Overview({ go }) {
  const { registrations, leads, events } = useStore()
  const revenue = registrations.reduce((s, r) => s + r.amount, 0)
  const live = events.filter((e) => !isPast(e))
  return (
    <>
      <div className="kpis">
        <div className="kpi"><span className="label">Revenue</span><b>{rupees(revenue)}</b><small>↑ 18% vs last month</small></div>
        <div className="kpi"><span className="label">Registrations</span><b>{registrations.length}</b><small>across {live.length} live events</small></div>
        <div className="kpi"><span className="label">Phone leads</span><b>{leads.filter((l) => l.kind === 'phone').length}</b><small>from welcome popup</small></div>
        <div className="kpi"><span className="label">Subscribers</span><b>{1240 + leads.filter((l) => l.kind === 'newsletter').length}</b><small>Sunday Letter</small></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <div className="table-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 18px', alignItems: 'center' }}>
            <b>Latest bookings</b>
            <button className="link-arrow" style={{ fontSize: 13 }} onClick={() => go('registrations')}>View all</button>
          </div>
          <table><tbody>
            {registrations.slice(0, 5).map((r) => (
              <tr key={r.id}>
                <td><b>{r.name}</b><br /><small className="muted">{events.find((e) => e.slug === r.event)?.title}</small></td>
                <td style={{ textAlign: 'right' }}>{rupees(r.amount)}<br /><small className="muted">{when(r.at)}</small></td>
              </tr>
            ))}
          </tbody></table>
        </div>
        <div className="table-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 18px', alignItems: 'center' }}>
            <b>Seats filled</b>
            <button className="link-arrow" style={{ fontSize: 13 }} onClick={() => go('events')}>Manage</button>
          </div>
          <div style={{ padding: '0 18px 18px', display: 'grid', gap: 18 }}>
            {live.map((e) => (
              <div key={e.slug}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <b>{e.title}</b><span className="muted">{e.booked}/{e.seats}</span>
                </div>
                <div className="seats-bar" style={{ height: 8 }}><i style={{ width: `${(e.booked / e.seats) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ───────────── Events ───────────── */
const EMPTY_EVENT = { title: '', subtitle: '', date: '', time: '6:00 PM', venue: '', price: 499, seats: 50, about: '', tone: 'ember' }

function EventForm({ initial, onDone }) {
  const [f, setF] = useState(initial || EMPTY_EVENT)
  const [poster, setPoster] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const save = (e) => {
    e.preventDefault()
    if (initial) {
      store.set((s) => ({ events: s.events.map((x) => (x.slug === initial.slug ? { ...x, ...f, price: +f.price, seats: +f.seats } : x)) }))
      toast('Event updated — live on the site')
    } else {
      const ev = { ...f, slug: slugify(f.title) + '-' + Date.now().toString(36).slice(-4), price: +f.price, seats: +f.seats, booked: 0, status: 'upcoming' }
      store.set((s) => ({ events: [ev, ...s.events] }))
      toast('Event published — it’s on the Events page now')
    }
    onDone()
  }
  return (
    <form className="panel" onSubmit={save} style={{ maxWidth: 820 }}>
      <h3 style={{ marginBottom: 20 }}>{initial ? 'Edit event' : 'New event'}</h3>
      <div className="row-2">
        <div className="field"><label>Title</label><input required value={f.title} onChange={set('title')} /></div>
        <div className="field"><label>Subtitle</label><input value={f.subtitle} onChange={set('subtitle')} placeholder="e.g. Season 3 · Opening round" /></div>
      </div>
      <div className="row-2">
        <div className="field"><label>Date</label><input type="date" required value={f.date} onChange={set('date')} /></div>
        <div className="field"><label>Start time</label><input value={f.time} onChange={set('time')} /></div>
      </div>
      <div className="field"><label>Venue</label><input required value={f.venue} onChange={set('venue')} /></div>
      <div className="row-2">
        <div className="field"><label>Ticket price (₹)</label><input type="number" min="0" value={f.price} onChange={set('price')} /></div>
        <div className="field"><label>Total seats</label><input type="number" min="1" value={f.seats} onChange={set('seats')} /></div>
      </div>
      <div className="field"><label>Description</label><textarea value={f.about} onChange={set('about')} /></div>
      <div className="row-2">
        <div className="field">
          <label>Poster</label>
          <label className={`drop ${poster ? 'has' : ''}`} style={{ cursor: 'pointer' }}>
            <input type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && setPoster(URL.createObjectURL(e.target.files[0]))} />
            {poster ? <img src={poster} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span><ImagePlus size={22} style={{ margin: '0 auto 6px' }} />Drop poster or click to upload</span>}
          </label>
        </div>
        <div className="field">
          <label>Poster colour (fallback)</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['ember', 'ink', 'moss', 'sun'].map((t) => (
              <button type="button" key={t} onClick={() => setF({ ...f, tone: t })} aria-label={t}
                className={`art art-rings tone-${t}`} style={{ width: 52, height: 52, outline: f.tone === t ? '2.5px solid var(--ink)' : 'none', outlineOffset: 3 }} />
            ))}
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>Events move to “Past” automatically the day after they happen.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button className="btn">{initial ? 'Save changes' : 'Publish event'}</button>
        <button type="button" className="btn btn-ghost" onClick={onDone}>Cancel</button>
      </div>
    </form>
  )
}

function EventsAdmin() {
  const events = useStore((s) => s.events)
  const [editing, setEditing] = useState(null) // null | 'new' | event
  if (editing) return <EventForm initial={editing === 'new' ? null : editing} onDone={() => setEditing(null)} />
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <div style={{ marginBottom: 16 }}><button className="btn btn-sm" onClick={() => setEditing('new')}><Plus /> New event</button></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Event</th><th>Date</th><th>Price</th><th>Booked</th><th>Status</th><th /></tr></thead>
          <tbody>
            {sorted.map((e) => (
              <tr key={e.slug}>
                <td><div className="cell-title"><Art tone={e.tone} pattern="rings" className="thumb" />{e.title}</div></td>
                <td>{formatDate(e.date)}</td>
                <td>{e.price ? rupees(e.price) : '—'}</td>
                <td>{e.seats ? `${e.booked}/${e.seats}` : '—'}</td>
                <td>{isPast(e) ? <span className="status s-past">Archived</span> : <span className="status s-live">Live</span>}</td>
                <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                  <button className="icon-btn" onClick={() => setEditing(e)} aria-label="Edit"><Pencil /></button>
                  <button className="icon-btn" aria-label="Delete" onClick={() => { if (confirm(`Delete “${e.title}”?`)) { store.set((s) => ({ events: s.events.filter((x) => x.slug !== e.slug) })); toast('Event deleted') } }}><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ───────────── Blog ───────────── */
function PostEditor({ initial, onDone }) {
  const [f, setF] = useState(initial || { title: '', category: 'Public Speaking', excerpt: '', body: '', author: 'Aanya Kapoor' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const save = (publish) => {
    if (!f.title.trim()) return toast('Add a title first')
    const words = (f.body || f.excerpt).split(/\s+/).length
    const post = { ...f, read: `${Math.max(2, Math.round(words / 200))} min`, published: publish }
    if (initial) store.set((s) => ({ posts: s.posts.map((p) => (p.slug === initial.slug ? { ...p, ...post } : p)) }))
    else store.set((s) => ({ posts: [{ ...post, slug: slugify(f.title), date: today }, ...s.posts] }))
    toast(publish ? 'Published — live on Learn' : 'Saved as draft')
    onDone()
  }
  return (
    <div className="panel" style={{ maxWidth: 860 }}>
      <input className="input" value={f.title} onChange={set('title')} placeholder="Post title"
        style={{ fontFamily: 'var(--serif)', fontSize: 32, height: 'auto', padding: '10px 16px', marginBottom: 14 }} />
      <div className="row-2">
        <div className="field"><label>Category</label>
          <select value={f.category} onChange={set('category')}>{['Public Speaking', 'Debating', 'Model UN', 'Interviews', 'Parents'].map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="field"><label>Author</label><input value={f.author} onChange={set('author')} /></div>
      </div>
      <div className="field"><label>Excerpt / SEO description</label><input value={f.excerpt} onChange={set('excerpt')} maxLength={160} />
        <small className="muted">{f.excerpt.length}/160 — shown in Google results</small></div>
      <div className="field">
        <label>Body</label>
        <div className="editor">
          <div className="editor-tools">
            {[Bold, Italic, Heading2, Quote, Link2, ImagePlus].map((I, i) => <button type="button" key={i} className="icon-btn"><I /></button>)}
          </div>
          <textarea value={f.body} onChange={set('body')} placeholder="Start writing… (blank line = new paragraph)" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => save(true)}>Publish</button>
        <button className="btn btn-ghost" onClick={() => save(false)}>Save draft</button>
        <button className="btn btn-ghost" style={{ boxShadow: 'none' }} onClick={onDone}>Cancel</button>
      </div>
    </div>
  )
}

function BlogAdmin() {
  const posts = useStore((s) => s.posts)
  const [editing, setEditing] = useState(null)
  if (editing) return <PostEditor initial={editing === 'new' ? null : editing} onDone={() => setEditing(null)} />
  const toggle = (p) => store.set((s) => ({ posts: s.posts.map((x) => (x.slug === p.slug ? { ...x, published: !x.published } : x)) }))
  return (
    <>
      <div style={{ marginBottom: 16 }}><button className="btn btn-sm" onClick={() => setEditing('new')}><Plus /> New post</button></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Published</th><th /></tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.slug}>
                <td style={{ maxWidth: 380 }}><b>{p.title}</b><br /><small className="muted">{p.author} · {p.read}</small></td>
                <td><span className="chip">{p.category}</span></td>
                <td style={{ whiteSpace: 'nowrap' }}>{formatDate(p.date)}</td>
                <td><button className={`switch ${p.published ? 'on' : ''}`} onClick={() => toggle(p)} aria-label="Toggle published" /></td>
                <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                  <button className="icon-btn" onClick={() => setEditing(p)} aria-label="Edit"><Pencil /></button>
                  <Link className="icon-btn" to={`/learn/${p.slug}`} target="_blank" aria-label="View"><ExternalLink /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ───────────── Registrations ───────────── */
function downloadCSV(rows, name) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = name
  a.click()
}

function Registrations() {
  const { registrations, events } = useStore()
  const [ev, setEv] = useState('all')
  const [q, setQ] = useState('')
  const title = (slug) => events.find((e) => e.slug === slug)?.title || slug
  const rows = registrations
    .filter((r) => ev === 'all' || r.event === ev)
    .filter((r) => !q || (r.name + r.email + r.phone + r.id).toLowerCase().includes(q.toLowerCase()))
  const total = rows.reduce((s, r) => s + r.amount, 0)
  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select className="input" style={{ width: 'auto', height: 40, background: 'var(--white)' }} value={ev} onChange={(e) => setEv(e.target.value)}>
          <option value="all">All events</option>
          {events.filter((e) => e.price).map((e) => <option key={e.slug} value={e.slug}>{e.title}</option>)}
        </select>
        <div className="phone-input" style={{ background: 'var(--white)', flex: '1 1 220px', maxWidth: 320 }}>
          <span style={{ paddingRight: 0 }}><Search size={16} /></span>
          <input style={{ height: 40 }} placeholder="Search name, email, ID" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <span className="muted" style={{ marginLeft: 'auto', fontSize: 14 }}>{rows.length} bookings · <b style={{ color: 'var(--ink)' }}>{rupees(total)}</b></span>
        <button className="btn btn-sm btn-ghost" onClick={() => downloadCSV([['Booking ID', 'Event', 'Name', 'Email', 'Phone', 'Qty', 'Amount', 'Paid at'], ...rows.map((r) => [r.id, title(r.event), r.name, r.email, r.phone, r.qty, r.amount, r.at])], 'miyagi-registrations.csv')}>
          <Download /> Export CSV
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Booking</th><th>Attendee</th><th>Event</th><th>Qty</th><th>Amount</th><th>Payment</th><th>Paid at</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{r.id}</td>
                <td><b>{r.name}</b><br /><small className="muted">{r.email} · {r.phone}</small></td>
                <td>{title(r.event)}</td>
                <td>{r.qty}</td>
                <td>{rupees(r.amount)}</td>
                <td><span className="status s-paid">Paid</span></td>
                <td style={{ whiteSpace: 'nowrap' }}>{when(r.at)}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="muted" style={{ textAlign: 'center', padding: 40 }}>No bookings match.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ───────────── Leads ───────────── */
function Leads() {
  const leads = useStore((s) => s.leads)
  const [kind, setKind] = useState('all')
  const KINDS = { all: 'All', phone: 'Phone (popup)', enquiry: 'Enquiries', newsletter: 'Newsletter' }
  const rows = leads.filter((l) => kind === 'all' || l.kind === kind)
  return (
    <>
      <div className="filter-bar" style={{ marginBottom: 16 }}>
        {Object.entries(KINDS).map(([k, l]) => (
          <button key={k} className={`filter-btn ${kind === k ? 'on' : ''}`} style={{ height: 38 }} onClick={() => setKind(k)}>
            {l} <span className="count">{k === 'all' ? leads.length : leads.filter((x) => x.kind === k).length}</span>
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Type</th><th>Details</th><th>Source</th><th>When</th></tr></thead>
          <tbody>
            {rows.map((l, i) => (
              <tr key={i}>
                <td><span className={`status ${l.kind === 'phone' ? 's-live' : l.kind === 'enquiry' ? 's-draft' : 's-past'}`}>{KINDS[l.kind]}</span></td>
                <td><b>{l.value}</b></td>
                <td className="muted">{l.source}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{when(l.at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ───────────── Shell ───────────── */
const SECTIONS = {
  overview: ['Overview', LayoutGrid, 'Good evening, Miyagi team.'],
  events: ['Events', CalendarDays, 'Manage events'],
  blog: ['Blog', PenLine, 'Manage blog'],
  registrations: ['Registrations', Ticket, 'Registrations'],
  leads: ['Leads', Users, 'Leads & sign-ups'],
}

export default function Admin() {
  useSEO('Admin')
  const [authed, setAuthed] = useState(() => { try { return sessionStorage.getItem('miyagi-admin') === '1' } catch { return false } })
  const [sec, setSec] = useState('overview')
  const [open, setOpen] = useState(false)
  const leads = useStore((s) => s.leads)

  if (!authed)
    return <Login onIn={() => { try { sessionStorage.setItem('miyagi-admin', '1') } catch {} setAuthed(true) }} />

  const go = (k) => { setSec(k); setOpen(false) }
  const [, , heading] = SECTIONS[sec]

  return (
    <div className="admin">
      <aside className={`admin-side ${open ? 'open' : ''}`}>
        <span className="logo"><span className="seal">m</span>miyagi <small>admin</small></span>
        {Object.entries(SECTIONS).map(([k, [label, Icon]]) => (
          <button key={k} className={sec === k ? 'on' : ''} onClick={() => go(k)}>
            <Icon /> {label}
            {k === 'leads' && <span className="badge">{leads.length}</span>}
          </button>
        ))}
        <div className="spacer" />
        <Link to="/" className="side-link" target="_blank"><ExternalLink /> View website</Link>
        <button onClick={() => { store.reset(); toast('Demo data reset') }}><RotateCcw /> Reset demo data</button>
        <button onClick={() => { try { sessionStorage.removeItem('miyagi-admin') } catch {} setAuthed(false) }}><LogOut /> Sign out</button>
      </aside>
      <main className="admin-main" onClick={() => open && setOpen(false)}>
        <div className="admin-head">
          <div>
            <button className="burger admin-burger" onClick={(e) => { e.stopPropagation(); setOpen(true) }} aria-label="Menu" style={{ marginBottom: 16 }}><Menu /></button>
            <span className="label">{formatDate(today, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <h1 style={{ marginTop: 8 }}>{heading}</h1>
          </div>
        </div>
        <div key={sec} style={{ animation: 'fadeUp .35s var(--ease)' }}>
          {sec === 'overview' && <Overview go={go} />}
          {sec === 'events' && <EventsAdmin />}
          {sec === 'blog' && <BlogAdmin />}
          {sec === 'registrations' && <Registrations />}
          {sec === 'leads' && <Leads />}
        </div>
      </main>
    </div>
  )
}
