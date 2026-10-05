import { Link } from 'react-router-dom'
import { Phone, Play, Users, MapPin, CalendarDays } from 'lucide-react'
import { PhoneForm, openCallback } from '../components/PhoneCapture'
import { POSTS, EPISODES, VIDEOS, formatDate, postImg } from '../data'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

const STEPS = [
  ['You speak in the first ten minutes.', 'Every class starts with someone at the front of the room. Nobody sits through a lecture first.'],
  ['You watch yourself back.', 'We record each talk on a phone. Seeing your own hands and hearing your own “umm” teaches faster than any advice.'],
  ['You get two notes, not ten.', 'One thing to keep doing and one thing to change. Your coach writes them down so you can track them week to week.'],
  ['You finish on a real stage.', 'Each batch ends with a showcase that friends and family can come to.'],
]

const WHO = [
  ['School students, 8 to 17', 'Weekend batches split by age. Speeches, storytelling, debate and the confidence to put a hand up in class.'],
  ['College students', 'Debate, group discussions and interview practice before placements and admissions.'],
  ['Working adults', 'Evening batches for presentations, meetings and the occasional wedding toast.'],
]

export default function Home() {
  useSEO(null, 'Public speaking and debate classes for school kids, college students and working adults in Gurugram and online. Batches of 12. Free articles and a podcast.')
  const [lead, ...rest] = POSTS

  return (
    <>
      {/* Hero */}
      <section className="hero wrap">
        <div>
          <h1>Public <mark>speaking</mark> classes for kids, students and working adults.</h1>
          <p className="lede">
            Small weekly batches in Gurugram and online. You stand up and talk in every single class,
            and a coach tells you exactly what to work on next.
          </p>
          <div className="hero-ctas">
            <button className="btn" onClick={() => { track('cta_click', { cta: 'hero_callback' }); openCallback() }}>
              <Phone /> Ask us to call you
            </button>
            <Link to="/learn" className="btn btn-outline">Read the articles</Link>
          </div>
          <ul className="hero-facts">
            <li><Users /> 12 people per batch</li>
            <li><CalendarDays /> Weekends and weekday evenings</li>
            <li><MapPin /> DLF Phase IV, Gurugram</li>
          </ul>
        </div>
        <figure className="hero-photo">
          <img src="/img/discussion.jpg" alt="A student speaking while a small group listens" fetchPriority="high" />
        </figure>
      </section>

      {/* What a class looks like */}
      <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap class-steps">
          <div>
            <h2>What a class actually looks like</h2>
            <p className="lede" style={{ marginTop: 14 }}>Ninety minutes, twelve people, one coach. Most of it is spent on your feet.</p>
            <div className="photo"><img src="/img/students-class.jpg" alt="Students in a classroom" loading="lazy" /></div>
          </div>
          <ul className="steps">
            {STEPS.map(([t, d]) => (
              <li key={t}><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section wrap">
        <h2 style={{ marginBottom: 24 }}>Who comes to Voiceroom</h2>
        <div className="who">
          {WHO.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
        <p style={{ marginTop: 28 }}>
          Not sure which batch fits? <Link to="/about" className="text-link">Read how we teach</Link> or <button className="text-link" onClick={openCallback}>ask us to call you</button>.
        </p>
      </section>

      {/* Articles */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>From the blog</h2>
          <Link to="/learn" className="text-link">All articles</Link>
        </div>
        <div className="blog-split">
          <Link to={`/learn/${lead.slug}`} className="blog-feature">
            <img src={postImg(lead)} alt="" loading="lazy" />
            <p className="meta" style={{ marginTop: 14 }}>{lead.category} · {lead.read} read</p>
            <h3>{lead.title}</h3>
            <p>{lead.excerpt}</p>
          </Link>
          <div className="blog-lines">
            {rest.slice(0, 4).map((p) => (
              <Link key={p.slug} to={`/learn/${p.slug}`} className="blog-line">
                <p className="meta">{p.category} · {formatDate(p.date)}</p>
                <h3>{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast + YouTube */}
      <section className="listen section">
        <div className="wrap listen-grid">
          <div>
            <h2>The Speak Easy podcast</h2>
            <p className="lede">Conversations with our coaches and guests about speaking up, every other Thursday. About 40 minutes each.</p>
            <ul className="ep-list">
              {EPISODES.slice(0, 3).map((e) => (
                <li key={e.n}>
                  <Link to="/podcast">
                    <span className="play"><Play fill="currentColor" /></span>
                    <span><b>{e.title}</b><small>Episode {e.n} · {e.guest}</small></span>
                    <span className="len">{e.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/podcast" className="btn btn-light">All episodes and videos</Link>
          </div>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>On YouTube</h2>
            <div className="listen-videos">
              {VIDEOS.map((v) => (
                <Link key={v.title} to="/podcast#videos" className="vid">
                  <img src={v.img} alt="" loading="lazy" />
                  <span className="yt"><Play fill="currentColor" /><span>{v.title} · {v.length}</span></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phone capture */}
      <section className="section wrap">
        <div className="callback">
          <div>
            <h2>Talk to a coach before you sign up</h2>
            <p className="lede">
              Leave your number and we’ll call you, usually the same day. We’ll ask a few questions about you or your
              child and suggest a batch. If we’re not the right fit, we’ll tell you.
            </p>
          </div>
          <div className="callback-box">
            <PhoneForm source="Home, bottom form" />
          </div>
        </div>
      </section>
    </>
  )
}
