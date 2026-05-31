import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import ProjectModal from './ProjectModal'
import { useTheme } from '../context/ThemeContext'
import { getProjectColor } from '../utils/colors'
import styles from './Projects.module.css'

function ProjectCard({ project, index, onClick, theme }) {
  const cardRef = useRef()
  const innerRef = useRef()
  const glowRef = useRef()
  const color = getProjectColor(project.color, theme)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(innerRef.current, {
      rotateY: x * 7, rotateX: y * -7,
      duration: 0.5, ease: 'power2.out', transformPerspective: 800,
    })
    gsap.to(glowRef.current, {
      x: (x + 0.5) * 100 + '%', y: (y + 0.5) * 100 + '%',
      duration: 0.4, ease: 'power2.out', opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    gsap.to(innerRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.015, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      data-reveal="up"
      data-reveal-delay={0.06 * (index % 4)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ transformStyle: 'preserve-3d', cursor: 'none' }}
      data-cursor="Open"
    >
      <div ref={innerRef} className={styles.cardInner} style={{ transformStyle: 'preserve-3d' }}>
        <div ref={glowRef} className={styles.glow} style={{ background: color }} />

        <div className={styles.cardTop}>
          <span className={`${styles.num} mono`}>{project.id}</span>
          <span className={`${styles.year} mono`}>{project.year}</span>
        </div>

        <div className={styles.accent} style={{ background: color }} />

        <h3 className={`${styles.cardTitle} display`}>{project.title}</h3>
        <p className={`${styles.category} mono`}>{project.category}</p>
        <p className={styles.desc}>{project.description}</p>

        <div className={styles.cardBottom}>
          <div className={styles.stack}>
            {project.stack.slice(0, 3).map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
            {project.stack.length > 3 && (
              <span className="tag">+{project.stack.length - 3}</span>
            )}
          </div>
          <button className={styles.arrow}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const txt = t[lang].projects
  const sectionRef = useRef()
  const { theme } = useTheme()
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalKey, setModalKey] = useState(0)
  useReveal(sectionRef)

  const openModal = (project) => {
    setSelectedProject(project)
    setModalKey(k => k + 1)
  }

  const closeModal = () => setSelectedProject(null)

  return (
    <>
      <section className={styles.section} id="projects" ref={sectionRef}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="tag" data-reveal="left">{txt.tag}</span>
            <h2 className={`${styles.sectionTitle} display`} data-reveal="up">{txt.title}</h2>
          </div>
          <p className={styles.headerDesc} data-reveal="right">
            {txt.desc}<br />
            <span style={{ color: 'var(--muted)' }}>{txt.desc2}</span>
          </p>
        </div>

        <div className={styles.grid}>
          {txt.items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={openModal} theme={theme} />
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          key={modalKey}
          project={selectedProject}
          onClose={closeModal}
          lang={lang}
        />
      )}
    </>
  )
}
