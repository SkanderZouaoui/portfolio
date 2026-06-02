import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { playTick } from '../utils/audio'

export default function useMagnetic() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const rect = el.getBoundingClientRect()
      const x = clientX - (rect.left + rect.width / 2)
      const y = clientY - (rect.top + rect.height / 2)

      // Pull elements gently towards cursor (35% magnetic force)
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      // Snappy elastic spring-back to original center
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    const handleMouseEnter = () => {
      playTick()
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return ref
}
