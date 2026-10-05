import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Play, Star, ArrowDown, MicVocal, Video, MessageSquareQuote, Trophy } from 'lucide-react'
import Art from '../components/Art'
import Reveal from '../components/Reveal'
import ProgramCard from '../components/ProgramCard'
import { EventList } from '../components/EventRow'
import { Wave, CountUp, ScrollWords, useSpotlight } from '../components/Motion'
import { PROGRAMS, PARTNERS, POSTS, EPISODES, formatDate, isPastEvent, postImg, eventImg } from '../data'
import { useStore } from '../lib/store'
import { useSEO } from '../lib/seo'

const AUDIENCE_COPY = {
  Schools: {
    img: '/img/classroom-hands.jpg', stat: ['40+', 'partner schools'],
    title: <>After-school clubs and <em>in-curriculum</em> modules.</>,
    body: 'We run weekly speaking and debate clubs inside your school, train your teachers, and bring your students to inter-school leagues.',
    cta: ['/programs?for=Schools', 'Programs for schools'],
  },
  Colleges: {
    img: '/img/college-audience.jpg', stat: ['3', 'debate league seasons'],
    title: <>Placement-ready, <em>debate-ready</em>, stage-ready.</>,
    body: 'Society partnerships, MUN prep and interview bootcamps for students heading into their first big room.',
    cta: ['/programs?for=Colleges', 'Programs for colleges'],
  },
  Individuals: {
    img: '/img/students.jpg', stat: ['12', 'max per batch'],
    title: <>Small batches. Real stage time. <em>Honest</em> feedback.</>,
    body: 'Weekend studios for ages 8 to 80 — whether it’s a school speech next month or a wedding toast next week.',
    cta: ['/programs?for=Individuals', 'Programs for individuals'],
  },
  Teams: {
    img: '/img/whiteboard.jpg', stat: ['½–2', 'day workshops'],
    title: <>Workshops for teams who <em>present</em> for a living.</>,
    body: 'Pitch clinics, leadership communication and presentation labs — on-site or online, built around your real decks.',
    cta: ['/corporate', 'Corporate training'],
  },
}

const METHOD = [
  [MicVocal, 'On your feet in minute one', 'No lectures first. Every session starts with someone at the front of the room.', '/img/mic-teal.jpg'],
  [Video, 'Recorded, every time', 'You watch yourself back. Nothing teaches faster than seeing your own hands.', '/img/presentation-dark.jpg'],
  [MessageSquareQuote, 'One keep. One change.', 'Specific feedback from a coach who knows your name — never just “good job”.', '/img/discussion.jpg'],
  [Trophy, 'Finish on a real stage', 'Every program ends with a showcase, a league round or an open mic.', '/img/confetti.jpg'],
]

const QUOTES = [
  { q: 'My daughter used to hide behind me at birthday parties. Last month she argued for the opposition in front of 300 people — and won.', who: 'Smita Arora', role: 'Parent, Grade 7', img: '/img/face-1.jpg' },
  { q: 'The rebuttal drills changed how our whole team thinks. We went from first-round exits to the Season 2 final in a year.', who: 'Kunal Bhatia', role: 'Debate captain, Modern School', img: '/img/face-2.jpg' },
  { q: 'Most corporate trainings are slides about slides. Miyagi had us presenting in the first ten minutes.', who: 'Priya Venkat', role: 'Head of Sales, fintech startup', img: '/img/face-3.jpg' },
]

const BENTO = ['b-hero', 'b-a', 'b-b', 'b-wide', 'b-c', 'b-d', 'b-e', 'b-f']

