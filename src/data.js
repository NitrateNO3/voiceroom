// Mock content for the prototype. In production this comes from the admin backend.

export const AUDIENCES = ['Schools', 'Colleges', 'Individuals']

export const PROGRAMS = [
  {
    slug: 'public-speaking',
    img: '/img/mic-crowd.jpg',
    name: 'Public Speaking',
    tagline: 'Stand up. Slow down. Say it like you mean it.',
    audiences: ['Schools', 'Colleges', 'Individuals'],
    duration: '8 weeks',
    format: 'Weekly studio sessions',
    tone: 'ember',
    blurb:
      'Our flagship. Students learn to structure a talk, own the room, and handle the shaky-hands moment before every mic.',
    outcomes: ['Structure any talk in 5 minutes', 'Voice, pace and pause control', 'Handle Q&A without panic', 'Final showcase on a real stage'],
  },
  {
    slug: 'debating',
    img: '/img/auditorium.jpg',
    name: 'Debating',
    tagline: 'Argue better. Listen harder.',
    audiences: ['Schools', 'Colleges'],
    duration: '10 weeks',
    format: 'Parliamentary + Asian formats',
    tone: 'ink',
    blurb:
      'From first motion to tournament finals. Rebuttal drills, case building and a league that runs all year.',
    outcomes: ['Case building & framing', 'Rebuttal under 30 seconds of prep', 'Judging criteria from the inside', 'Inter-school league entry'],
  },
  {
    slug: 'model-un',
    img: '/img/conference.jpg',
    name: 'Model UN',
    tagline: 'Diplomacy, in rehearsal.',
    audiences: ['Schools', 'Colleges'],
    duration: '6 weeks',
    format: 'Committee simulations',
    tone: 'moss',
    blurb: 'Research, position papers, caucusing and resolutions — the whole MUN toolkit with mock committees every week.',
    outcomes: ['Position paper writing', 'Moderated & unmoderated caucus', 'Drafting resolutions', 'Conference prep'],
  },
  {
    slug: 'storytelling',
    img: '/img/laughing.jpg',
    name: 'Storytelling',
    tagline: 'Every good point is a story in disguise.',
    audiences: ['Schools', 'Individuals'],
    duration: '4 weeks',
    format: 'Small-group workshops',
    tone: 'sun',
    blurb: 'Personal narrative, structure and delivery. The quiet program that makes every other skill land harder.',
    outcomes: ['Story arcs that hold attention', 'Using personal anecdotes', 'Voice & character', 'Open-mic performance'],
  },
  {
    slug: 'creative-writing',
    img: '/img/typewriter.jpg',
    name: 'Creative Writing',
    tagline: 'Think on paper first.',
    audiences: ['Schools', 'Individuals'],
    duration: '6 weeks',
    format: 'Writing studio',
    tone: 'moss',
    blurb: 'Clear writing is clear thinking. Essays, speeches and fiction with line-by-line feedback from mentors.',
    outcomes: ['Drafting & editing habits', 'Speech writing', 'Persuasive essays', 'Published anthology'],
  },
  {
    slug: 'interview-skills',
    img: '/img/interview.jpg',
    name: 'Interview Skills',
    tagline: 'The 30 minutes that matter.',
    audiences: ['Colleges', 'Individuals'],
    duration: '3 weeks',
    format: 'Mock interviews + feedback',
    tone: 'ink',
    blurb: 'Placements, admissions, first jobs. Recorded mock interviews with honest, specific feedback.',
    outcomes: ['Tell me about yourself — sorted', 'STAR answers', 'Group discussion tactics', '3 recorded mocks'],
  },
  {
    slug: 'critical-thinking',
    img: '/img/discussion.jpg',
    name: 'Critical Thinking',
    tagline: 'Question the question.',
    audiences: ['Schools', 'Colleges'],
    duration: '6 weeks',
    format: 'Socratic seminars',
    tone: 'sun',
    blurb: 'Logic, fallacies and evidence — taught through debates on things students actually care about.',
    outcomes: ['Spot weak arguments', 'Evaluate sources', 'Reason under pressure', 'Socratic circle facilitation'],
  },
  {
    slug: 'theatre-voice',
    img: '/img/curtain.jpg',
    name: 'Theatre & Voice',
    tagline: 'Your body talks first.',
    audiences: ['Schools', 'Individuals'],
    duration: '8 weeks',
    format: 'Movement + voice studio',
    tone: 'ember',
    blurb: 'Breath, projection, posture and presence — borrowed from the stage and built for everyday speaking.',
    outcomes: ['Breath & projection', 'Stage presence', 'Improvisation', 'End-of-term performance'],
  },
]

