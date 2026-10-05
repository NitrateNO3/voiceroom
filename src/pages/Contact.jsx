import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import { useSEO } from '../lib/seo'

const LINES = [
  ['tel:+919876543210', Phone, 'Phone', '+91 98765 43210'],
  ['https://wa.me/919876543210', MessageCircle, 'WhatsApp', '+91 98765 43210'],
  ['mailto:hello@voiceroom.in', Mail, 'Email', 'hello@voiceroom.in'],
  [null, MapPin, 'Address', '2nd floor, 14 Galleria Market, DLF Phase IV, Gurugram'],
  [null, Clock, 'Hours', 'Monday to Saturday, 10 am to 7 pm'],
]

// Single-screen contact page: everything fits in the viewport on desktop.
export default function Contact() {
  useSEO('Contact', 'Call, WhatsApp, email or visit Voiceroom in Gurugram. We reply within a working day.')
  return (
    <section className="contact-screen wrap">
      <div className="contact-info">
        <h1>Contact us</h1>
        <p className="lede">Call or WhatsApp during office hours, or send a message and we’ll reply within a working day.</p>
        <div className="contact-lines">
          {LINES.map(([href, Icon, k, v]) => {
            const inner = <><Icon /><small>{k}</small><b>{v}</b></>
            return href
              ? <a key={k} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
              : <div key={k}>{inner}</div>
          })}
        </div>
      </div>
      <EnquiryForm title="Send a message" />
    </section>
  )
}
