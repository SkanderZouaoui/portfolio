import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../context/LangContext'
import { useTheme } from '../context/ThemeContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import { getCatColor } from '../utils/colors'
import styles from './Stack.module.css'

const ICONS = {
  'React.js / Next.js': '⚛',
  'Angular': '🅰',
  'Three.js / WebGL': '⬡',
  'Node.js / Express.js': '⬡',
  'Spring Boot': '🍃',
  'Symfony / PHP': '🐘',
  'MongoDB / MySQL': '🗄',
  'Selenium / Test Automation': '🔬',
  'Selenium / Automatisation': '🔬',
  'Azure DevOps': '☁',
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
        <span className={styles.skillIcon}>{ICONS[skill.name] || '◈'}</span>
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
          <h2 className={`${styles.title} display`} data-reveal="up">{txt.title}</h2>
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