export default function Home() {
  useSEO(null, 'Miyagi trains students, colleges and teams in public speaking, debating and confident communication.')
  const [aud, setAud] = useState('Schools')
  const [qi, setQi] = useState(0)
  const spot = useSpotlight()
  const events = useStore((s) => s.events).filter((e) => !isPastEvent(e)).sort((a, b) => a.date.localeCompare(b.date))
  const next = events[0]
  const a = AUDIENCE_COPY[aud]
  const audPrograms = aud === 'Teams' ? [] : PROGRAMS.filter((p) => p.audiences.includes(aud)).slice(0, 4)

  useEffect(() => {
    const t = setTimeout(() => setQi((i) => (i + 1) % QUOTES.length), 7000)
    return () => clearTimeout(t)
  }, [qi])

  return (
    <>
      {/* ── Hero: the stage ── */}
      <section className="stage" ref={spot} data-hero-dark>
        <div className="stage-bg" aria-hidden="true">
          <img src="/img/hero-stage.jpg" alt="" className="dim" fetchPriority="high" />
          <img src="/img/hero-stage.jpg" alt="" className="lit" />
        </div>
        <div className="stage-beams" aria-hidden="true"><i /><i /><i /></div>

        <div className="wrap stage-inner">
          <span className="eyebrow rise" style={{ '--d': '0ms' }}><i />Now enrolling · Winter batches 2026</span>
          <h1 className="mega">
            <span className="line"><span>Find your</span></span>
            <span className="line voice-line">
              <span><em>voice.</em></span>
              <Wave bars={22} className="hero-wave" />
            </span>
            <span className="line"><span>Own the room.</span></span>
          </h1>

          <div className="stage-foot">
            <div className="rise" style={{ '--d': '450ms' }}>
              <p className="lede">
                Public speaking, debating and confident communication for schools, colleges, individuals and teams —
                taught by coaches who’ve stood exactly where you’re about to stand.
              </p>
              <div className="hero-ctas">
                <Link to="/programs" className="btn btn-ember btn-lg">Explore programs <ArrowRight /></Link>
                <Link to="/contact" className="btn btn-glass btn-lg">Book a free trial class</Link>
              </div>
            </div>
            <div className="proof rise" style={{ '--d': '600ms' }}>
              <div className="faces">
                {[4, 5, 6, 1].map((n) => <img key={n} src={`/img/face-${n}.jpg`} alt="" />)}
                <span>12k+</span>
              </div>
              <div>
                <div className="stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} fill="currentColor" />)}<b>4.9</b></div>
                <small>from 2,300+ parents & students</small>
              </div>
            </div>
          </div>
        </div>

        {next && (
          <Link to={`/events/${next.slug}`} className="float-ticket rise" style={{ '--d': '800ms' }}>
            <img src={eventImg(next)} alt="" />
            <div>
              <span className="live"><i />Next on stage</span>
              <b>{next.title}</b>
              <small>{formatDate(next.date, { day: 'numeric', month: 'short' })} · {next.seats - next.booked} seats left</small>
            </div>
            <ArrowUpRight className="go" />
          </Link>
        )}

        <div className="stage-marquee" aria-label="Partner schools and colleges">
          <div className="track">
            {[0, 1].map((k) => PARTNERS.map((p) => <span key={k + p} aria-hidden={k === 1}>{p}</span>))}
          </div>
        </div>
        <a href="#manifesto" className="scroll-cue" aria-label="Scroll down"><ArrowDown /></a>
      </section>

      {/* ── Manifesto + numbers ── */}
      <section className="section wrap" id="manifesto">
        <span className="label label-dot">Why Miyagi</span>
        <ScrollWords
          className="manifesto"
          text="Every confident speaker you admire was once a nervous kid with shaky hands and a dry mouth. The difference was never *talent. It was *practice, a coach who cared, and a room that let them *try."
        />
        <div className="stats">
          <div className="stat"><b><CountUp to={12000} suffix="+" /></b><span>students coached since 2019</span></div>
          <div className="stat"><b><CountUp to={40} suffix="+" /></b><span>partner schools and colleges</span></div>
          <div className="stat"><b><CountUp to={96} suffix="%" /></b><span>parents say their child speaks up more</span></div>
          <div className="stat"><b><CountUp to={200} suffix="+" /></b><span>students on stage every month</span></div>
        </div>
      </section>

      {/* ── Programs bento ── */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="label">Programs</span>
            <h2>Eight ways <em>in.</em></h2>
          </div>
          <Link to="/programs" className="link-arrow">All programs <ArrowUpRight /></Link>
        </div>
        <div className="bento">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70} className={BENTO[i]}>
              <ProgramCard program={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Audience switcher ── */}
      <section className="dark section aud">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">Who it’s for</span>
              <h2>One method. <em>Four rooms.</em></h2>
            </div>
            <div className="aud-tabs" role="tablist">
              {Object.keys(AUDIENCE_COPY).map((k) => (
                <button key={k} role="tab" aria-selected={aud === k} className={aud === k ? 'on' : ''} onClick={() => setAud(k)}>{k}</button>
              ))}
            </div>
          </div>
          <div className="aud-panel">
            <div className="aud-media">
              {Object.entries(AUDIENCE_COPY).map(([k, v]) => <img key={k} src={v.img} alt="" className={k === aud ? 'on' : ''} loading="lazy" />)}
              <div className="aud-stat" key={aud}><b>{a.stat[0]}</b><span>{a.stat[1]}</span></div>
            </div>
            <div key={aud} className="aud-copy">
              <h3>{a.title}</h3>
              <p className="lede">{a.body}</p>
              <ul className="aud-list">
                {audPrograms.length > 0
                  ? audPrograms.map((p) => (
                      <li key={p.slug}><Link to={`/programs/${p.slug}`}><span>{p.name}</span><span>{p.duration} <ArrowUpRight size={14} /></span></Link></li>
                    ))
                  : ['Presentation lab', 'Pitch clinic', 'Leadership communication', 'Difficult conversations'].map((x) => (
                      <li key={x}><Link to="/corporate"><span>{x}</span><span>½ – 2 days <ArrowUpRight size={14} /></span></Link></li>
                    ))}
              </ul>
              <Link to={a.cta[0]} className="btn btn-ember">{a.cta[1]} <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Method ── */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="label">The Miyagi method</span>
            <h2>Wax on. <em>Speak up.</em></h2>
          </div>
          <p className="muted" style={{ maxWidth: '38ch' }}>The small things, practised until the big things take care of themselves. Four rules every coach follows.</p>
        </div>
        <div className="method">
          {METHOD.map(([Icon, t, d, img], i) => (
            <Reveal key={t} className="step" delay={i * 90}>
              <div className="step-img"><img src={img} alt="" loading="lazy" /><span className="step-n">0{i + 1}</span></div>
              <span className="step-ico"><Icon /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Events ── */}
      <section className="dark section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label label-dot">On stage soon</span>
              <h2>Grab a seat. <em>Or the mic.</em></h2>
            </div>
            <Link to="/events" className="link-arrow">All events <ArrowUpRight /></Link>
          </div>
          <EventList events={events.slice(0, 3)} />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testi-band">
        <div className="wrap testi">
          <span className="mark" aria-hidden="true">“</span>
          <div key={qi} className="testi-body">
            <blockquote>{QUOTES[qi].q}</blockquote>
            <div className="testi-who">
              <img src={QUOTES[qi].img} alt="" />
              <cite><b>{QUOTES[qi].who}</b><span>{QUOTES[qi].role}</span></cite>
            </div>
          </div>
          <div className="testi-dots">
            {QUOTES.map((q, i) => (
              <button key={i} className={i === qi ? 'on' : ''} onClick={() => setQi(i)} aria-label={`Testimonial from ${q.who}`}>
                <img src={q.img} alt="" />
                <i />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learn ── */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="label">Learn for free</span>
            <h2>Read. Listen. <em>Watch.</em></h2>
          </div>
          <Link to="/learn" className="link-arrow">Open the library <ArrowUpRight /></Link>
        </div>
        <div className="learn-grid">
          <Link to={`/learn/${POSTS[0].slug}`} className="learn-card learn-lead">
            <Art src={postImg(POSTS[0])} shade="bottom" />
            <div className="learn-over">
              <span className="chip chip-glass">{POSTS[0].category} · {POSTS[0].read}</span>
              <h3>{POSTS[0].title}</h3>
              <p>{POSTS[0].excerpt}</p>
            </div>
          </Link>
          <Link to="/learn?tab=podcast" className="learn-card learn-pod">
            <Art src="/img/podcast-mic.jpg" shade="full" />
            <div className="learn-over">
              <span className="chip chip-glass"><Play size={12} fill="currentColor" /> Podcast · Ep {EPISODES[0].n}</span>
              <h3>{EPISODES[0].title}</h3>
              <Wave bars={40} className="pod-wave" />
              <p>{EPISODES[0].guest} · {EPISODES[0].length}</p>
            </div>
          </Link>
          {POSTS.slice(1, 3).map((p) => (
            <Link key={p.slug} to={`/learn/${p.slug}`} className="learn-card learn-small">
              <Art src={postImg(p)} />
              <div>
                <span className="label">{p.category} · {p.read}</span>
                <h3>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Final call ── */}
      <section className="final" data-final>
        <img src="/img/hands-spotlight.jpg" alt="" loading="lazy" />
        <div className="wrap final-inner">
          <span className="eyebrow"><i />Free 45-minute trial class</span>
          <h2>Your first stage <em>is waiting.</em></h2>
          <p className="lede">Bring your child — or yourself. Stand up, speak for a minute, and leave with one thing to keep and one thing to change.</p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-ember btn-lg">Book a trial class <ArrowRight /></Link>
            <a href="https://wa.me/919876543210" className="btn btn-glass btn-lg">WhatsApp us</a>
          </div>
        </div>
      </section>
    </>
  )
}
