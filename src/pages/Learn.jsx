import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { POSTS, formatDate, postImg } from '../data'
import { useSEO } from '../lib/seo'

export default function Learn() {
  useSEO('Articles', 'Free articles on public speaking, debating and interviews from Voiceroom coaches.')
  const cats = ['All', ...new Set(POSTS.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat)
  const [lead, ...rest] = list

  return (
    <>
      <PageHead
        title="Articles"
        lede="Short, practical pieces from our coaches on speaking, debating and interviews. Free to read, no sign-up."
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(56px, 8vw, 104px)' }}>
        <div className="filter-bar" role="tablist" aria-label="Filter by topic">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`filter-btn ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        {lead && (
          <Link to={`/learn/${lead.slug}`} className="feature-post">
            <img src={postImg(lead, POSTS.indexOf(lead))} alt="" />
            <div>
              <p className="meta">{lead.category} · {lead.read} read</p>
              <h2>{lead.title}</h2>
              <p className="lede">{lead.excerpt}</p>
              <p className="meta" style={{ marginTop: 16 }}>{lead.author} · {formatDate(lead.date)}</p>
            </div>
          </Link>
        )}
        <div className="post-list">
          {rest.map((p) => (
            <Link key={p.slug} to={`/learn/${p.slug}`} className="post-item">
              <div>
                <p className="meta">{p.category} · {formatDate(p.date)} · {p.read} read</p>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
              </div>
              <img src={postImg(p, POSTS.indexOf(p))} alt="" loading="lazy" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
