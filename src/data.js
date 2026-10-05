// Site content. Articles, episodes and videos live here until a CMS is plugged in.

export const POSTS = [
  {
    slug: 'nervous-is-not-a-flaw',
    title: 'Nerves aren’t a flaw. You just haven’t put them to work yet.',
    category: 'Public Speaking',
    read: '6 min',
    date: '2026-09-28',
    author: 'Aanya Kapoor',
    excerpt: 'A racing heart before a talk feels a lot like excitement, because it almost is. Here’s how we teach students to use it.',
  },
  {
    slug: 'three-sentence-rebuttal',
    title: 'The three-sentence rebuttal',
    category: 'Debating',
    read: '4 min',
    date: '2026-09-14',
    author: 'Rohan Mehta',
    excerpt: 'Say what they claimed, show where it breaks, then say why it matters. A three-step answer you can build in under a minute.',
  },
  {
    slug: 'parents-guide-to-mun',
    title: 'A parent’s guide to Model UN',
    category: 'Model UN',
    read: '8 min',
    date: '2026-08-30',
    author: 'Ishita Rao',
    excerpt: 'What actually happens in committee, what your child learns, and how to tell a good conference from a bad one.',
  },
  {
    slug: 'pause-is-power',
    title: 'The pause is the most underused tool on stage',
    category: 'Public Speaking',
    read: '3 min',
    date: '2026-08-12',
    author: 'Aanya Kapoor',
    excerpt: 'Two seconds of silence feels endless to you and calm to everyone listening.',
  },
  {
    slug: 'interview-tell-me-about-yourself',
    title: 'How to answer “Tell me about yourself” in 60 seconds',
    category: 'Interviews',
    read: '5 min',
    date: '2026-07-25',
    author: 'Kabir Sethi',
    excerpt: 'Start with what you do now, add one thing from before, finish with what you want next. The order we practise with every placement batch.',
  },
]

// Podcast / YouTube integration. Fill these in to switch from the demo player to
// the real embeds: a Spotify show ID embeds the live feed; each video takes a
// `youtubeId` (the part after watch?v=) below.
export const MEDIA = {
  spotifyShowId: '',
  youtubeChannel: 'https://www.youtube.com/@voiceroom',
  platforms: {
    Spotify: 'https://open.spotify.com/',
    'Apple Podcasts': 'https://podcasts.apple.com/',
    YouTube: 'https://www.youtube.com/@voiceroom',
  },
}

export const EPISODES = [
  { n: 24, title: 'Why kids stop raising their hands', guest: 'with Dr. Meera Iyer, child psychologist', length: '42:10' },
  { n: 23, title: 'Debating as a team sport', guest: 'with three school debate captains', length: '35:48' },
  { n: 22, title: 'Stage fright never fully leaves, and that’s fine', guest: 'with Aanya Kapoor', length: '28:05' },
  { n: 21, title: 'What recruiters actually listen for', guest: 'with Kabir Sethi', length: '39:31' },
]

export const VIDEOS = [
  { title: 'The 2-minute warm-up before any talk', length: '2:14', img: '/img/presentation-dark.jpg' },
  { title: 'Rebuttal practice with a Saturday batch', length: '11:40', img: '/img/speaker-hall.jpg' },
  { title: 'Five students, five two-minute talks', length: '8:22', img: '/img/mic-teal.jpg' },
]

export const TEAM = [
  { name: 'Aanya Kapoor', role: 'Founder & Head Coach', note: 'Former national-level debater. Started Voiceroom in 2019.' },
  { name: 'Rohan Mehta', role: 'Debate Director', note: 'Coaches the debate batches and judges school tournaments.' },
  { name: 'Ishita Rao', role: 'Curriculum Lead', note: 'Plans what each batch covers, week by week.' },
  { name: 'Kabir Sethi', role: 'Careers Coach', note: 'Ex-HR lead. Knows exactly what interviewers listen for.' },
  { name: 'Neha Batra', role: 'Voice & Theatre Coach', note: 'Theatre actor. Runs the voice and breathing sessions.' },
  { name: 'Dev Malhotra', role: 'Partnerships', note: 'Looks after schools that run Voiceroom clubs.' },
]


// Article cover photos, looked up by slug.
const POST_IMG = {
  'nervous-is-not-a-flaw': 'studio-mic',
  'three-sentence-rebuttal': 'auditorium',
  'parents-guide-to-mun': 'conference',
  'pause-is-power': 'mic-teal',
  'interview-tell-me-about-yourself': 'friends-laptop',
}
const POST_FALLBACK = ['notes', 'notebook', 'students-class', 'college-audience']
export const postImg = (p, i = 0) => p.img || `/img/${POST_IMG[p.slug] || POST_FALLBACK[i % POST_FALLBACK.length]}.jpg`

export const formatDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', opts)
