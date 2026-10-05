import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ProgramCard({ program, index, className = '' }) {
  return (
    <Link to={`/programs/${program.slug}`} className={`prog-card ${className}`}>
      <img src={program.img} alt="" loading="lazy" decoding="async" />
      <div className="prog-card-top">
        <span className="prog-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="prog-dur">{program.duration}</span>
      </div>
      <div className="prog-card-body">
        <h3>{program.name}</h3>
        <p>{program.tagline}</p>
        <div className="meta">
          {program.audiences.map((a) => <span key={a} className="chip chip-glass">{a}</span>)}
        </div>
      </div>
      <span className="prog-go" aria-hidden="true"><ArrowUpRight /></span>
    </Link>
  )
}
