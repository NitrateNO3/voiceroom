import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Play, Star, ArrowDown, Phone, MicVocal, Video, MessageSquareQuote, Trophy } from 'lucide-react'
import Art from '../components/Art'
import Reveal from '../components/Reveal'
import { PhoneForm, openCallback } from '../components/PhoneCapture'
import { Wave, CountUp, ScrollWords, useSpotlight } from '../components/Motion'
import { PARTNERS, POSTS, EPISODES, VIDEOS, postImg } from '../data'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

const METHOD = [
  [MicVocal, 'On your feet in minute one', 'No lectures first. Every session starts with someone at the front of the room.', '/img/mic-teal.jpg'],
  [Video, 'Recorded, every time', 'You watch yourself back. Nothing teaches faster than seeing your own hands.', '/img/presentation-dark.jpg'],
  [MessageSquareQuote, 'One keep. One change.', 'Specific feedback from a coach who knows your name — never just “good job”.', '/img/discussion.jpg'],
  [Trophy, 'Finish on a real stage', 'Every batch ends with a showcase, a debate round or an open mic.', '/img/confetti.jpg'],
]

const QUOTES = [
  { q: 'My daughter used to hide behind me at birthday parties. Last month she argued for the opposition in front of 300 people — and won.', who: 'Smita Arora', role: 'Parent, Grade 7', img: '/img/face-1.jpg' },
  { q: 'The rebuttal drills changed how our whole team thinks. We went from first-round exits to the final in a year.', who: 'Kunal Bhatia', role: 'Debate captain, Modern School', img: '/img/face-2.jpg' },
  { q: 'I listen to The Speak Easy on my drive to work. The episode on pauses fixed my client presentations in a week.', who: 'Priya Venkat', role: 'Head of Sales, fintech startup', img: '/img/face-3.jpg' },
]

export default function Home() {
  useSEO(null, 'Voiceroom helps students and professionals find their voice — free articles, a weekly podcast and videos on public speaking, debating and confident communication.')
  const [qi, setQi] = useState(0)
  const spot = useSpotlight()
  const ep = EPISODES[0]

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
          <span className="eyebrow rise" style={{ '--d': '0ms' }}><i />Communication school · New Delhi</span>
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
                Public speaking, debating and confident communication — taught by coaches who’ve stood
                exactly where you’re about to stand. Start free with our articles, podcast and videos.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-ember btn-lg" onClick={() => { track('cta_click', { cta: 'hero_callback' }); openCallback() }}>
                  <Phone /> Get a free callback
                </button>
                <Link to="/learn" className="btn btn-glass btn-lg">Start learning free <ArrowRight /></Link>
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

        <Link to="/podcast" className="float-ticket rise" style={{ '--d': '800ms' }}>
          <img src="/img/podcast-mic.jpg" alt="" />
          <div>
            <span className="live"><i />New episode · Ep {ep.n}</span>
            <b>{ep.title}</b>
            <small>The Speak Easy · {ep.length}</small>
          </div>
          <Play className="go" fill="currentColor" />
        </Link>

        <div className="stage-marquee" aria-label="Schools and colleges we work with">
          <div className="track">
            {[0, 1].map((k) => PARTNERS.map((p) => <span key={k + p} aria-hidden={k === 1}>{p}</span>))}
          </div>
        </div>
        <a href="#manifesto" className="scroll-cue" aria-label="Scroll down"><ArrowDown /></a>
      </section>

      {/* ── Manifesto + numbers ── */}
      <section className="section wrap" id="manifesto">
        <span className="label label-dot">Why Voiceroom</span>
        <ScrollWords
          className="manifesto"
          text="Every confident speaker you admire was once a nervous kid with shaky hands and a dry mouth. The difference was never *talent. It was *practice, a coach who cared, and a room that let them *try."
        />
        <div className="stats">
          <div className="stat"><b><CountUp to={12000} suffix="+" /></b><span>students coached since 2019</span></div>
          <div className="stat"><b><CountUp to={40} suffix="+" /></b><span>partner schools and colleges</span></div>
          <div className="stat"><b><CountUp to={96} suffix="%" /></b><span>parents say their child speaks up more</span></div>
          <div className="stat"><b><CountUp to={24} /></b><span>podcast episodes and counting</span></div>
        </div>
      </section>

      {/* ── About teaser: the method ── */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="label">The Voiceroom method</span>
            <h2>Small reps. <em>Big rooms.</em></h2>
          </div>
          <Link to="/about" className="link-arrow">Our story <ArrowUpRight /></Link>
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

      {/* ── Articles ── */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <span className="label">Fresh on the blog</span>
            <h2>Ideas you can <em>use tonight.</em></h2>
          </div>
          <Link to="/learn" className="link-arrow">All articles <ArrowUpRight /></Link>
        </div>
        <div className="blog-grid">
          <Reveal className="blog-lead">
            <Link to={`/learn/${POSTS[0].slug}`} className="learn-card">
              <Art src={postImg(POSTS[0])} shade="bottom" />
              <div className="learn-over">
                <span className="chip chip-glass">{POSTS[0].category} · {POSTS[0].read}</span>
                <h3>{POSTS[0].title}</h3>
                <p>{POSTS[0].excerpt}</p>
              </div>
            </Link>
          </Reveal>
          {POSTS.slice(1, 4).map((p, i) => (
            <Reveal key={p.slug} delay={(i + 1) * 80}>
              <Link to={`/learn/${p.slug}`} className="blog-row">
                <Art src={postImg(p, i + 1)} />
                <div>
                  <span className="label">{p.category} · {p.read}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Podcast + YouTube ── */}
      <section className="dark section media">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label label-dot">Podcast & YouTube</span>
              <h2>Listen on the go. <em>Watch &amp; practise.</em></h2>
            </div>
            <Link to="/podcast" className="link-arrow">Open the player <ArrowUpRight /></Link>
          </div>
          <div className="media-grid">
            <Link to="/podcast" className="pod-card">
              <Art src="/img/podcast-mic.jpg" shade="full" />
              <div className="learn-over">
                <span className="chip chip-glass"><Play size={12} fill="currentColor" /> The Speak Easy · Ep {ep.n}</span>
                <h3>{ep.title}</h3>
                <Wave bars={44} className="pod-wave" />
                <p>{ep.guest} · {ep.length}</p>
              </div>
            </Link>
            <ol className="ep-mini">
              {EPISODES.slice(1).map((e) => (
                <li key={e.n}>
                  <Link to="/podcast">
                    <span className="n">EP {e.n}</span>
                    <span><b>{e.title}</b><small>{e.guest}</small></span>
                    <span className="mini-play"><Play fill="currentColor" /></span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="vid-row">
            {VIDEOS.map((v) => (
              <Link key={v.title} to="/podcast#videos" className="vid-card">
                <Art src={v.img} shade="bottom" />
                <span className="yt"><Play fill="currentColor" /></span>
                <span className="cap"><span>{v.title}</span><span>{v.length}</span></span>
              </Link>
            ))}
            </div>
          </div>
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final call: phone capture ── */}
      <section className="final">
        <img src="/img/hands-spotlight.jpg" alt="" loading="lazy" />
        <div className="wrap final-split">
          <div>
            <span className="eyebrow"><i />Free 10-minute call</span>
            <h2>Not sure where <em>to start?</em></h2>
            <p className="lede">Leave your number. A Voiceroom coach will call you back within a working day and suggest the right next step — for you or your child.</p>
          </div>
          <div className="final-form">
            <PhoneForm source="Home — final CTA" dark />
          </div>
        </div>
      </section>
    </>
  )
}
