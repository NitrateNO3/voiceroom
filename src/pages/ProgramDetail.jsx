import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Clock, Users, CalendarDays } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import ProgramCard from '../components/ProgramCard'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { PROGRAMS } from '../data'
import { useSEO } from '../lib/seo'

export default function ProgramDetail() {
  const { slug } = useParams()
  const p = PROGRAMS.find((x) => x.slug === slug)
  useSEO(p?.name, p?.blurb)
  if (!p) return <NotFound />
  const i = PROGRAMS.indexOf(p)
  const more = PROGRAMS.filter((x) => x !== p && x.audiences.some((a) => p.audiences.includes(a))).slice(0, 4)

  return (
    <>
      <header className="page-hero" data-hero-dark>
        <img className="page-hero-img" src={p.img} alt="" />
        <div className="wrap page-hero-inner">
          <nav className="crumbs"><Link to="/programs">Programs</Link> / <span>{p.name}</span></nav>
          <span className="eyebrow"><i />Program {String(i + 1).padStart(2, '0')} · {p.audiences.join(' · ')}</span>
          <h1>{p.name}</h1>
          <p className="lede display" style={{ fontStyle: 'italic', fontSize: 'clamp(24px, 2.8vw, 38px)', color: 'var(--gold)' }}>{p.tagline}</p>
          <div className="poster-meta">
            <span><Clock /> {p.duration}</span>
            <span><CalendarDays /> {p.format}</span>
            <span><Users /> Max 12 per batch</span>
          </div>
        </div>
      </header>

      <section className="wrap">
        <div className="detail-grid">
          <div>
            <span className="label label-dot">About the program</span>
            <p className="big-quote" style={{ marginTop: 24, fontSize: 'clamp(28px, 3.4vw, 46px)' }}>{p.blurb}</p>
            <div className="facts">
              <div><span className="label">Duration</span><b>{p.duration}</b></div>
              <div><span className="label">Format</span><b>{p.format}</b></div>
              <div><span className="label">Batch size</span><b>Max 12</b></div>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '64px 0 28px' }}>What you’ll <em>walk out with</em></h2>
            <ol className="outcomes">{p.outcomes.map((o, k) => <Reveal as="li" key={o} delay={k * 70}>{o}</Reveal>)}</ol>
          </div>
          <aside className="sticky">
            <EnquiryForm program={p.name} title="Enquire about this program" />
          </aside>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-head">
          <div><span className="label">Keep exploring</span><h2>Pairs well <em>with</em></h2></div>
          <Link to="/programs" className="link-arrow">All programs <ArrowUpRight /></Link>
        </div>
        <div className="prog-grid">{more.map((m) => <ProgramCard key={m.slug} program={m} index={PROGRAMS.indexOf(m)} />)}</div>
      </section>
    </>
  )
}
