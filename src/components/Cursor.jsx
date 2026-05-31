import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const labelRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const [label, setLabel] = useState('')
  const [state, setState] = useState('default') // default | hover | drag | hidden

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const onEnterLink = (e) => {
      const el = e.currentTarget
      setState('hover')
      const dataLabel = el.dataset.cursor
      if (dataLabel) setLabel(dataLabel)
    }
    const onLeaveLink = () => { setState('default'); setLabel('') }
    const onEnterDrag = () => setState('drag')
    const onLeaveDrag = () => setState('default')
    const onDown = () => setState('click')
    const onUp = () => setState('default')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    // Lag follower
    let raf
    const follow = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(follow)
    }
    follow()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${styles[state]}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${styles[`ring_${state}`]}`}
      >
        {label && <span ref={labelRef} className={styles.label}>{label}</span>}
      </div>
    </>
  )
}
