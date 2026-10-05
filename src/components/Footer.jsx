import { Link } from 'react-router-dom'
import { Logo } from './Nav'
import Newsletter from './Newsletter'

const SOCIALS = [['Instagram', 'Ig'], ['YouTube', 'Yt'], ['LinkedIn', 'in'], ['Spotify podcast', 'Sp']]

function Base() {
  return (
    <div className="footer-base">
      <span>© 2026 Miyagi Learning Pvt. Ltd. · <a href="#">Privacy</a> · <a href="#">Terms</a></span>
      <div className="socials">
        {SOCIALS.map(([label, s]) => <a key={s} href="#" aria-label={label}>{s}</a>)}
      </div>
    </div>
  )
}

// `slim` renders only the bottom bar — used on the single-screen Contact page.
export default function Footer({ slim }) {
  if (slim)
    return (
      <footer className="footer footer-slim dark">
        <div className="wrap"><Base /></div>
      </footer>
    )
  return (
    <footer className="footer dark">
      <div className="wrap">
        <Newsletter />
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Public speaking, debating and confident communication. Based in New Delhi, learning across India.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn free</h4>
            <ul>
              <li><Link to="/learn">Articles</Link></li>
              <li><Link to="/podcast">The Speak Easy podcast</Link></li>
              <li><Link to="/podcast#videos">YouTube videos</Link></li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><a href="mailto:hello@miyagi.in">hello@miyagi.in</a></li>
              <li><a href="https://wa.me/919876543210">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <Base />
      </div>
    </footer>
  )
}
