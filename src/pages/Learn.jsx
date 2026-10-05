import { useState } from 'react'
import { Link } from 'react-router-dom'
import Art from '../components/Art'
import PageHead from '../components/PageHead'
import { POSTS, formatDate, postImg } from '../data'
import { useSEO } from '../lib/seo'

function Articles() {
  const posts = POSTS
  const cats = ['All', ...new Set(posts.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? posts : posts.filter((p) => p.category === cat)
  const [lead, ...rest] = list

  return (
    <>
      <div className="filter-bar">
        {cats.map((c) => <button key={c} className={`filter-btn ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      {lead && (
        <Link to={`/learn/${lead.slug}`} className="feature-post">
          <Art src={postImg(lead)} />
          <div>
            <span className="label">{lead.category} · {lead.read} read</span>
            <h2>{lead.title}</h2>
            <p className="lede">{lead.excerpt}</p>
            <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>{lead.author} · {formatDate(lead.date)}</p>
          </div>
        </Link>
      )}
      <div className="post-list">
        {rest.map((p, i) => (
          <Link key={p.slug} to={`/learn/${p.slug}`} className="post-item">
            <div>
              <span className="label">{p.category} · {p.read}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
            <Art src={postImg(p, i)} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default function Learn() {
  useSEO('Articles', 'Free articles on public speaking, debating, interviews and confident communication from Miyagi coaches.')
  return (
    <>
      <PageHead
        label="Learn · articles"
        title={<>Ideas you can <em>use tonight.</em></>}
        lede="Short, practical pieces from our coaches on speaking, arguing and being heard — free, forever. New articles every week."
        img="/img/notes.jpg"
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <Articles />
      </section>
    </>
  )
}
