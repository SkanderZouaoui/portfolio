import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import styles from './Nav.module.css'

export default function Nav({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang } = useLang()
  const txt = t[lang].nav

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    updateTime()
    const id = setInterval(updateTime, 1000)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => { clearInterval(id); window.removeEventListener('scroll', onScroll) }
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.left}>
          <span className={`${styles.logo} display`}>SZ</span>
          <span className={`${styles.status} mono`}>
            <span className={styles.dot} />
            {txt.available}
          </span>
        </div>

        {/* Desktop links */}
        <div className={styles.links}>
          {txt.links.map((item, i) => (
            <a key={item} href={`#${['projects','stack','about','contact'][i]}`} className={styles.link}>
              {item}
            </a>
          ))}
        </div>

        <div className={styles.right}>
          <span className={`${styles.time} mono`}>{time}</span>

          {/* Lang toggle */}
          <button className={styles.toggle} onClick={toggleLang} aria-label="Toggle language">
            <span className={lang === 'en' ? styles.toggleActive : ''}>EN</span>
            <span className={styles.toggleSep}>/</span>
            <span className={lang === 'fr' ? styles.toggleActive : ''}>FR</span>
          </button>

          {/* Theme toggle */}
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <a href="mailto:zouaoui.mohamedskander@gmail.com" className={styles.cta}>
            {txt.hire}
          </a>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {txt.links.map((item, i) => (
            <a key={item} href={`#${['projects','stack','about','contact'][i]}`}
              className={`${styles.mobileLink} display`}
              onClick={closeMenu}>
              <span className={styles.mobileLinkNum}>0{i+1}</span>
              {item}
            </a>
          ))}
        </div>
        <div className={styles.mobileBottom}>
          <button className={styles.toggle} onClick={toggleLang}>
            <span className={lang === 'en' ? styles.toggleActive : ''}>EN</span>
            <span className={styles.toggleSep}>/</span>
            <span className={lang === 'fr' ? styles.toggleActive : ''}>FR</span>
          </button>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'dark' ? '☀︎ Light' : '☽ Dark'}
          </button>
        </div>
      </div>
    </>
  )
}
