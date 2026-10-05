import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import PhoneCapture from './components/PhoneCapture'
import Toaster from './components/Toast'
import { pageview } from './lib/analytics'

import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Corporate from './pages/Corporate'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Learn from './pages/Learn'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
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
          <Route path="team" element={<Team />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:slug" element={<ProgramDetail />} />
          <Route path="corporate" element={<Corporate />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:slug" element={<Article />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="admin/*" element={<Admin />} />
      </Routes>
      <PhoneCapture />
      <Toaster />
    </>
  )
}