export const EVENTS = [
  {
    slug: 'open-mic-october',
    title: 'Open Mic Night',
    subtitle: 'Five minutes. One mic. No script.',
    date: '2026-10-18',
    time: '6:30 PM',
    venue: 'The Courtyard, Hauz Khas, New Delhi',
    price: 499,
    seats: 60,
    booked: 41,
    tone: 'ember',
    status: 'upcoming',
    about:
      'Our monthly open mic for anyone who wants stage time. Sign up on the night, speak on anything for five minutes, and get one line of feedback from a Miyagi coach.',
  },
  {
    slug: 'debate-league-s3',
    title: 'Inter-School Debate League',
    subtitle: 'Season 3 · Opening round',
    date: '2026-11-02',
    time: '9:00 AM',
    venue: 'India Habitat Centre, New Delhi',
    price: 1499,
    seats: 120,
    booked: 88,
    tone: 'ink',
    status: 'upcoming',
    about:
      'Teams of three from 24 schools. British Parliamentary format, adjudicated by our coach panel. Ticket covers one team registration plus lunch.',
  },
  {
    slug: 'speak-up-bootcamp',
    title: 'Speak Up Bootcamp',
    subtitle: 'A two-day weekend intensive',
    date: '2026-11-22',
    time: '10:00 AM',
    venue: 'Miyagi Studio, Gurugram',
    price: 3999,
    seats: 30,
    booked: 12,
    tone: 'moss',
    status: 'upcoming',
    about:
      'Two days, twelve hours, one recorded talk at the end. Built for college students and young professionals who want a fast, focused reset.',
  },
  { slug: 'mun-2026', title: 'Miyagi MUN 2026', subtitle: '300 delegates · 6 committees', date: '2026-08-10', tone: 'moss', status: 'past', venue: 'New Delhi' },
  { slug: 'story-slam', title: 'Story Slam', subtitle: 'Monsoon edition', date: '2026-07-19', tone: 'sun', status: 'past', venue: 'Gurugram' },
  { slug: 'debate-finals-s2', title: 'Debate League Finals', subtitle: 'Season 2', date: '2026-03-14', tone: 'ink', status: 'past', venue: 'New Delhi' },
  { slug: 'open-mic-sept', title: 'Open Mic Night', subtitle: 'September', date: '2026-09-20', tone: 'ember', status: 'past', venue: 'New Delhi' },
]

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
  { name: 'Rohan Mehta', img: '/img/team-rohan.jpg', role: 'Debate Director', note: 'Runs the inter-school league and coaches finals teams.', tone: 'ink' },
  { name: 'Ishita Rao', img: '/img/team-ishita.jpg', role: 'MUN & Curriculum Lead', note: 'Designs every syllabus. Secretly loves rubrics.', tone: 'moss' },
  { name: 'Kabir Sethi', img: '/img/team-kabir.jpg', role: 'Corporate & Careers', note: 'Ex-HR lead. Runs interview prep and team trainings.', tone: 'sun' },
  { name: 'Neha Batra', img: '/img/team-neha.jpg', role: 'Voice & Theatre Coach', note: 'Fifteen years on stage. Teaches breath before words.', tone: 'ember' },
  { name: 'Dev Malhotra', img: '/img/team-dev.jpg', role: 'Programs & Partnerships', note: 'The person schools talk to first.', tone: 'ink' },
]

export const PARTNERS = ['Modern School', 'DPS R.K. Puram', 'Ashoka University', 'Shri Ram College', 'The Heritage School', 'Vasant Valley', 'IIT Delhi', 'Sanskriti School']

// Photography. Events and posts live in the editable store, so their images are
// looked up by slug (with a fallback per tone) rather than saved alongside them.
const EVENT_IMG = {
  'open-mic-october': 'mic-blue',
  'debate-league-s3': 'speaker-hall',
  'speak-up-bootcamp': 'seminar',
  'mun-2026': 'event-hall',
  'story-slam': 'hands-spotlight',
  'debate-finals-s2': 'audience-dark',
  'open-mic-sept': 'mic-teal',
}
const TONE_IMG = { ember: 'mic-crowd', ink: 'audience-dark', moss: 'event-hall', sun: 'hands-spotlight' }
export const eventImg = (e) => e.img || `/img/${EVENT_IMG[e.slug] || TONE_IMG[e.tone] || 'mic-crowd'}.jpg`

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

export const rupees = (n) => '₹' + Number(n).toLocaleString('en-IN')

// Events auto-archive: anything dated before today counts as past.
export const isPastEvent = (e) => e.status === 'past' || e.date < new Date().toISOString().slice(0, 10)
