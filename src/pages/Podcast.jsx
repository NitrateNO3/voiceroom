import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import Art from '../components/Art'
import PageHead from '../components/PageHead'
import { EPISODES, VIDEOS, MEDIA } from '../data'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

const BARS = Array.from({ length: 64 }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * 60 + Math.cos(i * 0.6) * 22))

function Player() {
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
            {Object.entries(MEDIA.platforms).map(([p, href]) => <a key={p} href={href} target="_blank" rel="noreferrer" className="chip">{p}</a>)}
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
        <a href={MEDIA.youtubeChannel} target="_blank" rel="noreferrer" className="btn btn-sm">Subscribe on YouTube</a>
      </div>
    </>
  )
}

// With a Spotify show ID set in data.js, the real Spotify player is embedded;
// until then a simulated player stands in so the page can be reviewed.
function Podcast() {
  if (MEDIA.spotifyShowId)
    return (
      <iframe
        className="spotify" title="The Speak Easy on Spotify" loading="lazy"
        src={`https://open.spotify.com/embed/show/${MEDIA.spotifyShowId}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    )
  return <Player />
}

export default function PodcastPage() {
  useSEO('Podcast & Videos', 'The Speak Easy podcast and Voiceroom YouTube videos: conversations and drills on public speaking and communication.')
  return (
    <>
      <PageHead
        label="Podcast & YouTube"
        title={<>Press <em>play.</em></>}
        lede="The Speak Easy podcast every fortnight, plus short drills and stage highlights on YouTube. Learn on the commute, the walk, the school run."
        img="/img/studio-mic.jpg"
      />
      <section className="wrap" id="podcast">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div><span className="label label-dot">The Speak Easy · podcast</span><h2 style={{ marginTop: 6 }}>Listen <em>in.</em></h2></div>
        </div>
        <Podcast />
      </section>
      <section className="section wrap" id="videos">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div><span className="label label-dot">Voiceroom on YouTube</span><h2 style={{ marginTop: 6 }}>Watch <em>&amp; practise.</em></h2></div>
        </div>
        <Videos />
      </section>
    </>
  )
}
