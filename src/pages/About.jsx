import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { openCallback } from '../components/PhoneCapture'
import { TEAM } from '../data'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { useSEO } from '../lib/seo'

export default function About() {
  useSEO('About', 'Why Miyagi exists, how we teach, and where we’re going.')
  return (
    <>
      <PageHead
        label="About Miyagi"
        title={<>Wax on. <em>Speak</em> up.</>}
        lede="We named ourselves after the patient teacher who made his student practise the small things until the big things took care of themselves. That’s still the method."
        img="/img/graduation.jpg"
      />

      <section className="wrap two-col" style={{ paddingBottom: 'clamp(64px, 9vw, 120px)' }}>
        <span className="label label-dot">Why we exist</span>
        <Reveal>
          <p className="big-quote">Confidence isn’t a personality. It’s a <em>skill</em> — and skills can be taught, drilled and kept.</p>
          <p className="lede" style={{ marginTop: 32 }}>
            Most students are told to “be more confident” and never shown how. Miyagi started in 2019 as a weekend debate
            club in a Delhi living room. Today we coach in 40+ schools and colleges, run a city-wide debate league and train
            teams at companies who want their people to speak with clarity.
          </p>
        </Reveal>
      </section>

      <section className="wrap">
        <div className="photo-strip">
          {['discussion', 'classroom', 'confetti'].map((n, i) => (
            <Reveal key={n} delay={i * 90}><img src={`/img/${n}.jpg`} alt="" loading="lazy" /></Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="values">
          {[
            ['Reps over theory', 'Every session puts students on their feet within the first ten minutes. You learn to speak by speaking.'],
            ['Small rooms', 'Batches of twelve, max. Every student gets heard, recorded and coached by name.'],
            ['Kind, specific feedback', 'Not “good job”. One thing to keep, one thing to change — every time.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <span className="n">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark section">
        <div className="wrap two-col">
          <div>
            <span className="label">The story so far</span>
            <h2 style={{ marginTop: 18 }}>From a living room to <em>a league.</em></h2>
          </div>
          <ol className="timeline">
            <li><b>2019</b><p>Weekend debate club with 9 students in Aanya’s living room.</p></li>
            <li><b>2021</b><p>Went online through the pandemic; reached students in 14 cities.</p></li>
            <li><b>2023</b><p>First school partnerships. Launched the Inter-School Debate League.</p></li>
            <li><b>2025</b><p>Opened the Gurugram studio. Launched The Speak Easy podcast.</p></li>
            <li><b>2026</b><p>12,000+ students coached. A free library of articles, episodes and videos.</p></li>
          </ol>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="label">The team</span>
            <h2>The people <em>behind the mic.</em></h2>
          </div>
          <p className="muted" style={{ maxWidth: '40ch' }}>National debaters, theatre actors, teachers and recruiters. Every coach is trained in the Miyagi method before they lead a batch.</p>
        </div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} className="member" delay={(i % 3) * 80}>
              <div className="member-photo">
                <img src={m.img} alt={m.name} loading="lazy" />
                <p className="note">{m.note}</p>
              </div>
              <h3>{m.name}</h3>
              <span className="label">{m.role}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark section">
        <div className="wrap section-head" style={{ marginBottom: 0 }}>
          <div>
            <span className="label">Talk to a coach</span>
            <h2>Ready when <em>you are.</em></h2>
          </div>
          <div className="hero-ctas" style={{ marginTop: 0 }}>
            <button className="btn btn-ember btn-lg" onClick={openCallback}><Phone /> Get a free callback</button>
            <Link to="/contact" className="btn btn-glass btn-lg">Contact us <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
