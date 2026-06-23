import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import { getCatColor } from '../utils/colors'
import styles from './Stack.module.css'

const ICONS = {
  'React.js / Next.js': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  'Angular': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 6l3 13 7 3 7-3 3-13L12 2z" />
      <path d="M12 6L7.5 15.5h9L12 6z" />
      <path d="M9 13h6" />
    </svg>
  ),
  'Three.js / WebGL': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  'Node.js / Express.js': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
      <path d="M12 22V12" />
      <path d="M12 12l9-5" />
      <path d="M12 12L3 7" />
    </svg>
  ),
  'Spring Boot': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c1.25-3.25 3.5-7.5 7.5-9.5 3.5-1.75 6.75-2.25 10.5-2.5.25 3.75-.25 7-2 10.5-2 4-6.25 6.25-9.5 7.5-.75-3.5-2-6.5-6.5-6.5z" transform="rotate(-45 12 12)" />
      <path d="M2 22l11-11" />
    </svg>
  ),
  'Symfony / PHP': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M12 18v-4" />
    </svg>
  ),
  'MongoDB / MySQL': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  'Selenium / Test Automation': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M9 3v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 9V3" />
      <path d="M6 18h12" />
    </svg>
  ),
  'Selenium / Automatisation': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M9 3v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 9V3" />
      <path d="M6 18h12" />
    </svg>
  ),
  'Azure DevOps': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
    </svg>
  ),
}

const LEVEL_LABEL = {
  en: { 90:'Expert', 88:'Expert', 85:'Advanced', 84:'Advanced', 82:'Advanced', 80:'Advanced', 78:'Proficient', 72:'Proficient' },
  fr: { 90:'Expert',  88:'Expert',  85:'Avancé',   84:'Avancé',   82:'Avancé',   80:'Avancé',   78:'Maîtrisé',  72:'Maîtrisé'  },
}

function SkillCard({ skill, index, lang, theme }) {
  const cardRef  = useRef()
  const arcRef   = useRef()
  const numRef   = useRef()
  const [active, setActive] = useState(false)
  const color = getCatColor(skill.cat, theme)

  const handleEnter = () => {
    setActive(true)
    gsap.to(cardRef.current, { y: -8, scale: 1.04, duration: 0.4, ease: 'power2.out' })
    const circle = arcRef.current?.querySelector('circle:last-child')
    if (circle) {
      const len = 2 * Math.PI * 28
      gsap.fromTo(circle,
        { strokeDashoffset: len },
        { strokeDashoffset: len - (skill.level / 100) * len, duration: 0.8, ease: 'power3.out' }
      )
    }
    const obj = { val: 0 }
    gsap.to(obj, {
      val: skill.level, duration: 0.8, ease: 'power3.out',
      onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(obj.val) },
    })
  }

  const handleLeave = () => {
    setActive(false)
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
    const circle = arcRef.current?.querySelector('circle:last-child')
    if (circle) {
      const len = 2 * Math.PI * 28
      gsap.to(circle, { strokeDashoffset: len, duration: 0.4, ease: 'power2.in' })
    }
    if (numRef.current) numRef.current.textContent = skill.level
  }

  const levelText    = LEVEL_LABEL[lang]?.[skill.level] || ''
  const circumference = 2 * Math.PI * 28

  return (
    <div
      ref={cardRef}
      className={`${styles.skillCard} ${active ? styles.skillCardActive : ''}`}
      data-reveal="up"
      data-reveal-delay={0.05 * index}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.catDot} style={{ background: color }} />

      <div className={styles.arcWrapper} ref={arcRef}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle
            cx="36" cy="36" r="28" fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
          />
        </svg>
        <div className={styles.arcCenter}>
          <span className={`${styles.arcNum} display`} ref={numRef}>{skill.level}</span>
        </div>
      </div>

      <div className={styles.skillInfo}>
        <span
          className={styles.skillIcon}
          style={{
            color: active ? color : 'var(--muted)',
            transition: 'color 0.3s ease, transform 0.3s ease',
            transform: active ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {ICONS[skill.name] || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          )}
        </span>
        <h4 className={styles.skillName}>{skill.name}</h4>
        <span className={`${styles.levelText} mono`}>{levelText}</span>
      </div>

      <div className={styles.cardGlow} style={{ background: color }} />
    </div>
  )
}

export default function Stack() {
  const { lang }       = useLang()
  const { theme }      = useTheme()
  const txt            = t[lang].stack
  const [activeCat, setActiveCat] = useState(0)
  const sectionRef     = useRef()
  useReveal(sectionRef)

  const filtered = activeCat === 0
    ? txt.skills
    : txt.skills.filter(s => s.cat === ['All','Frontend','Backend','QA'][activeCat])

  return (
    <section className={styles.section} id="stack" ref={sectionRef}>
      <div className={styles.header}>
        <div>
          <span className="tag" data-reveal="left">{txt.tag}</span>
          <h2 className={`${styles.title} display`} data-reveal="text">{txt.title}</h2>
        </div>
        <div className={styles.filters} data-stagger="0.06">
          {txt.categories.map((cat, i) => (
            <button
              key={cat}
              className={`${styles.filter} ${activeCat === i ? styles.filterActive : ''} mono`}
              onClick={() => setActiveCat(i)}
            >
              <span className={styles.filterDot} style={{
                background: i === 1 ? getCatColor('Frontend', theme)
                          : i === 2 ? getCatColor('Backend',  theme)
                          : i === 3 ? getCatColor('QA',       theme)
                          : 'var(--muted)',
              }}/>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={i}
            lang={lang}
            theme={theme}
          />
        ))}
      </div>

      <div className={styles.tools} data-reveal="up" data-reveal-delay="0.2">
        <span className={`${styles.toolsLabel} mono`}>{txt.also}</span>
        <div className={styles.toolsList} data-stagger="0.04">
          {txt.tools.map(tool => <span key={tool} className="tag">{tool}</span>)}
        </div>
      </div>
    </section>
  )
}
