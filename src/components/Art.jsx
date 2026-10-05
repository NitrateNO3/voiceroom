// Image panel. Pass `src` for photography (graded and shaded consistently);
// without it, falls back to a toned, textured pattern — still used by the admin.
export default function Art({ tone = 'ember', pattern = 'rings', src, alt = '', word, tag, shade, className = '', style, children }) {
  const kind = src ? `art-photo${shade ? ` shade-${shade}` : ''}` : `art-${pattern}`
  return (
    <div className={`art ${kind} tone-${tone} ${className}`} style={style} aria-hidden={!children && !alt}>
      {src && <img src={src} alt={alt} loading="lazy" decoding="async" />}
      {tag && <span className="art-tag">{tag}</span>}
      {word && <span className="art-word">{word}</span>}
      {children}
    </div>
  )
}
