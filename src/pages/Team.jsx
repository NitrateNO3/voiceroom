import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import { TEAM } from '../data'
import { useSEO } from '../lib/seo'

export default function Team() {
  useSEO('Team', 'The coaches, debaters and teachers behind Miyagi.')
  return (
    <>
      <PageHead
        label="Team"
        title={<>Coaches who’ve <em>stood there</em> too.</>}
        lede="National debaters, theatre actors, teachers and recruiters. Every coach is trained in the Miyagi method and observed before they lead a batch."
        img="/img/audience-dark.jpg"
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
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
            <span className="label">We’re hiring</span>
            <h2>Love a good argument? <em>Coach with us.</em></h2>
          </div>
          <Link to="/contact" className="btn btn-ember btn-lg">Get in touch <ArrowRight /></Link>
        </div>
      </section>
    </>
  )
}
