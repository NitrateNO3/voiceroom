import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import { useSEO } from '../lib/seo'

const LINES = [
  ['tel:+919876543210', Phone, 'Call', '+91 98765 43210'],
  ['https://wa.me/919876543210', MessageCircle, 'WhatsApp', 'Message us'],
  ['mailto:hello@miyagi.in', Mail, 'Email', 'hello@miyagi.in'],
  [null, MapPin, 'Studio', '14 Galleria Market, DLF Phase IV, Gurugram'],
  [null, Clock, 'Hours', 'Mon – Sat · 10 am – 7 pm'],
]

// Single-screen contact page: everything fits in the viewport on desktop.
export default function Contact() {
  useSEO('Contact', 'Call, WhatsApp, email or visit Miyagi in Gurugram. We reply within a working day.')
  return (
    <section className="contact-screen wrap">
      <div className="contact-panel">
        <img src="/img/mic-crowd.jpg" alt="" />
        <div className="contact-panel-inner">
          <div>
            <span className="eyebrow"><i />We reply within a working day</span>
            <h1>Let’s <em>talk.</em></h1>
          </div>
          <div className="contact-lines">
            {LINES.map(([href, Icon, k, v]) => {
              const inner = (
                <>
                  <span className="ico"><Icon /></span>
                  <span><small>{k}</small><b>{v}</b></span>
                  {href ? <ArrowUpRight className="arr" /> : <span />}
                </>
              )
              return href
                ? <a key={k} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
                : <div key={k}>{inner}</div>
            })}
          </div>
        </div>
      </div>
      <EnquiryForm title="Send us a message" />
    </section>
  )
}
