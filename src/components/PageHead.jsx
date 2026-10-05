export default function PageHead({ title, lede, children }) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </header>
  )
}
