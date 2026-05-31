import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

let lenisInstance = null
let rafId = null

function createLenis() {
  if (lenisInstance) return
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })
  function raf(time) {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

function destroyLenis() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null }
  if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null }
}

// Called when modal opens — fully removes Lenis wheel listeners
export function pauseSmoothScroll() {
  destroyLenis()
}

// Called when modal closes — recreates Lenis
export function resumeSmoothScroll() {
  destroyLenis() // safety cleanup
  createLenis()
}

export default function useSmoothScroll() {
  useEffect(() => {
    createLenis()
    return () => destroyLenis()
  }, [])
}
