import { Link } from 'react-router-dom'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="footer dark">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <p className="muted" style={{ maxWidth: '34ch' }}>
                Communication training for schools, colleges, individuals and teams. Based in New Delhi, working across India.
              </p>
              <div className="socials">
                <a href="#" aria-label="Instagram">Ig</a>
                <a href="#" aria-label="YouTube">Yt</a>
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Spotify podcast">Sp</a>
              </div>
            </div>
            <div>
              <h4>Learn</h4>
              <ul>
                <li><Link to="/programs">All programs</Link></li>
                <li><Link to="/programs?for=Schools">For schools</Link></li>
                <li><Link to="/programs?for=Colleges">For colleges</Link></li>
                <li><Link to="/corporate">For teams</Link></li>
              </ul>
            </div>
            <div>
              <h4>Miyagi</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/learn">Articles & podcast</Link></li>
              </ul>
            </div>
            <div>
              <h4>Talk to us</h4>
              <ul>
                <li><a href="tel:+919876543210">+91 98765 43210</a></li>
                <li><a href="mailto:hello@miyagi.in">hello@miyagi.in</a></li>
                <li><Link to="/contact">Contact form</Link></li>
                <li><Link to="/admin">Team login</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-word" aria-hidden="true">miyagi<span>.</span></div>
          <div className="footer-base">
            <span>© 2026 Miyagi Learning Pvt. Ltd.</span>
            <span>Privacy · Terms · Refunds</span>
          </div>
        </div>
      </footer>
    </>
  )
}
