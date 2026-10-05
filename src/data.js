// Site content. Articles, episodes and videos live here until a CMS is plugged in.

export const POSTS = [
  {
    slug: 'nervous-is-not-a-flaw',
    title: 'Nervous is not a flaw. It is fuel you haven’t learned to use.',
    category: 'Public Speaking',
    read: '6 min',
    date: '2026-09-28',
    author: 'Aanya Kapoor',
    excerpt: 'The racing heart before a talk is the same physiology as excitement. Here is how our coaches teach students to re-label it.',
  },
  {
    slug: 'three-sentence-rebuttal',
    title: 'The three-sentence rebuttal',
    category: 'Debating',
    read: '4 min',
    date: '2026-09-14',
    author: 'Rohan Mehta',
    excerpt: 'Name it, break it, weigh it. A simple frame that turns panicked responses into clean clash.',
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
    excerpt: 'Silence feels like forever to the speaker and like confidence to the audience.',
  },
  {
    slug: 'interview-tell-me-about-yourself',
    title: '“Tell me about yourself” — a 60-second template',
    category: 'Interviews',
    read: '5 min',
    date: '2026-07-25',
    author: 'Kabir Sethi',
    excerpt: 'Present, past, future. The structure we drill with every placement batch.',
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
  { n: 23, title: 'Debating as a team sport', guest: 'with the Season 2 champions', length: '35:48' },
  { n: 22, title: 'Stage fright never fully leaves — and that’s fine', guest: 'with Aanya Kapoor', length: '28:05' },
  { n: 21, title: 'What recruiters actually listen for', guest: 'with Kabir Sethi', length: '39:31' },
]

export const VIDEOS = [
  { title: 'The 2-minute warm-up before any talk', length: '2:14', tone: 'ember', img: '/img/presentation-dark.jpg' },
  { title: 'Rebuttal drill: live with Season 3 teams', length: '11:40', tone: 'ink', img: '/img/speaker-hall.jpg' },
  { title: 'Open Mic Night — best of September', length: '8:22', tone: 'sun', img: '/img/mic-teal.jpg' },
]

export const TEAM = [
  { name: 'Aanya Kapoor', img: '/img/team-aanya.jpg', role: 'Founder & Head Coach', note: 'Former national debate champion. Has judged 200+ rounds.', tone: 'ember' },
  { name: 'Rohan Mehta', img: '/img/team-rohan.jpg', role: 'Debate Director', note: 'Coaches debate teams from first motion to tournament finals.', tone: 'ink' },
  { name: 'Ishita Rao', img: '/img/team-ishita.jpg', role: 'Curriculum Lead', note: 'Designs every syllabus. Secretly loves rubrics.', tone: 'moss' },
  { name: 'Kabir Sethi', img: '/img/team-kabir.jpg', role: 'Careers Coach', note: 'Ex-HR lead. Knows exactly what interviewers listen for.', tone: 'sun' },
  { name: 'Neha Batra', img: '/img/team-neha.jpg', role: 'Voice & Theatre Coach', note: 'Fifteen years on stage. Teaches breath before words.', tone: 'ember' },
  { name: 'Dev Malhotra', img: '/img/team-dev.jpg', role: 'Partnerships', note: 'The person schools talk to first.', tone: 'ink' },
]

export const PARTNERS = ['Modern School', 'DPS R.K. Puram', 'Ashoka University', 'Shri Ram College', 'The Heritage School', 'Vasant Valley', 'IIT Delhi', 'Sanskriti School']

// Article cover photos, looked up by slug.
const POST_IMG = {
  'nervous-is-not-a-flaw': 'studio-mic',
  'three-sentence-rebuttal': 'auditorium',
  'parents-guide-to-mun': 'conference',
  'pause-is-power': 'mic-teal',
  'interview-tell-me-about-yourself': 'friends-laptop',
}
const POST_FALLBACK = ['notes', 'notebook', 'kids-writing', 'classroom']
export const postImg = (p, i = 0) => p.img || `/img/${POST_IMG[p.slug] || POST_FALLBACK[i % POST_FALLBACK.length]}.jpg`

export const formatDate = (iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', opts)
