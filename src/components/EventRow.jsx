import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { formatDate, rupees, eventImg } from '../data'

export default function EventRow({ event, onHover }) {
  const d = new Date(event.date + 'T00:00:00')
  const left = event.seats - event.booked
  return (
    <article className="event-row" onPointerEnter={() => onHover?.(event)}>
      <img className="event-thumb" src={eventImg(event)} alt="" loading="lazy" />
      <div className="event-date">
        <b>{d.getDate()}</b>
        <span>{formatDate(event.date, { month: 'short' })} · {formatDate(event.date, { weekday: 'short' })}</span>
      </div>
      <div className="event-title">
        <span className="label">{event.subtitle}</span>
        <h3><Link to={`/events/${event.slug}`}>{event.title}</Link></h3>
      </div>
      <div className="event-meta">
        <span><Clock /> {event.time}</span>
        <span><MapPin /> {event.venue}</span>
      </div>
      <div className="event-price">
        <b>{rupees(event.price)}</b>
        <div className="seats">
          <div className="seats-bar"><i style={{ width: `${(event.booked / event.seats) * 100}%` }} /></div>
          <small className={left <= 20 ? 'hot' : ''}>{left <= 20 ? `Only ${left} left` : `${left} seats left`}</small>
        </div>
      </div>
      <span className="event-go" aria-hidden="true"><ArrowUpRight /></span>
    </article>
  )
}

// List of rows with a photo that floats after the cursor on hover (desktop only).
export function EventList({ events }) {
  const ref = useRef(null)
  const [hot, setHot] = useState(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--px', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--py', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} className={`event-list ${hot ? 'hovering' : ''}`} onPointerMove={move} onPointerLeave={() => setHot(null)}>
      {events.map((e) => <EventRow key={e.slug} event={e} onHover={setHot} />)}
      <div className="event-preview" aria-hidden="true">
        {events.map((e) => <img key={e.slug} src={eventImg(e)} alt="" className={hot?.slug === e.slug ? 'on' : ''} />)}
      </div>
    </div>
  )
}
