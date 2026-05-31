import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const loaderRef = useRef()
  const barRef = useRef()
  const numRef = useRef()
  const overlayRef = useRef()

  useEffect(() => {
    // Count up 0 → 100
    let start = null
    const duration = 2000
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 100))
      if (progress < 1) requestAnimationFrame(step)
      else {
        // Exit animation
        const tl = gsap.timeline({ onComplete })
        tl.to(barRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' })
          .to(loaderRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.9,
            ease: 'power4.inOut',
          }, '+=0.15')
      }
    }
    requestAnimationFrame(step)
  }, [onComplete])

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.inner}>
        <span className={`${styles.name} display`}>SKANDER ZOUAOUI</span>
        <div className={styles.barTrack}>
          <div className={styles.barFill} ref={barRef} style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <div className={styles.bottom}>
          <span className={`${styles.label} mono`}>Loading</span>
          <span className={`${styles.count} display`} ref={numRef}>{String(count).padStart(3, '0')}</span>
        </div>
      </div>
      <div className={styles.grid}>
        {Array(12).fill(null).map((_, i) => <div key={i} className={styles.cell} />)}
      </div>
    </div>
  )
}
