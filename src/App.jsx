import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import useSmoothScroll from './hooks/useSmoothScroll'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

function Portfolio() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()

  const handleLoaderComplete = () => {
    setLoaded(true)
    // Slight delay then refresh ScrollTrigger after content shows
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [loaded])

  return (
    <>
      <div className="noise" />
      <Cursor />
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}>
        <Nav />
        <main>
          <Hero isLoaded={loaded} />
          <Projects />
          <Stack />
          <About />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Portfolio />
      </LangProvider>
    </ThemeProvider>
  )
}
