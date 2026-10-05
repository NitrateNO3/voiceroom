import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import PageHead from '../components/PageHead'
import EnquiryForm from '../components/EnquiryForm'
import { useSEO } from '../lib/seo'

const LINES = [
  ['tel:+919876543210', Phone, 'Call', '+91 98765 43210'],
  ['https://wa.me/919876543210', MessageCircle, 'WhatsApp', 'Message us — we reply in minutes'],
  ['mailto:hello@miyagi.in', Mail, 'Email', 'hello@miyagi.in'],
  [null, MapPin, 'Studio', '2nd floor, 14 Galleria Market, DLF Phase IV, Gurugram 122009'],
  [null, Clock, 'Hours', 'Mon – Sat · 10 am – 7 pm'],
]

export default function Contact() {
  useSEO('Contact', 'Call, email or visit Miyagi in New Delhi and Gurugram.')
  return (
    <>
      <PageHead
        label="Contact"
        title={<>Say <em>hello.</em></>}
        lede="Questions about a program, a school partnership, or just not sure where to begin? We’re real people and we reply fast."
        img="/img/mic-crowd.jpg"
      />
      <section className="wrap contact-grid" style={{ paddingBottom: 'clamp(64px, 10vw, 128px)' }}>
        <div>
          <span className="label label-dot">Reach us directly</span>
          <div className="contact-lines">
            {LINES.map(([href, Icon, k, v]) => {
              const inner = (
                <>
                  <span className="ico"><Icon /></span>
                  <span><small>{k}</small><b style={href ? null : { fontWeight: 500 }}>{v}</b></span>
                  {href ? <ArrowUpRight className="arr" /> : <span />}
                </>
              )
              return href ? <a key={k} href={href}>{inner}</a> : <div key={k}>{inner}</div>
            })}
          </div>
        </div>
        <EnquiryForm title="Send us a message" />
      </section>
    </>
  )
}
