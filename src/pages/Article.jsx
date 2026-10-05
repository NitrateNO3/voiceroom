import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Art from '../components/Art'
import NotFound from './NotFound'
import { POSTS as posts, formatDate, postImg, TEAM } from '../data'
import { useSEO } from '../lib/seo'

export default function Article() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  useSEO(post?.title, post?.excerpt, post && {
    image: postImg(post, posts.indexOf(post)),
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: post.excerpt, datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
      publisher: { '@type': 'Organization', name: 'Voiceroom' },
    },
  })
  if (!post) return <NotFound />
  const next = posts.filter((p) => p !== post).slice(0, 2)
  const paras = post.body
    ? post.body.split(/\n\s*\n/)
    : [
        post.excerpt + ' Every coach at Voiceroom has a version of this conversation with a new student in their first week.',
        'The research is surprisingly consistent: the physical signs of anxiety and excitement are almost identical. A faster heart rate, shallow breathing, a rush of energy. What changes is the label we put on it — and that label changes how we perform.',
        'So we don’t tell students to calm down. We tell them to say, out loud, “I’m excited.” It sounds silly. It works more often than it doesn’t.',
        'Then we give the energy somewhere to go: a strong first line memorised word-for-word, a planned pause after it, and one person in the room to talk to first. Structure is what turns adrenaline into presence.',
      ]

  return (
    <article className="section">
      <div className="article wrap">
        <Link to="/learn" className="crumbs"><ArrowLeft size={14} /> All articles</Link>
        <span className="label label-dot">{post.category} · {post.read} read</span>
        <h1 style={{ margin: '20px 0 0' }}>{post.title}</h1>
        <div className="byline">
          {TEAM.find((m) => m.name === post.author)
            ? <img className="avatar" src={TEAM.find((m) => m.name === post.author).img} alt="" />
            : <span className="avatar tone-ember">{post.author.split(' ').map((x) => x[0]).join('')}</span>}
          <div><b>{post.author}</b><p className="muted" style={{ fontSize: 14 }}>{formatDate(post.date, { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
        </div>
      </div>
      <div className="wrap" style={{ maxWidth: 1000, marginBottom: 56 }}>
        <div className="article-cover"><img src={postImg(post, posts.indexOf(post))} alt="" /></div>
      </div>
      <div className="article wrap">
        <div className="body">
          {paras.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          {!post.body && <blockquote>Nerves don’t mean you’re not ready. They mean you care how it goes.</blockquote>}
          {paras.slice(2).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <hr className="rule" style={{ margin: '56px 0 32px' }} />
        <span className="label">Read next</span>
        {next.map((p) => (
          <Link key={p.slug} to={`/learn/${p.slug}`} className="post-item">
            <div><span className="label">{p.category} · {p.read}</span><h3>{p.title}</h3><p>{p.excerpt}</p></div>
            <Art src={postImg(p, posts.indexOf(p))} />
          </Link>
        ))}
      </div>
    </article>
  )
}
