import { useState } from 'react'
import { Link } from 'react-router-dom'
import Art from '../components/Art'
import PageHead from '../components/PageHead'
import { EventList } from '../components/EventRow'
import { useStore } from '../lib/store'
import { useSEO } from '../lib/seo'
import { formatDate, isPastEvent, eventImg } from '../data'

export default function Events() {
  useSEO('Events', 'Open mics, debate leagues and bootcamps. Book your seat online.')
  const events = useStore((s) => s.events)
  const [tab, setTab] = useState('upcoming')
  const upcoming = events.filter((e) => !isPastEvent(e)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter(isPastEvent).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHead
        label="Events"
        title={<>Get on <em>stage.</em></>}
        lede="Open mics, leagues and intensives. Book online in under a minute — your ticket and confirmation land in your inbox."
        img="/img/confetti.jpg"
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <div className="tabs" role="tablist">
          <button className={tab === 'upcoming' ? 'on' : ''} onClick={() => setTab('upcoming')}>Upcoming · {upcoming.length}</button>
          <button className={tab === 'past' ? 'on' : ''} onClick={() => setTab('past')}>Past events · gallery</button>
        </div>
        {tab === 'upcoming' ? (
          <EventList events={upcoming} />
        ) : (
          <div className="gallery">
            {past.map((e, i) => (
              <Art key={e.slug} src={eventImg(e)} shade="bottom" style={{ animation: `rise-in .6s var(--ease-out) ${i * 60}ms both` }}>
                <h4>{e.title}</h4>
                <p>{e.subtitle} · {formatDate(e.date, { month: 'long', year: 'numeric' })}</p>
              </Art>
            ))}
          </div>
        )}
        {tab === 'past' && <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>Photo galleries are uploaded from the admin panel after each event. <Link to="/events" className="link-arrow" onClick={() => setTab('upcoming')}>See what’s next</Link></p>}
      </section>
    </>
  )
}
