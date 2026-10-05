import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NotFound from './NotFound'
import { POSTS as posts, formatDate, postImg } from '../data'
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
  const next = posts.filter((p) => p !== post).slice(0, 3)
  // Placeholder body until real article text is added (set `body` on a post in data.js).
  const paras = post.body
    ? post.body.split(/\n\s*\n/)
    : [
        'Almost every new student tells us the same thing in their first week: their heart races, their hands shake and their mind goes blank. They take it as proof they aren’t a “natural”.',
        'Here’s what we tell them. The physical signs of nerves and excitement are close to identical. A faster heart rate, quicker breathing, a rush of energy. What changes is the name you give it, and that name changes how you perform.',
        'So we don’t ask students to calm down. We ask them to say, out loud, “I’m excited.” It sounds silly. It works more often than it doesn’t.',
        'Then we give the energy somewhere to go: a first line learned word for word, a planned pause after it, and one friendly face in the room to talk to first.',
      ]

  return (
    <article className="section" style={{ paddingTop: 'clamp(32px, 5vw, 56px)' }}>
      <div className="article wrap">
        <Link to="/learn" className="crumbs"><ArrowLeft size={14} /> All articles</Link>
        <p className="meta">{post.category} · {post.read} read</p>
        <h1>{post.title}</h1>
        <p className="standfirst">{post.excerpt}</p>
        <div className="byline">
          <span className="avatar">{post.author.split(' ').map((x) => x[0]).join('')}</span>
          <div><b>{post.author}</b><p className="meta">{formatDate(post.date, { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
        </div>
      </div>
      <div className="article-cover"><img src={postImg(post, posts.indexOf(post))} alt="" /></div>
      <div className="article wrap">
        <div className="body">
          {paras.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          {!post.body && <blockquote>Nerves don’t mean you aren’t ready. They mean you care how it goes.</blockquote>}
          {paras.slice(2).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="read-next">
          <h2>Read next</h2>
          {next.map((p) => (
            <Link key={p.slug} to={`/learn/${p.slug}`} className="post-item">
              <div><p className="meta">{p.category} · {p.read} read</p><h3>{p.title}</h3><p>{p.excerpt}</p></div>
              <img src={postImg(p, posts.indexOf(p))} alt="" loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
