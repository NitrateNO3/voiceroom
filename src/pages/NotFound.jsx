import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHead from '../components/PageHead'

export default function NotFound() {
  return (
    <div>
      <PageHead label="404" title={<>Lost for <em>words?</em></>} lede="That page doesn’t exist — but the rest of the site does." img="/img/hands-spotlight.jpg">
        <Link to="/" className="btn btn-ember btn-lg" style={{ marginTop: 32 }}>Back home <ArrowRight /></Link>
      </PageHead>
    </div>
  )
}
