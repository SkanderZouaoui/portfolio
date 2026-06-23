import { useEffect, useRef, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './Scene'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ isLoaded }) {
  const { lang } = useLang()
  const txt = t[lang].hero
  const sectionRef = useRef()
  const titleRef   = useRef()
  const subRef     = useRef()
  const tagsRef    = useRef()
  const statsRef   = useRef()
  const scrollRef  = useRef()
  const lineRef    = useRef()

  // ── Run entrance ONLY after loader is done ──
  useEffect(() => {
    if (!isLoaded) return

    const chars = titleRef.current?.querySelectorAll(`.${styles.char}`)
    if (!chars?.length) return

    // Force initial state before animating
    gsap.set(chars,                          { y: '110%', opacity: 0 })
    gsap.set(subRef.current,                 { y: 30, opacity: 0 })
    gsap.set(tagsRef.current,                { y: 20, opacity: 0 })
    gsap.set(statsRef.current?.children ?? [], { y: 24, opacity: 0 })
    gsap.set(lineRef.current,                { scaleX: 0 })
    gsap.set(scrollRef.current,              { opacity: 0, y: 10 })

    gsap.to(chars,         { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out', delay: 0.1 })
    gsap.to(lineRef.current,   { scaleX: 1, transformOrigin: 'left', duration: 1.4, ease: 'power4.out', delay: 0.3 })
    gsap.to(subRef.current,    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.7 })
    gsap.to(tagsRef.current,   { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 })
    gsap.to(statsRef.current?.children ?? [], { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.9 })
    gsap.to(scrollRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.2 })
  }, [isLoaded, lang])

  // Parallax on scroll
  useEffect(() => {
    if (!isLoaded) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
    })
    tl.to(titleRef.current, { y: -80, ease: 'none' }, 0)
    tl.to(tagsRef.current,  { y: -100, ease: 'none' }, 0)
    tl.to(subRef.current,   { y: -40, ease: 'none' }, 0)
    return () => tl.kill()
  }, [isLoaded])

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.sceneWrapper}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <div className={styles.gridOverlay} aria-hidden />

      <div className={styles.content}>
        <div className={styles.topRow} ref={tagsRef} style={{ opacity: 0 }}>
          <span className={`tag accent ${styles.heroTag}`}>{txt.label}</span>
          <span className={`${styles.scroll} mono`} ref={scrollRef}>{txt.scroll}</span>
        </div>

        <h1 className={`${styles.title} display`} ref={titleRef} key={lang}>
          {txt.title.map((line, li) => (
            <span key={li} className={styles.line}>
              {line.split('').map((char, ci) => (
                <span key={ci} className={styles.char} style={{ opacity: 0 }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div ref={lineRef} className={styles.divider} style={{ transform: 'scaleX(0)' }} />

        <div className={styles.bottomRow}>
          <p className={styles.sub} ref={subRef} style={{ opacity: 0 }}>
            {txt.sub}<br />
            <span style={{ color: 'var(--muted)' }}>{txt.sub2}</span>
          </p>
          <div className={styles.stats} ref={statsRef}>
            {txt.stats.map(s => (
              <div key={s.label} className={styles.stat} style={{ opacity: 0 }}>
                <span className={`${styles.statNum} display`}>{s.num}</span>
                <span className="mono" style={{ color: 'var(--muted)', fontSize: '10px' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className="mono" style={{ color: 'var(--muted)' }}>© 2026</span>
        <div className={styles.marque} aria-hidden>
          {Array(10).fill(
            lang === 'en' ? 'Available for new projects · ' : 'Disponible pour nouvelles missions · '
          ).map((tx, i) => <span key={i}>{tx}</span>)}
        </div>
      </div>
    </section>
  )
}
