import { useRef } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'

export default function Contact() {
  const { lang } = useLang()
  const txt = t[lang].contact
  const sectionRef = useRef()
  useReveal(sectionRef)

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.inner}>

        {/* ── Left column : big title + info ── */}
        <div className={styles.left}>
          <span className="tag" data-reveal="left">{txt.tag}</span>

          <h2 className={`${styles.title} display`} data-reveal="text">
            {txt.title[0]}<br />
            <span className={styles.outline}>{txt.title[1]}</span>
          </h2>

          <p className={styles.sub} data-reveal="up" data-reveal-delay="0.1">{txt.sub}</p>

          <div className={styles.contactInfo} data-reveal="up" data-reveal-delay="0.2">
            <a
              href="mailto:zouaoui.mohamedskander@gmail.com"
              className={styles.emailLink}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              zouaoui.mohamedskander@gmail.com
            </a>
            <a
              href="tel:+21655203244"
              className={styles.emailLink}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2.5C2 2 2.5 1.5 3 1.5h1.5l1 2.5L4 5c.8 1.6 2 2.8 3.5 3.5l1-1.5 2.5 1V9.5c0 .5-.5 1-1 1C5 10.5 2 6 2 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              +216 55 203 244
            </a>
          </div>
          {/* ── Bouton CV ── */}
          <a
            href="/CV_Skander_Zouaoui.pdf"
            download="CV_Skander_Zouaoui.pdf"
            className={styles.cvBtn}
            data-reveal="up"
            data-reveal-delay="0.25"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === 'en' ? 'Download CV' : 'Télécharger CV'}
          </a>

          <div className={styles.availability} data-reveal="up" data-reveal-delay="0.3">
            <span className={styles.availDot} />
            <span className="mono" style={{ fontSize: '11px', color: 'var(--muted)' }}>
              {lang === 'en' ? 'Available for new projects' : 'Disponible pour nouveaux projets'}
            </span>
          </div>
        </div>

        {/* ── Right column : form ── */}
        <div className={styles.right} data-reveal="fade" data-reveal-delay="0.2">
          <ContactForm />
        </div>

      </div>

      <footer className={styles.footer}>
        <span className="mono" style={{ color: 'var(--muted)' }}>© 2026 Skander Zouaoui</span>
        <span className="mono" style={{ color: 'var(--muted)' }}>{txt.built}</span>
        <div className={styles.footerLinks}>
          <a href="https://linkedin.com/in/skander-zouaouii" target="_blank" rel="noopener" className={`${styles.footerLink} mono`}>LinkedIn</a>
          <a href="https://github.com/SkanderZouaoui" className={`${styles.footerLink} mono`}>GitHub</a>
        </div>
      </footer>
    </section>
  )
}
