import { useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import ProgramCard from '../components/ProgramCard'
import { PROGRAMS, AUDIENCES } from '../data'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

export default function Programs() {
  useSEO('Programs', 'Eight communication programs for schools, colleges and individuals: public speaking, debating, MUN and more.')
  const [params, setParams] = useSearchParams()
  const active = params.get('for') || 'All'
  const list = active === 'All' ? PROGRAMS : PROGRAMS.filter((p) => p.audiences.includes(active))

  const pick = (a) => {
    track('program_filter', { audience: a })
    setParams(a === 'All' ? {} : { for: a }, { replace: true })
  }

  return (
    <>
      <PageHead
        label="Programs"
        title={<>Pick the room <em>you’re</em> walking into.</>}
        lede="Every program is small-batch, coach-led and ends on a real stage. Filter by who it’s for, then enquire — we’ll help you choose."
        img="/img/speaker-hall.jpg"
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <div className="filter-bar" role="tablist" aria-label="Filter by audience">
          {['All', ...AUDIENCES].map((a) => (
            <button key={a} className={`filter-btn ${active === a ? 'on' : ''}`} onClick={() => pick(a)} role="tab" aria-selected={active === a}>
              {a}
              <span className="count">{a === 'All' ? PROGRAMS.length : PROGRAMS.filter((p) => p.audiences.includes(a)).length}</span>
            </button>
          ))}
        </div>
        <div className="prog-grid" key={active}>
          {list.map((p, i) => (
            <div key={p.slug} style={{ animation: `rise-in .6s var(--ease-out) ${i * 50}ms both` }}>
              <ProgramCard program={p} index={PROGRAMS.indexOf(p)} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
