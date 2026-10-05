import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { openCallback } from '../components/PhoneCapture'
import PageHead from '../components/PageHead'
import { TEAM } from '../data'
import { useSEO } from '../lib/seo'

const YEARS = [
  ['2019', 'Started as a Saturday debate club for nine students in our founder’s living room.'],
  ['2021', 'Moved classes online during the lockdowns and kept them there for students outside Delhi NCR.'],
  ['2023', 'Began running weekly clubs inside a handful of schools.'],
  ['2025', 'Opened our own room in DLF Phase IV, Gurugram, and started The Speak Easy podcast.'],
]

export default function About() {
  useSEO('About', 'Voiceroom is a public speaking school in Gurugram. How we started, how we teach and who teaches.')
  return (
    <>
      <PageHead
        title="About Voiceroom"
        lede="We’re a small public speaking school in Gurugram. We teach school kids, college students and working adults to stand up and say what they mean."
      />

      <section className="wrap">
        <div className="wide-photo"><img src="/img/college-audience.jpg" alt="Students listening to a talk" /></div>
      </section>

      <section className="section wrap two-col">
        <h2>Why we started</h2>
        <div className="prose">
          <p>
            Most people are told to “be more confident” and never shown how. Confidence on a stage is mostly
            practice: you get up, you talk, someone tells you one useful thing, and you do it again next week.
          </p>
          <p>
            That’s the whole idea behind Voiceroom. We keep batches to twelve so everyone gets time at the
            front of the room, and we spend more of each class speaking than listening.
          </p>
        </div>
      </section>

      <section className="wrap two-col" style={{ paddingBottom: 'clamp(56px, 8vw, 104px)' }}>
        <h2>How we teach</h2>
        <div className="prose">
          <p><b>Speaking first.</b> Every class puts people on their feet in the first ten minutes. Theory comes after, and only as much as you need.</p>
          <p><b>Small rooms.</b> Twelve people at most, so your coach knows your name and remembers what you said last week.</p>
          <p><b>Specific feedback.</b> Not “good job”. One thing to keep, one thing to change, written down every time.</p>
        </div>
      </section>

      <section className="wrap two-col" style={{ paddingBottom: 'clamp(56px, 8vw, 104px)' }}>
        <h2>So far</h2>
        <ul className="years">
          {YEARS.map(([y, t]) => <li key={y}><b>{y}</b><p>{t}</p></li>)}
        </ul>
      </section>

      <section className="wrap two-col" style={{ paddingBottom: 'clamp(56px, 8vw, 104px)' }}>
        <h2>Who teaches</h2>
        <ul className="coaches">
          {TEAM.map((m) => (
            <li key={m.name}>
              <b>{m.name}</b>
              <span>{m.role}</span>
              <p>{m.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(56px, 8vw, 104px)' }}>
        <div className="note-box">
          <h2>Have a question about a batch?</h2>
          <div className="hero-ctas" style={{ marginTop: 0 }}>
            <button className="btn" onClick={openCallback}><Phone /> Ask us to call you</button>
            <Link to="/contact" className="btn btn-outline">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
