import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/motion'
import About from './components/About'
import Contact from './components/Contact'
import Credentials from './components/Credentials'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Principles from './components/Principles'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Stats from './components/Stats'

export default function App() {
  const [heroReady, setHeroReady] = useState(false)
  const [started, setStarted] = useState(false)

  const onVideoReady = useCallback(() => setHeroReady(true), [])
  const onStart = useCallback(() => setStarted(true), [])

  useEffect(() => {
    document.documentElement.style.overflow = started ? '' : 'hidden'
    if (started) ScrollTrigger.refresh()
  }, [started])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Preloader heroReady={heroReady} onStart={onStart} />
      <Nav visible={started} />
      <main>
        <Hero ready={started} onVideoReady={onVideoReady} />
        <Marquee />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Principles />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
