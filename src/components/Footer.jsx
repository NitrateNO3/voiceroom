import { Link } from 'react-router-dom'
import { Logo } from './Nav'
import Newsletter from './Newsletter'

const SOCIALS = [['Instagram', '#'], ['YouTube', '#'], ['LinkedIn', '#'], ['Spotify', '#']]

function Base() {
  return (
    <div className="footer-base">
      <span>© 2026 Voiceroom Learning Pvt. Ltd. · <a href="#">Privacy</a> · <a href="#">Terms</a></span>
      <div className="socials">
        {SOCIALS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </div>
    </div>
  )
}

// `slim` renders only the bottom bar, used on the single-screen Contact page.
export default function Footer({ slim }) {
  if (slim)
    return (
      <footer className="footer footer-slim">
        <div className="wrap"><Base /></div>
      </footer>
    )
  return (
    <footer className="footer">
      <div className="wrap">
        <Newsletter />
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>Public speaking and debate classes in Gurugram and online, since 2019.</p>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Free to read and watch</h4>
            <ul>
              <li><Link to="/learn">Articles</Link></li>
              <li><Link to="/podcast">The Speak Easy podcast</Link></li>
              <li><Link to="/podcast#videos">YouTube</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><a href="mailto:hello@voiceroom.in">hello@voiceroom.in</a></li>
              <li><a href="https://wa.me/919876543210">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <Base />
      </div>
    </footer>
  )
}
