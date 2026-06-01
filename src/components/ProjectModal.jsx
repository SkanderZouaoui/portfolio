import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { pauseSmoothScroll, resumeSmoothScroll } from '../hooks/useSmoothScroll'
import { useTheme } from '../context/ThemeContext'
import { getProjectColor } from '../utils/colors'
import styles from './ProjectModal.module.css'

export default function ProjectModal({ project, onClose, lang }) {
  const { theme } = useTheme()
  const overlayRef = useRef()
  const panelRef   = useRef()
  const contentRef = useRef()
  const bodyRef    = useRef()

  // ── On mount: kill Lenis, lock page scroll, block all wheel on bg ──
  useEffect(() => {
    if (!project) return

    // 1. Destroy Lenis entirely so its wheel listeners are gone
    pauseSmoothScroll()

    // 2. Lock body scroll
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflowY = 'scroll' // keep scrollbar width to avoid layout shift

    // 3. Block wheel/touch on the overlay (background) completely
    const blockScroll = (e) => {
      // Allow scrolling only when target is inside the panel body
      if (bodyRef.current?.contains(e.target)) return
      e.preventDefault()
      e.stopPropagation()
    }
    window.addEventListener('wheel',     blockScroll, { passive: false })
    window.addEventListener('touchmove', blockScroll, { passive: false })

    // ── Entrance animation ──
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    tl.fromTo(panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power4.out' },
      '-=0.1'
    )
    tl.fromTo(contentRef.current?.children ?? [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: 'power3.out' },
      '-=0.25'
    )

    return () => {
      // Restore body scroll position
      const scrollTop = parseInt(document.body.style.top || '0') * -1
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
      window.scrollTo(0, scrollTop)

      // Restart Lenis
      resumeSmoothScroll()

      window.removeEventListener('wheel',     blockScroll)
      window.removeEventListener('touchmove', blockScroll)
    }
  }, [project])

  // ── Escape key ──
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') triggerClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const triggerClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current,   { x: '100%', duration: 0.4, ease: 'power4.in' })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.2')
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) triggerClose()
  }

  if (!project) return null

  const color = getProjectColor(project.color, theme)

  const labels = {
    en: {
      overview: 'Overview', challenges: 'Challenges', results: 'Key Results',
      role: 'My Role', stack: 'Stack', close: 'Close',
      viewCode: 'View Code', liveDemo: 'Live Demo',
    },
    fr: {
      overview: "Vue d'ensemble", challenges: 'Défis techniques', results: 'Résultats clés',
      role: 'Mon rôle', stack: 'Stack', close: 'Fermer',
      viewCode: 'Voir le code', liveDemo: 'Démo live',
    },
  }
  const l = labels[lang] || labels.en

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.panel} ref={panelRef}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={`${styles.headerNum} mono`}>{project.id}</span>
            <span className={`${styles.headerYear} mono`}>{project.year}</span>
            <span className={styles.categoryTag}>{project.category}</span>
          </div>
          <button className={styles.closeBtn} onClick={triggerClose} aria-label={l.close}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Scrollable panel body ── */}
        <div className={styles.body} ref={bodyRef}>
          <div ref={contentRef} className={styles.bodyInner}>

            <div className={styles.titleBlock}>
              <div className={styles.accentLine} style={{ background: color }} />
              <h2 className={`${styles.title} display`}>{project.title}</h2>
            </div>

            {/* ── Image Block ── */}
            {project.image ? (
              <div className={styles.imageContainer}>
                <img src={project.image} alt={project.title} className={styles.image} />
                <div className={styles.imageOverlay} style={{ background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))` }} />
              </div>
            ) : (
              <div className={styles.imagePlaceholder} style={{ '--project-color': color }}>
                <div className={styles.placeholderGrid} />
                <div className={styles.placeholderGlow} style={{ background: `radial-gradient(circle at 50% 50%, ${color}33, transparent 70%)` }} />
                <div className={styles.placeholderContent}>
                  <span className={`${styles.placeholderTag} mono`} style={{ color: color }}>{project.category}</span>
                  <h3 className={`${styles.placeholderTitle} display`}>{project.title}</h3>
                </div>
              </div>
            )}

            {project.details?.overview && (
              <div className={styles.block}>
                <h4 className={`${styles.blockLabel} mono`}>{l.overview}</h4>
                <p className={styles.blockText}>{project.details.overview}</p>
              </div>
            )}

            {project.details?.challenges && (
              <div className={styles.block}>
                <h4 className={`${styles.blockLabel} mono`}>{l.challenges}</h4>
                <p className={styles.blockText}>{project.details.challenges}</p>
              </div>
            )}

            {project.details?.results?.length > 0 && (
              <div className={styles.block}>
                <h4 className={`${styles.blockLabel} mono`}>{l.results}</h4>
                <ul className={styles.resultsList}>
                  {project.details.results.map((r, i) => (
                    <li key={i} className={styles.resultItem}>
                      <span className={styles.resultDot} style={{ background: color }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.details?.role && (
              <div className={styles.roleBlock}>
                <span className={`${styles.blockLabel} mono`}>{l.role}</span>
                <span className={styles.roleValue}>{project.details.role}</span>
              </div>
            )}

            <div className={styles.block}>
              <h4 className={`${styles.blockLabel} mono`}>{l.stack}</h4>
              <div className={styles.stackList}>
                {project.stack.map(s => (
                  <span key={s} className={styles.stackTag} style={{ '--tag-color': color }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.ctas}>
              <a href="#" className={styles.ctaPrimary} style={{ background: color }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {l.liveDemo}
              </a>
              <a href="#" className={styles.ctaGhost}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C3.686 1 1 3.686 1 7c0 2.652 1.72 4.9 4.104 5.696.3.055.41-.13.41-.29v-1.016c-1.67.363-2.021-.805-2.021-.805-.273-.693-.667-.878-.667-.878-.545-.373.041-.365.041-.365.602.042.92.618.92.618.535.918 1.403.652 1.745.499.054-.388.21-.652.38-.801-1.332-.152-2.732-.666-2.732-2.963 0-.655.234-1.19.617-1.61-.062-.152-.267-.762.059-1.589 0 0 .503-.16 1.648.615A5.74 5.74 0 017 4.58c.51.002 1.022.069 1.502.202 1.144-.776 1.646-.615 1.646-.615.327.827.121 1.437.06 1.589.384.42.616.955.616 1.61 0 2.305-1.403 2.81-2.739 2.958.215.186.407.551.407 1.111v1.647c0 .161.109.348.413.29C11.282 11.898 13 9.65 13 7c0-3.314-2.686-6-6-6z" fill="currentColor"/>
                </svg>
                {l.viewCode}
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
