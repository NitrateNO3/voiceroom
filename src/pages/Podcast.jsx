import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import PageHead from '../components/PageHead'
import { EPISODES, VIDEOS, MEDIA } from '../data'
import { useSEO } from '../lib/seo'
import { track } from '../lib/analytics'

const BARS = Array.from({ length: 64 }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * 60 + Math.cos(i * 0.6) * 22))

// Stand-in player so the page can be reviewed before the Spotify feed exists.
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
        <div className="cover">
          <img src="/img/podcast-mic.jpg" alt="" />
          <span>The Speak Easy</span>
        </div>
        <div>
          <p className="meta">Episode {ep.n} · {ep.guest}</p>
          <h3>{ep.title}</h3>
          <div className="player-ctrl">
            <button aria-label="Back 15 seconds" onClick={() => setPos(Math.max(0, pos - 15 / totalSec))}><SkipBack size={18} /></button>
            <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause /> : <Play />}
            </button>
            <button aria-label="Forward 15 seconds" onClick={() => setPos(Math.min(1, pos + 15 / totalSec))}><SkipForward size={18} /></button>
            <div className="wave" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos((e.clientX - r.left) / r.width) }}>
              {BARS.map((h, i) => <i key={i} className={i / BARS.length < pos ? 'on' : ''} style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="player-time">
            <span>{Math.floor(cur / 60)}:{String(cur % 60).padStart(2, '0')}</span>
            <span>{ep.length}</span>
          </div>
          <div className="platforms">
            {Object.entries(MEDIA.platforms).map(([p, href]) => <a key={p} href={href} target="_blank" rel="noreferrer">Listen on {p}</a>)}
          </div>
        </div>
      </div>
      <div>
        {EPISODES.map((e) => (
          <div key={e.n} className="ep-row">
            <span className="n">Ep. {e.n}</span>
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

// With a Spotify show ID set in data.js, the real Spotify player is embedded.
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

// Click-to-load YouTube embed: no YouTube script loads until someone presses play.
// Set `youtubeId` on a video in data.js to embed it.
function Video({ v }) {
  const [on, setOn] = useState(false)
  return (
    <div>
      {on && v.youtubeId ? (
        <div className="vid"><iframe src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media" allowFullScreen /></div>
      ) : (
        <button className="vid" onClick={() => { setOn(true); track('video_play', { title: v.title }) }} aria-label={`Play ${v.title}`}>
          <img src={v.img} alt="" loading="lazy" />
          <span className="yt"><Play fill="currentColor" /><span>{on ? 'Add the YouTube ID to play this' : `Play · ${v.length}`}</span></span>
        </button>
      )}
      <h3>{v.title}</h3>
    </div>
  )
}

export default function PodcastPage() {
  useSEO('Podcast and videos', 'The Speak Easy podcast and Voiceroom YouTube videos on public speaking, debate and interviews.')
  return (
    <>
      <PageHead
        title="Podcast and videos"
        lede="The Speak Easy comes out every other Thursday. Short practice videos go up on YouTube most weeks."
      />
      <section className="wrap" id="podcast">
        <Podcast />
      </section>
      <section className="section wrap" id="videos">
        <div className="section-head">
          <h2>On YouTube</h2>
          <a href={MEDIA.youtubeChannel} target="_blank" rel="noreferrer" className="text-link">Subscribe to the channel</a>
        </div>
        <div className="video-grid">
          {VIDEOS.map((v) => <Video key={v.title} v={v} />)}
        </div>
      </section>
    </>
  )
}
