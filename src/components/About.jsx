import { useRef } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../i18n/translations'
import useReveal from '../hooks/useReveal'
import styles from './About.module.css'
import profilImg from '../assets/IMG_3346.jpeg'


export default function About() {
  const { lang } = useLang()
  const txt = t[lang].about
  const sectionRef = useRef()
  useReveal(sectionRef)

  return (
    <section className={styles.section} id="about" ref={sectionRef}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <span className="tag" data-reveal="left">
            {txt.tag}
          </span>
          <h2 className={`${styles.title} display`} data-reveal="clip">
            SKANDER
            <br />
            <span className={styles.italic}>ZOUAOUI</span>
          </h2>
          <div
            className={styles.imgWrapper}
            data-reveal="scale"
            data-reveal-delay="0.2"
          >
            <div className={styles.imgPlaceholder}>
              <img src={profilImg} alt="Skander Zouaoui" className={styles.image} />
            </div>
            {/*<span className={`${styles.imgLabel} mono`}>Photo</span>*/}
            <div className={styles.imgBorder} />
            {/* Decorative corner marks */}
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.bio} data-stagger="0.1">
            <p>{txt.bio[0]}</p>
            <p>
              {txt.bio[1].split(txt.highlight)[0]}
              <span className={styles.highlight}>{txt.highlight}</span>
              {txt.bio[1].split(txt.highlight)[1]}
            </p>
            <p>{txt.bio[2]}</p>
          </div>

          <div className={styles.facts} data-stagger="0.05">
            {txt.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <span className={`${styles.factLabel} mono`}>{f.label}</span>
                <span className={styles.factValue}>{f.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.social} data-stagger="0.08">
            {txt.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`${styles.socialLink} mono`}
                data-cursor={s.label}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
