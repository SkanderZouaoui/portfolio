import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Suppress THREE.Clock deprecation from R3F v9 internals (remove after upgrading to R3F v10) ─── */
const _warn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
  _warn.apply(console, args)
}

/* ─── Mouse tracker shared across meshes ─── */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1
  })
}

/* ─── Scroll progress tracker shared across meshes ─── */
const scroll = { progress: 0, targetProgress: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll > 0) {
      scroll.targetProgress = window.scrollY / maxScroll
    }
  }, { passive: true })
}

/* ─── Ribbon / DNA helix ─── */
function Helix() {
  const groupRef = useRef()
  const elapsed = useRef(0)
  const TURNS = 4
  const POINTS = 220
  const R = 1.1

  const { positions1, positions2, colors } = useMemo(() => {
    const p1 = [], p2 = [], c = []
    for (let i = 0; i < POINTS; i++) {
      const t = (i / POINTS) * Math.PI * 2 * TURNS
      const y = (i / POINTS) * 7 - 3.5
      p1.push(Math.cos(t) * R, y, Math.sin(t) * R)
      p2.push(Math.cos(t + Math.PI) * R, y, Math.sin(t + Math.PI) * R)
      const h = i / POINTS
      c.push(h * 0.78, h * 1.0, 0)
    }
    return {
      positions1: new Float32Array(p1),
      positions2: new Float32Array(p2),
      colors: new Float32Array(c),
    }
  }, [])

  // Cross bars
  const bars = useMemo(() => {
    const res = []
    for (let i = 0; i < POINTS; i += 10) {
      const t = (i / POINTS) * Math.PI * 2 * TURNS
      const y = (i / POINTS) * 7 - 3.5
      const x1 = Math.cos(t) * R, z1 = Math.sin(t) * R
      const x2 = Math.cos(t + Math.PI) * R, z2 = Math.sin(t + Math.PI) * R
      res.push({ p1: [x1, y, z1], p2: [x2, y, z2] })
    }
    return res
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    elapsed.current += delta
    mouse.x += (mouse.tx - mouse.x) * 0.04
    mouse.y += (mouse.ty - mouse.y) * 0.04
    groupRef.current.rotation.y = elapsed.current * 0.18 + mouse.x * 0.4
    groupRef.current.rotation.x = mouse.y * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions1} count={POINTS} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} count={POINTS} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors linewidth={2} transparent opacity={0.9} />
      </line>
      {/* Strand 2 */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions2} count={POINTS} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} count={POINTS} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors linewidth={2} transparent opacity={0.9} />
      </line>
      {/* Cross bars */}
      {bars.map((b, i) => {
        const barPos = new Float32Array([...b.p1, ...b.p2])
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" array={barPos} count={2} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#C8FF00" transparent opacity={0.25} />
          </line>
        )
      })}
      {/* Dot nodes */}
      {bars.map((b, i) => (
        <group key={`dots-${i}`}>
          <mesh position={b.p1}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#C8FF00" />
          </mesh>
          <mesh position={b.p2}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Noise distortion blob ─── */
function NoiseSphere() {
  const meshRef = useRef()
  const matRef = useRef()
  const clock = useRef(0)

  useFrame((_, delta) => {
    clock.current += delta * 0.25
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.current
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
      meshRef.current.position.x = Math.sin(clock.current * 0.4) * 0.3
    }
  })

  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal; varying float vElevation;
    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
      vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
      float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
      vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }
    void main(){
      vNormal=normal;
      vec3 pos=position;
      float n=snoise(pos*0.5+uTime*0.15)*0.5+snoise(pos*1.2-uTime*0.1)*0.2;
      vElevation=n;
      pos+=normal*n;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
    }
  `
  const fragmentShader = `
    uniform float uTime;
    varying vec3 vNormal; varying float vElevation;
    void main(){
      float t=vElevation*2.+0.5;
      vec3 a=vec3(0.04,0.04,0.06);
      vec3 b=vec3(0.78,1.,0.);
      vec3 c=vec3(1.,0.3,0.3);
      vec3 col=mix(a,b,smoothstep(0.,.7,t));
      col=mix(col,c,smoothstep(.75,1.,t));
      float rim=pow(1.-dot(normalize(vNormal),vec3(0.,0.,1.)),4.);
      col+=rim*vec3(0.6,1.,0.)*0.4;
      gl_FragColor=vec4(col,0.85);
    }
  `
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  return (
    <group>
      <mesh ref={meshRef} position={[-2.8, 0, -2]} scale={1.4}>
        <icosahedronGeometry args={[1, 64]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Shifting Pink/Red Atmospheric Aura */}
      <mesh position={[-2.8, 0, -2]} scale={1.8}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#FF4D4D"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer Lime Glow Halo */}
      <mesh position={[-2.8, 0, -2]} scale={2.2}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#C8FF00"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* ─── GPU particle field ─── */
function ParticleField() {
  const meshRef = useRef()
  const elapsed = useRef(0)
  const COUNT = 1400

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const sz = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 4
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const accent = Math.random() > 0.65
      col[i * 3] = accent ? 0.78 : 0.4
      col[i * 3 + 1] = accent ? 1.0 : 0.4
      col[i * 3 + 2] = accent ? 0.0 : 0.5
      sz[i] = Math.random() * 0.04 + 0.01
    }
    return { positions: pos, colors: col, sizes: sz }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    elapsed.current += delta
    meshRef.current.rotation.y = elapsed.current * 0.03 + mouse.x * 0.2
    meshRef.current.rotation.x = elapsed.current * 0.01 + mouse.y * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={COUNT} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial vertexColors transparent opacity={0.75} sizeAttenuation size={0.03} />
    </points>
  )
}

/* ─── Floating rings ─── */
function Rings() {
  const group = useRef()
  const elapsed = useRef(0)
  useFrame((_, delta) => {
    if (!group.current) return
    elapsed.current += delta
    group.current.rotation.x = elapsed.current * 0.07 + mouse.y * 0.2
    group.current.rotation.z = elapsed.current * 0.04
  })
  return (
    <group ref={group} position={[2.5, 0.5, -1]}>
      {[1.0, 1.4, 1.8].map((r, i) => (
        <group key={i}>
          {/* Main Ring */}
          <mesh rotation={[Math.PI / 2 + i * 0.4, i * 0.5, 0]}>
            <torusGeometry args={[r, 0.012, 8, 100]} />
            <meshBasicMaterial color={i === 0 ? '#C8FF00' : '#ffffff'} transparent opacity={0.25 - i * 0.05} />
          </mesh>
          {/* Neon Glow Outlines (Additive, lower opacity, wider radius) */}
          <mesh rotation={[Math.PI / 2 + i * 0.4, i * 0.5, 0]}>
            <torusGeometry args={[r, 0.045, 8, 100]} />
            <meshBasicMaterial
              color={i === 0 ? '#C8FF00' : '#ffffff'}
              transparent
              opacity={0.14 - i * 0.03}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function SceneCameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    // 1. Smoothly interpolate scroll progress
    scroll.progress += (scroll.targetProgress - scroll.progress) * 0.065

    // 2. Smoothly interpolate mouse coordinates
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05

    // Camera flight path based on page sections:
    // Sections: Hero (0.0) -> Projects (0.2) -> Stack (0.4) -> Experience (0.6) -> About (0.8) -> Contact (1.0)
    let targetX = 0
    let targetY = 0
    let targetZ = 7

    const p = Math.max(0, Math.min(1, scroll.progress))
    if (p <= 0.20) {
      // Hero to Projects (Blob focus on left)
      const t = p / 0.20
      targetX = THREE.MathUtils.lerp(0, -2.8, t)
      targetY = THREE.MathUtils.lerp(0, 0.4, t)
      targetZ = THREE.MathUtils.lerp(7, 5.8, t)
    } else if (p <= 0.40) {
      // Projects to Stack (Rings focus on right)
      const t = (p - 0.20) / 0.20
      targetX = THREE.MathUtils.lerp(-2.8, 2.5, t)
      targetY = THREE.MathUtils.lerp(0.4, -0.4, t)
      targetZ = THREE.MathUtils.lerp(5.8, 6.4, t)
    } else if (p <= 0.60) {
      // Stack to Experience (Full wide particle field view)
      const t = (p - 0.40) / 0.20
      targetX = THREE.MathUtils.lerp(2.5, 0, t)
      targetY = THREE.MathUtils.lerp(-0.4, -0.8, t)
      targetZ = THREE.MathUtils.lerp(6.4, 7.2, t)
    } else if (p <= 0.80) {
      // Experience to About (Close-up double helix)
      const t = (p - 0.60) / 0.20
      targetX = THREE.MathUtils.lerp(0, -2.0, t)
      targetY = THREE.MathUtils.lerp(-0.8, 0.6, t)
      targetZ = THREE.MathUtils.lerp(7.2, 5.0, t)
    } else {
      // About to Contact (Distant overview)
      const t = (p - 0.80) / 0.20
      targetX = THREE.MathUtils.lerp(-2.0, 0, t)
      targetY = THREE.MathUtils.lerp(0.6, -1.2, t)
      targetZ = THREE.MathUtils.lerp(5.0, 8.0, t)
    }

    // Apply spring-based mouse parallax offsets to camera coordinates
    const posX = targetX + mouse.x * 0.45
    const posY = targetY + mouse.y * 0.35
    const posZ = targetZ

    camera.position.x += (posX - camera.position.x) * 0.08
    camera.position.y += (posY - camera.position.y) * 0.08
    camera.position.z += (posZ - camera.position.z) * 0.08

    // Smoothly direct camera focus
    const lookTarget = new THREE.Vector3(mouse.x * 0.2, mouse.y * 0.2, 0)
    camera.lookAt(lookTarget)
  })

  return null
}

/* ─── Canvas ─── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#C8FF00" />
      <pointLight position={[-4, -3, -4]} intensity={1.2} color="#FF4D4D" />
      <pointLight position={[0, 6, 2]} intensity={0.8} color="#ffffff" />
      <Helix />
      <NoiseSphere />
      <ParticleField />
      <Rings />
      <SceneCameraRig />
    </Canvas>
  )
}
