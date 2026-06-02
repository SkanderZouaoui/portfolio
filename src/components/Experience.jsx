import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import styles from './Experience.module.css'

export default function Experience() {
  const { lang } = useLang()
  const txt = t[lang].experience
  const sectionRef = useRef()
  const progressLineRef = useRef()

  useReveal(sectionRef)

  useEffect(() => {
    if (!sectionRef.current || !progressLineRef.current) return

    // Scroll-linked glowing line animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: true,
      }
    })

    tl.fromTo(progressLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, ease: 'none' }
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className={styles.section} id="experience" ref={sectionRef}>
      <div className={styles.header}>
        <span className="tag" data-reveal="left">{txt.tag}</span>
        <h2 className={`${styles.sectionTitle} display`} data-reveal="text">{txt.title}</h2>
      </div>

      <div className={styles.timelineContainer}>
        {/* Dotted background line */}
        <div className={styles.timelineLine}>
          {/* Active growing line */}
          <div ref={progressLineRef} className={styles.timelineProgress} />
        </div>

        <div className={styles.events}>
          {txt.items.map((item, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div
                key={idx}
                className={`${styles.eventRow} ${isLeft ? styles.leftRow : styles.rightRow}`}
              >
                {/* Node bubble */}
                <div
                  className={styles.timelineNode}
                  data-reveal="scale"
                  data-reveal-delay={0.05}
                />

                {/* Card container */}
                <div
                  className={styles.eventCard}
                  data-reveal={isLeft ? 'left' : 'right'}
                  data-reveal-delay={0.1}
                >
                  <span className={`${styles.year} mono`}>{item.year}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <h4 className={`${styles.company} mono`}>{item.company}</h4>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
