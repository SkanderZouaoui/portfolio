import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

// Simple GLSL Shader to produce premium wave ripples & chromatic aberration
const DistortionShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate distance from vertices to mouse cursor position
      float dist = distance(uv, uMouse);
      
      // Wave ripple ripple wave centered on cursor and hover intensity
      float wave = sin(dist * 12.0 - uTime * 4.5) * 0.08 * uHover;
      
      // Push mesh slightly outwards/inwards based on distance
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uPlaneSize;
    uniform vec2 uTextureSize;
    varying vec2 vUv;
    
    void main() {
      // 1. Emulate CSS "object-fit: cover" aspect ratio math
      float planeRatio = uPlaneSize.x / uPlaneSize.y;
      float texRatio = uTextureSize.x / uTextureSize.y;
      
      vec2 uv = vUv;
      if (planeRatio > texRatio) {
        float scaleY = texRatio / planeRatio;
        uv.y = (uv.y - 0.5) * scaleY + 0.5;
      } else {
        float scaleX = planeRatio / texRatio;
        uv.x = (uv.x - 0.5) * scaleX + 0.5;
      }
      
      // 2. Add organic wave warping to the UV lookup
      float waveOffset = sin(uv.y * 14.0 + uTime * 2.0) * 0.008 * uHover;
      
      // 3. Chromatic Aberration (RGB color splitting) driven by hover
      float rgbSplit = 0.015 * uHover;
      
      vec4 r = texture2D(uTexture, uv + vec2(waveOffset + rgbSplit, 0.0));
      vec4 g = texture2D(uTexture, uv + vec2(waveOffset, 0.0));
      vec4 b = texture2D(uTexture, uv + vec2(waveOffset - rgbSplit, 0.0));
      
      gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
    }
  `
}

function ShaderMesh({ src, isHovered, mousePos }) {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, src)
  
  // Local state parameters
  const [planeSize, setPlaneSize] = useState([1.6, 1])
  const hoverVal = useRef(0)
  const timeVal = useRef(0)

  // Track size/aspect ratio updates
  useEffect(() => {
    if (meshRef.current) {
      // Fit to normalized webgl aspect bounds
      setPlaneSize([2, 1.25])
    }
  }, [src])

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uPlaneSize: { value: new THREE.Vector2(2, 1.25) },
    uTextureSize: { value: new THREE.Vector2(texture.image?.width || 800, texture.image?.height || 500) }
  })

  useFrame((state, delta) => {
    timeVal.current += delta
    
    // Smoothly interpolate hover weight (lerp)
    hoverVal.current += ((isHovered ? 1 : 0) - hoverVal.current) * 0.12
    
    if (meshRef.current) {
      const mat = meshRef.current.material
      mat.uniforms.uTime.value = timeVal.current
      mat.uniforms.uHover.value = hoverVal.current
      mat.uniforms.uMouse.value.lerp(new THREE.Vector2(mousePos.x, mousePos.y), 0.15)
      
      // Rotate the plane slightly on mouse hover for interactive 3D depth
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (mousePos.x - 0.5) * 0.18 * hoverVal.current, 0.1)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -(mousePos.y - 0.5) * 0.18 * hoverVal.current, 0.1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={DistortionShader.vertexShader}
        fragmentShader={DistortionShader.fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default function WebGLImage({ src, alt, className }) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef()

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = 1.0 - (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  let imageSrc = src;
  // Gracefully fallback to a placeholder texture when source is missing.
  // This ensures the WebGL distortion effect is still rendered using a neutral texture.
  if (!imageSrc) {
    const placeholder =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAwMCIvPjwvc3ZnPg==';
    imageSrc = placeholder;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHovered(false)
        setMousePos({ x: 0.5, y: 0.5 })
      }}
    >
      {/* Background backup/loading fallback image */}
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      {/* Dynamic 3D Distortion Layer */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 2
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 2], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <ShaderMesh src={imageSrc} isHovered={hovered} mousePos={mousePos} />
        </Canvas>
      </div>
    </div>
  )
}
