import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitTextIntoWords(element) {
  if (element.querySelector('.reveal-word-wrapper')) return
  const text = element.innerText.trim()
  element.innerHTML = ''
  
  text.split(/\s+/).forEach(word => {
    const wrapper = document.createElement('span')
    wrapper.className = 'reveal-word-wrapper'
    wrapper.style.display = 'inline-block'
    wrapper.style.overflow = 'hidden'
    wrapper.style.verticalAlign = 'bottom'
    
    const inner = document.createElement('span')
    inner.className = 'reveal-word'
    inner.style.display = 'inline-block'
    inner.innerText = word + '\u00A0'
    
    wrapper.appendChild(inner)
    element.appendChild(wrapper)
  })
}

/**
 * useReveal — animates children with data-reveal attributes on scroll
 * Supported: data-reveal="up|left|right|scale|rotate|clip|text"
 * data-reveal-delay="0.2"  (seconds)
 * data-reveal-stagger="0.08"
 */
export default function useReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Cinematic masked word reveal
      const textEls = containerRef.current.querySelectorAll('[data-reveal="text"]')
      textEls.forEach(el => {
        splitTextIntoWords(el)
        const words = el.querySelectorAll('.reveal-word')
        const delay = parseFloat(el.dataset.revealDelay || 0)
        const duration = parseFloat(el.dataset.revealDuration || 1.1)

        gsap.from(words, {
          y: '110%',
          rotation: 3,
          transformOrigin: 'left top',
          duration,
          delay,
          stagger: 0.04,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Generic reveal elements
      const els = containerRef.current.querySelectorAll('[data-reveal]')
      els.forEach(el => {
        const type = el.dataset.reveal || 'up'
        if (type === 'text') return // Handled separately above
        const delay = parseFloat(el.dataset.revealDelay || 0)
        const duration = parseFloat(el.dataset.revealDuration || 0.9)

        const from = {
          up:     { y: 60, opacity: 0 },
          left:   { x: -60, opacity: 0 },
          right:  { x: 60, opacity: 0 },
          scale:  { scale: 0.85, opacity: 0 },
          rotate: { rotation: 8, y: 40, opacity: 0 },
          clip:   { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
          fade:   { opacity: 0 },
        }[type] || { y: 60, opacity: 0 }

        gsap.from(el, {
          ...from,
          duration,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Staggered groups
      const staggerGroups = containerRef.current.querySelectorAll('[data-stagger]')
      staggerGroups.forEach(group => {
        const children = group.children
        const stagger = parseFloat(group.dataset.stagger || 0.08)
        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Horizontal scroll line (for section titles)
      const lines = containerRef.current.querySelectorAll('[data-line]')
      lines.forEach(line => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
          },
        })
      })

      // Parallax elements
      const parallax = containerRef.current.querySelectorAll('[data-parallax]')
      parallax.forEach(el => {
        const speed = parseFloat(el.dataset.parallax || 0.3)
        gsap.to(el, {
          y: () => el.offsetHeight * speed * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])
}
