// Page header. With `img`, renders a full-bleed dark photo hero the nav sits over.
export default function PageHead({ label, title, lede, img, children }) {
  if (!img)
    return (
      <header className="page-head wrap">
        {label && <span className="label label-dot">{label}</span>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </header>
    )
  return (
    <header className="page-hero" data-hero-dark>
      <img className="page-hero-img" src={img} alt="" />
      <div className="wrap page-hero-inner">
        {label && <span className="eyebrow"><i />{label}</span>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  )
}
