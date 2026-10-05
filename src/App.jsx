import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import PhoneCapture from './components/PhoneCapture'
import { pageview } from './lib/analytics'

import Home from './pages/Home'
import About from './pages/About'
import Learn from './pages/Learn'
import Podcast from './pages/Podcast'
import Article from './pages/Article'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function SiteLayout() {
  return (
    <>
      <Nav />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

function RouteEffects() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    pageview(pathname + search)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:slug" element={<Article />} />
          <Route path="podcast" element={<Podcast />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <PhoneCapture />
    </>
  )
}
