import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import profileSrc from '../assets/profile.png'

/* ─────────────────────────────────────────────
   GLSL: Profile image plane with glow + aberration
   ───────────────────────────────────────────── */
const ProfileShader = {
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Subtle wave on hover
      float wave = sin(uv.y * 8.0 + uTime * 2.0) * 0.015 * uHover;
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      // Chromatic aberration on hover
      float aberration = 0.004 * uHover;
      float r = texture2D(uTexture, vUv + vec2(aberration, 0.0)).r;
      float g = texture2D(uTexture, vUv).g;
      float b = texture2D(uTexture, vUv - vec2(aberration, 0.0)).b;
      float a = texture2D(uTexture, vUv).a;

      // Subtle pulsing glow on edges using alpha
      float edgeGlow = smoothstep(0.0, 0.15, a) * (1.0 - smoothstep(0.85, 1.0, a));
      float pulse = sin(uTime * 2.5) * 0.5 + 0.5;
      vec3 glowColor = mix(vec3(0.78, 1.0, 0.0), vec3(1.0, 0.3, 0.3), pulse * 0.3);

      vec3 color = vec3(r, g, b);
      color += edgeGlow * glowColor * 0.3 * uHover;

      gl_FragColor = vec4(color, a);
    }
  `
}

/* ─────────────────────────────────────────────
   Floating Particles Aura behind the profile
   ───────────────────────────────────────────── */
function ParticleAura() {
  const pointsRef = useRef()
  const elapsed = useRef(0)
  const COUNT = 180

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      // Distribute in a disk / cloud behind the image
      const angle = Math.random() * Math.PI * 2
      const radius = 0.3 + Math.random() * 1.2
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = -0.2 - Math.random() * 0.6 // behind

      const isAccent = Math.random() > 0.5
      col[i * 3]     = isAccent ? 0.78 : 1.0
      col[i * 3 + 1] = isAccent ? 1.0  : 0.3
      col[i * 3 + 2] = isAccent ? 0.0  : 0.3
      spd[i] = 0.3 + Math.random() * 0.7
    }
    return { positions: pos, colors: col, speeds: spd }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    elapsed.current += delta
    const posArr = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      const speed = speeds[i]
      posArr[i * 3 + 1] += Math.sin(elapsed.current * speed + i) * 0.0008
      posArr[i * 3]     += Math.cos(elapsed.current * speed * 0.7 + i * 0.5) * 0.0005
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.z = elapsed.current * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={0.018}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────
   Glow Rings orbiting behind the profile
   ───────────────────────────────────────────── */
function GlowRings() {
  const group = useRef()
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    elapsed.current += delta
    group.current.rotation.z = elapsed.current * 0.15
  })

  return (
    <group ref={group} position={[0, 0, -0.3]}>
      {[0.85, 1.1, 1.35].map((r, i) => (
        <group key={i}>
          <mesh rotation={[0, 0, i * 0.6]}>
            <torusGeometry args={[r, 0.008, 8, 80]} />
            <meshBasicMaterial
              color={i === 0 ? '#C8FF00' : i === 1 ? '#FF4D4D' : '#ffffff'}
              transparent
              opacity={0.2 - i * 0.04}
            />
          </mesh>
          {/* Additive glow layer */}
          <mesh rotation={[0, 0, i * 0.6]}>
            <torusGeometry args={[r, 0.04, 8, 80]} />
            <meshBasicMaterial
              color={i === 0 ? '#C8FF00' : i === 1 ? '#FF4D4D' : '#ffffff'}
              transparent
              opacity={0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────
   Gradient Glow Sphere behind the image
   ───────────────────────────────────────────── */
function BackGlow() {
  const meshRef = useRef()
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    elapsed.current += delta
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1.0 + Math.sin(elapsed.current * 0.8) * 0.06)
    }
  })

  return (
    <group>
      {/* Main accent glow */}
      <mesh ref={meshRef} position={[0, 0, -0.5]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color="#C8FF00"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {/* Secondary warm glow */}
      <mesh position={[0.2, -0.2, -0.6]} scale={1.2}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#FF4D4D"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────
   Profile Image Plane (transparent PNG)
   ───────────────────────────────────────────── */
function ProfilePlane({ isHovered, mousePos }) {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, profileSrc)
  const hoverVal = useRef(0)
  const timeVal = useRef(0)
  const floatOffset = useRef(0)

  // Ensure texture has proper alpha channel handling
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.premultiplyAlpha = false
    }
  }, [texture])

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
  })

  useFrame((_, delta) => {
    timeVal.current += delta
    floatOffset.current += delta

    // Smooth hover interpolation
    hoverVal.current += ((isHovered ? 1 : 0) - hoverVal.current) * 0.08

    if (meshRef.current) {
      const mat = meshRef.current.material
      mat.uniforms.uTime.value = timeVal.current
      mat.uniforms.uHover.value = hoverVal.current

      // Floating animation
      meshRef.current.position.y = Math.sin(floatOffset.current * 0.8) * 0.04

      // Parallax tilt on hover
      const targetRotY = (mousePos.x - 0.5) * 0.25 * hoverVal.current
      const targetRotX = -(mousePos.y - 0.5) * 0.2 * hoverVal.current
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08)

      // Subtle scale pulse on hover
      const sc = 1.0 + hoverVal.current * 0.03
      meshRef.current.scale.setScalar(sc)
    }
  })

  // Compute plane aspect from texture
  const aspect = texture.image ? texture.image.width / texture.image.height : 1
  const planeH = 2.4
  const planeW = planeH * aspect

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[planeW, planeH, 32, 32]} />
      <shaderMaterial
        vertexShader={ProfileShader.vertexShader}
        fragmentShader={ProfileShader.fragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────
   Main Exported Component
   ───────────────────────────────────────────── */
export default function ProfileScene3D({ className, style }) {
  const containerRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = 1.0 - (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHovered(false)
        setMousePos({ x: 0.5, y: 0.5 })
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 3]} intensity={1.5} color="#C8FF00" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#FF4D4D" />

        {/* Background effects (rendered behind due to z-position) */}
        <BackGlow />
        <GlowRings />
        <ParticleAura />

        {/* Profile image */}
        <ProfilePlane isHovered={hovered} mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
