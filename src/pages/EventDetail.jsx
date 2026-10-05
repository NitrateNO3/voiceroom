import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, ArrowRight, Calendar, MapPin, Clock, Smartphone, CreditCard, Landmark, Check, Mail, Lock, X } from 'lucide-react'
import NotFound from './NotFound'
import { formatDate, rupees, isPastEvent, eventImg } from '../data'
import { store, useStore } from '../lib/store'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

const METHODS = [
  ['upi', 'UPI', 'GPay, PhonePe, Paytm', Smartphone],
  ['card', 'Card', 'Visa, Mastercard, RuPay', CreditCard],
  ['nb', 'Netbanking', 'All major banks', Landmark],
]

// Stand-in for the Razorpay Checkout modal. In production: create an order on
// the server, open `new Razorpay({ order_id, ... })`, verify the signature
// server-side, then send the confirmation email.
function PaySheet({ amount, onClose, onPaid }) {
  const [method, setMethod] = useState('upi')
  const [busy, setBusy] = useState(false)
  const pay = () => {
    setBusy(true)
    setTimeout(onPaid, 1700)
  }
  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <div className="pay-sheet" role="dialog" aria-label="Payment">
        <div className="pay-top">
          <div><small>Miyagi Learning Pvt. Ltd.</small><b>{rupees(amount)}</b></div>
          {!busy && <button onClick={onClose} aria-label="Cancel payment" style={{ color: '#fff' }}><X size={20} /></button>}
        </div>
        <div className="pay-body">
          {busy ? (
            <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
              <div className="spinner" />
              <b>Processing payment…</b>
              <p style={{ fontSize: 13, color: '#6b7385', marginTop: 4 }}>Don’t close this window</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 13, color: '#6b7385', margin: '0 0 12px' }}>Choose a payment method</p>
              {METHODS.map(([k, t, s, Icon]) => (
                <button key={k} className={`pay-method ${method === k ? 'on' : ''}`} onClick={() => setMethod(k)}>
                  <Icon /><span><b style={{ display: 'block' }}>{t}</b><small style={{ color: '#6b7385' }}>{s}</small></span>
                </button>
              ))}
              <button className="pay-btn" onClick={pay}>Pay {rupees(amount)}</button>
            </>
          )}
          <p className="pay-foot"><Lock size={11} style={{ verticalAlign: -1 }} /> Secured by Razorpay · prototype test mode</p>
        </div>
      </div>
    </div>
  )
}

