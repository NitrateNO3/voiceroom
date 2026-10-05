import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'

export default function NotFound() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <PageHead title="Page not found" lede="This page doesn’t exist or has moved.">
        <Link to="/" className="btn" style={{ marginTop: 28 }}>Go to the home page</Link>
      </PageHead>
    </div>
  )
}
