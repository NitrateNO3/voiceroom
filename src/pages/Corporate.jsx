import PageHead from '../components/PageHead'
import EnquiryForm from '../components/EnquiryForm'
import Reveal from '../components/Reveal'
import { useSEO } from '../lib/seo'

const OFFERS = [
  ['Presentation Lab', 'Half-day', 'Bring your real deck. Leave with a sharper story and a rehearsed delivery, recorded and critiqued.'],
  ['Pitch Clinic', '1 day', 'For sales and founders. Openers, objection handling and the 60-second version of what you do.'],
  ['Leadership Voice', '2 days', 'Town halls, tough news and running meetings people don’t dread. For managers and new leads.'],
  ['Difficult Conversations', 'Half-day', 'Feedback, conflict and saying no — practised with actors in realistic role-plays.'],
  ['Speaker Coaching', '1:1 · 4 sessions', 'Prep for a keynote, panel or media appearance with a senior Miyagi coach.'],
  ['Custom Programs', 'You tell us', 'Multi-month communication tracks designed around your team’s goals and calendar.'],
]

export default function Corporate() {
  useSEO('Corporate training', 'Communication, presentation and leadership workshops for teams.')
  return (
    <>
      <PageHead
        label="Corporate training · New"
        title={<>Teams that <em>present</em> for a living.</>}
        lede="Hands-on workshops where your people practise on real work — not slides about slides. On-site in Delhi NCR, or live online anywhere."
        img="/img/presenting.jpg"
      />
      <section className="wrap">
        <p className="label" style={{ marginBottom: 8 }}>Teams we’ve trained</p>
        <div className="logo-wall">
          {['Northwind Capital', 'Kestrel Health', 'Bluefin Retail', 'Orbit Fintech', 'Saffron Media', 'Atlas Logistics'].map((x) => <span key={x}>{x}</span>)}
        </div>
      </section>
      <section className="section wrap">
        <div className="section-head">
          <div><span className="label">Formats</span><h2>Pick a format, <em>or mix them.</em></h2></div>
        </div>
        <div className="offer-grid">
          {OFFERS.map(([t, d, p], i) => (
            <Reveal key={t} className="offer" delay={(i % 3) * 70}>
              <span className="n">0{i + 1} — {d}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 'clamp(72px, 10vw, 140px)' }}>
        <div className="photo-strip">
          {['whiteboard', 'seminar', 'presentation-dark'].map((n, i) => (
            <Reveal key={n} delay={i * 90}><img src={`/img/${n}.jpg`} alt="" loading="lazy" /></Reveal>
          ))}
        </div>
      </section>
      <section className="dark section">
        <div className="wrap two-col">
          <div>
            <span className="label">How it works</span>
            <h2 style={{ marginTop: 18 }}>Scoped in a call. <em>Delivered</em> in weeks.</h2>
            <ol className="timeline" style={{ marginTop: 40 }}>
              <li><b>01</b><p>30-minute discovery call to understand your team.</p></li>
              <li><b>02</b><p>Proposal with format, dates and pricing within 48 hours.</p></li>
              <li><b>03</b><p>Workshop delivery plus recordings and a follow-up plan.</p></li>
            </ol>
          </div>
          <div style={{ color: 'var(--ink)' }}>
            <EnquiryForm program="Corporate training" title="Talk to our team" compact />
          </div>
        </div>
      </section>
    </>
  )
}
