import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import Art from '../components/Art'
import PageHead from '../components/PageHead'
import { EPISODES, VIDEOS, formatDate, postImg } from '../data'
import { useStore } from '../lib/store'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

function Articles() {
  const posts = useStore((s) => s.posts).filter((p) => p.published)
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

const BARS = Array.from({ length: 64 }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * 60 + Math.cos(i * 0.6) * 22))

function Podcast() {
  const [ep, setEp] = useState(EPISODES[0])
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0.18)
  const timer = useRef()

  useEffect(() => {
    if (!playing) return
    timer.current = setInterval(() => setPos((p) => (p >= 1 ? 0 : p + 0.004)), 120)
    return () => clearInterval(timer.current)
  }, [playing])

  const choose = (e) => {
    setEp(e); setPos(0); setPlaying(true)
    track('podcast_play', { episode: e.n })
  }
  const [m, s] = ep.length.split(':').map(Number)
  const totalSec = m * 60 + s
  const cur = Math.floor(totalSec * pos)

  return (
    <>
      <div className="player">
        <Art src="/img/podcast-mic.jpg" shade="bottom" style={{ display: 'flex', alignItems: 'flex-end', padding: 20 }}>
          <span className="display" style={{ fontSize: 36, lineHeight: 0.95 }}>The<br /><em style={{ color: 'var(--gold)' }}>Speak Easy</em></span>
        </Art>
        <div>
          <span className="label">Episode {ep.n}</span>
          <h3>{ep.title}</h3>
          <div className="player-ctrl">
            <button aria-label="Back 15s" onClick={() => setPos(Math.max(0, pos - 15 / totalSec))}><SkipBack size={20} /></button>
            <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause /> : <Play />}
            </button>
            <button aria-label="Forward 15s" onClick={() => setPos(Math.min(1, pos + 15 / totalSec))}><SkipForward size={20} /></button>
            <div className="wave" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos((e.clientX - r.left) / r.width) }} style={{ cursor: 'pointer' }}>
              {BARS.map((h, i) => <i key={i} className={i / BARS.length < pos ? 'on' : ''} style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="player-time">
            <span>{Math.floor(cur / 60)}:{String(cur % 60).padStart(2, '0')}</span>
            <span>{ep.length}</span>
          </div>
          <div className="platforms">
            {['Spotify', 'Apple Podcasts', 'YouTube', 'RSS'].map((p) => <a key={p} href="#" className="chip">{p}</a>)}
          </div>
        </div>
      </div>
      <div>
        {EPISODES.map((e) => (
          <div key={e.n} className="ep-row">
            <span className="n">EP {e.n}</span>
            <div><b>{e.title}</b><small>{e.guest}</small></div>
            <span className="len">{e.length}</span>
            <button className="mini-play" onClick={() => choose(e)} aria-label={`Play episode ${e.n}`}>
              {playing && ep.n === e.n ? <Pause /> : <Play />}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

// Click-to-load YouTube embed: no third-party script until someone hits play.
// Set `youtubeId` on a video to embed it; channel feed can be pulled via the
// YouTube Data API once the channel ID is known.
function Video({ v, big }) {
  const [on, setOn] = useState(false)
  return (
    <button className="video" onClick={() => { setOn(true); track('video_play', { title: v.title }) }} style={big ? {} : { aspectRatio: 'auto', minHeight: 160 }}>
      {on && v.youtubeId ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media" allowFullScreen />
      ) : (
        <>
          <Art src={v.img} shade="bottom" />
          <span className="yt"><Play fill="currentColor" /></span>
          <span className="cap"><span style={{ fontSize: big ? 20 : 15 }}>{on ? 'Embed appears here once the YouTube ID is set' : v.title}</span><span>{v.length}</span></span>
        </>
      )}
    </button>
  )
}

function Videos() {
  return (
    <>
      <div className="video-grid">
        <Video v={VIDEOS[0]} big />
        <div className="side">
          <Video v={VIDEOS[1]} />
          <Video v={VIDEOS[2]} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, gap: 16, flexWrap: 'wrap' }}>
        <p className="muted">New drills and event highlights every Thursday.</p>
        <a href="#" className="btn btn-sm">Subscribe on YouTube</a>
      </div>
    </>
  )
}

export default function Learn() {
  useSEO('Learn', 'Free articles, podcast episodes and videos on public speaking, debating and communication.')
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'articles'
  const TABS = [['articles', 'Articles'], ['podcast', 'Podcast'], ['videos', 'Videos']]

  return (
    <>
      <PageHead
        label="Learn · free library"
        title={<>Read. Listen. <em>Watch.</em></>}
        lede="Drills, ideas and conversations from our coaches — free, forever. New pieces every week."
        img="/img/studio-mic.jpg"
      />
      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <div className="tabs" role="tablist">
          {TABS.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setParams(k === 'articles' ? {} : { tab: k }, { replace: true })}>{l}</button>
          ))}
        </div>
        <div key={tab} style={{ animation: 'fadeUp .4s var(--ease)' }}>
          {tab === 'articles' && <Articles />}
          {tab === 'podcast' && <Podcast />}
          {tab === 'videos' && <Videos />}
        </div>
      </section>
    </>
  )
}
