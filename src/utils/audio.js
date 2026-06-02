// Web Audio API Audio Synthesizer (Pristine, 0ms latency UI haptic click, tick, and swell sounds)

let audioCtx = null

export function initAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  } catch (e) {
    console.warn('Failed to initialize AudioContext:', e)
  }
}

function getAudioContext() {
  initAudio()
  return audioCtx
}

export function playTick() {
  try {
    const isSoundOn = localStorage.getItem('sound_enabled') === 'true'
    if (!isSoundOn) return

    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    // Very short high-frequency tick (cyber-haptic hover feel)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.035)

    gain.gain.setValueAtTime(0.015, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

    osc.start()
    osc.stop(ctx.currentTime + 0.035)
  } catch (e) {
    console.warn('Synthesized audio error:', e)
  }
}

export function playClick() {
  try {
    const isSoundOn = localStorage.getItem('sound_enabled') === 'true'
    if (!isSoundOn) return

    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    // Crisp mechanical keyboard-style tick
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(850, ctx.currentTime)
    osc.frequency.setValueAtTime(180, ctx.currentTime + 0.015)

    gain.gain.setValueAtTime(0.045, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045)

    osc.start()
    osc.stop(ctx.currentTime + 0.045)
  } catch (e) {
    console.warn('Synthesized audio error:', e)
  }
}

export function playSwell() {
  try {
    const isSoundOn = localStorage.getItem('sound_enabled') === 'true'
    if (!isSoundOn) return

    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    // Low-frequency ambient atmospheric swell (perfect for smooth overlay entrances)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(130, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.38)

    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.15)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)

    osc.start()
    osc.stop(ctx.currentTime + 0.4)
  } catch (e) {
    console.warn('Synthesized audio error:', e)
  }
}