export default function EventDetail() {
  const { slug } = useParams()
  const event = useStore((s) => s.events.find((e) => e.slug === slug))
  useSEO(event?.title, event?.about)
  const [qty, setQty] = useState(1)
  const [f, setF] = useState({ name: '', email: '', phone: '' })
  const [paying, setPaying] = useState(false)
  const [booking, setBooking] = useState(null)

  if (!event) return <NotFound />
  const left = event.seats - event.booked
  const total = (event.price || 0) * qty
  const isPast = isPastEvent(event)

  const checkout = (e) => {
    e.preventDefault()
    track('begin_checkout', { event: event.slug, value: total, currency: 'INR' })
    setPaying(true)
  }

  const onPaid = () => {
    const id = 'MYG-' + Math.floor(24100 + Math.random() * 900)
    const reg = { id, event: event.slug, ...f, qty, amount: total, at: new Date().toISOString() }
    store.set((s) => ({
      registrations: [reg, ...s.registrations],
      events: s.events.map((x) => (x.slug === event.slug ? { ...x, booked: x.booked + qty } : x)),
    }))
    track('purchase', { transaction_id: id, value: total, currency: 'INR', event: event.slug })
    setPaying(false)
    setBooking(reg)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (booking)
    return (
      <section className="wrap section" style={{ paddingTop: 'clamp(48px, 8vw, 96px)' }}>
        <span className="label label-dot">Booking confirmed</span>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 104px)', margin: '20px 0 16px' }}>You’re <em>in.</em></h1>
        <p className="lede" style={{ marginBottom: 40, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Mail size={20} style={{ flex: 'none' }} /> Confirmation email sent to {booking.email}
        </p>
        <div className="ticket">
          <div className="ticket-main">
            <div className="ticket-img"><img src={eventImg(event)} alt="" /></div>
            <span className="label">{event.subtitle}</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '10px 0 24px' }}>{event.title}</h2>
            <div className="event-meta" style={{ gap: 8 }}>
              <span><Calendar /> {formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span><Clock /> {event.time}</span>
              <span><MapPin /> {event.venue}</span>
            </div>
            <hr className="rule" style={{ margin: '24px 0' }} />
            <div className="row-2">
              <div><span className="label">Name</span><p style={{ fontWeight: 600 }}>{booking.name}</p></div>
              <div><span className="label">Paid</span><p style={{ fontWeight: 600 }}>{rupees(booking.amount)} · {booking.qty} {booking.qty > 1 ? 'tickets' : 'ticket'}</p></div>
            </div>
          </div>
          <div className="ticket-stub">
            <div className="qr" />
            <div>
              <span className="label">Booking ID</span>
              <p style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>{booking.id}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
          <Link to="/events" className="btn">More events <ArrowRight /></Link>
          <button className="btn btn-ghost" onClick={() => setBooking(null)}>Back to event</button>
        </div>
      </section>
    )

  return (
    <>
      <header className="poster" data-hero-dark>
        <img src={eventImg(event)} alt="" />
        <div className="wrap" style={{ width: '100%' }}>
          <nav className="crumbs" style={{ color: 'var(--cream-3)' }}><Link to="/events">Events</Link> / <span>{event.title}</span></nav>
          <span className="eyebrow"><i />{isPast ? 'Past event' : left <= 20 ? `Selling fast · ${left} seats left` : 'Miyagi presents'}</span>
          <h1>{event.title}</h1>
          <p className="sub">{event.subtitle}</p>
          <div className="poster-meta">
            <span><Calendar /> {formatDate(event.date, { weekday: 'short', day: 'numeric', month: 'long' })}</span>
            {event.time && <span><Clock /> {event.time}</span>}
            <span><MapPin /> {event.venue}</span>
          </div>
        </div>
      </header>
      <section className="wrap" style={{ paddingTop: 'clamp(56px, 8vw, 104px)', paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <div className="detail-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '0 0 22px' }}>About this <em>event</em></h2>
            <p className="lede">{event.about || 'Highlights and photos from this event.'}</p>
            {!isPast && (
              <div className="facts">
                <div><span className="label">Date</span><b>{formatDate(event.date)}</b></div>
                <div><span className="label">Starts</span><b>{event.time}</b></div>
                <div><span className="label">Seats left</span><b>{left} of {event.seats}</b></div>
              </div>
            )}
            {!isPast && (
              <div className="event-meta" style={{ fontSize: 16 }}>
                <span><MapPin /> {event.venue}</span>
              </div>
            )}
          </div>

          <aside className="sticky">
            {isPast ? (
              <div className="panel">
                <h3>This event has ended</h3>
                <p className="muted" style={{ margin: '10px 0 20px' }}>Catch the next one.</p>
                <Link to="/events" className="btn btn-block">Upcoming events <ArrowRight /></Link>
              </div>
            ) : (
              <form className="panel" onSubmit={checkout}>
                <span className="label">Book your seat</span>
                <div className="ticket-row">
                  <div>
                    <b>General admission</b>
                    <p className="muted" style={{ fontSize: 14 }}>{rupees(event.price)} per ticket</p>
                  </div>
                  <div className="stepper">
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer"><Minus /></button>
                    <output>{qty}</output>
                    <button type="button" onClick={() => setQty(Math.min(left, 10, qty + 1))} aria-label="More"><Plus /></button>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <div className="field"><label htmlFor="bn">Name</label><input id="bn" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
                  <div className="field"><label htmlFor="be">Email — ticket is sent here</label><input id="be" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
                  <div className="field"><label htmlFor="bp">Phone</label><input id="bp" required inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
                </div>
                <div className="total-row">
                  <span className="muted">Total</span>
                  <b>{rupees(total)}</b>
                </div>
                <button className="btn btn-ember btn-block" disabled={left <= 0}>
                  {left <= 0 ? 'Sold out' : <>Pay {rupees(total)} <ArrowRight /></>}
                </button>
                <p className="muted" style={{ fontSize: 12.5, textAlign: 'center', marginTop: 12 }}>
                  <Lock size={11} style={{ verticalAlign: -1 }} /> Secure payment via Razorpay · UPI, cards, netbanking
                </p>
              </form>
            )}
          </aside>
        </div>
      </section>
      {paying && <PaySheet amount={total} onClose={() => setPaying(false)} onPaid={onPaid} />}
    </>
  )
}
