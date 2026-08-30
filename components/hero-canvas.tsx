"use client"

// Chosen concept: Morphing Brand World.
// This fits the portfolio's existing identity best because it keeps the hero
// immersive and premium without overwhelming the content. The single floating
// glass core echoes the current blue-accent design language, while the subtle
// mouse-driven motion adds depth without feeling like a game or a distracting
// experience-heavy landing page.

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Icosahedron, Octahedron, Torus, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import type { Group, Mesh, Points as ThreePoints } from "three"

// A single floating low-poly glass shape orbiting the central form.
// Rotation is time-based (not per-frame delta accumulation) so the
// throttled frame rate never changes the perceived speed.
function FloatingShape({
  position,
  scale,
  speed,
  kind,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  kind: "ico" | "octa" | "torus"
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.y = t * 0.6
    ref.current.position.y = position[1] + Math.sin(t) * 0.3
  })

  const material = (
    <meshStandardMaterial color="#2997ff" roughness={0.15} metalness={0.35} transparent opacity={0.4} />
  )

  if (kind === "torus") {
    return (
      <Torus ref={ref} position={position} scale={scale} args={[0.7, 0.26, 16, 48]}>
        {material}
      </Torus>
    )
  }
  if (kind === "octa") {
    return (
      <Octahedron ref={ref} position={position} scale={scale} args={[1, 0]}>
        {material}
      </Octahedron>
    )
  }
  return (
    <Icosahedron ref={ref} position={position} scale={scale} args={[1, 0]}>
      {material}
    </Icosahedron>
  )
}

// The modern centerpiece: an organic, continuously distorting sphere in
// electric blue that gives the hero a fluid, tech-forward 3D feel.
function DistortCore() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.15
    ref.current.rotation.z = t * 0.05
  })
  return (
    <Icosahedron ref={ref} args={[1.7, 12]} position={[0, 0, -1]}>
      <MeshDistortMaterial
        color="#0071e3"
        roughness={0.1}
        metalness={0.5}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.55}
      />
    </Icosahedron>
  )
}

// A slowly rotating wireframe shell wrapping the core for extra depth.
function WireShell() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.08
    ref.current.rotation.y = -t * 0.12
  })
  return (
    <Icosahedron ref={ref} args={[2.6, 1]} position={[0, 0, -1]}>
      <meshBasicMaterial color="#2997ff" wireframe transparent opacity={0.12} />
    </Icosahedron>
  )
}

// A drifting field of fine particles for atmospheric depth.
function ParticleField() {
  const ref = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const count = 320
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#64d2ff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  )
}

// Drives the render loop at a capped frame rate.
// The Canvas runs in "demand" mode, so nothing renders unless we call
// invalidate(). A throttled rAF loop keeps GPU cost low while the
// time-based animations still read wall-clock time correctly.
function FrameLimiter({ fps = 30 }: { fps?: number }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    let raf = 0
    let last = 0
    const interval = 1000 / fps
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (now - last >= interval) {
        last = now
        invalidate()
      }
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [fps, invalidate])
  return null
}

function Scene() {
  const group = useRef<Group>(null)

  const shapes = useMemo<
    { position: [number, number, number]; scale: number; speed: number; kind: "ico" | "octa" | "torus" }[]
  >(
    () => [
      { position: [-3, 0.8, 0.5], scale: 0.8, speed: 0.5, kind: "ico" },
      { position: [3.1, -0.5, -0.5], scale: 1, speed: 0.35, kind: "torus" },
      { position: [1.9, 1.7, -1.5], scale: 0.6, speed: 0.6, kind: "octa" },
      { position: [-2, -1.6, -1], scale: 0.55, speed: 0.45, kind: "octa" },
      { position: [-1.4, 1.9, 0], scale: 0.4, speed: 0.7, kind: "ico" },
    ],
    [],
  )

  // Slow parallax drift of the whole cluster following the pointer.
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y += (state.pointer.x * 0.35 - group.current.rotation.y) * 0.03
    group.current.rotation.x += (-state.pointer.y * 0.25 - group.current.rotation.x) * 0.03
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#2997ff" />
      <pointLight position={[-4, -2, 2]} intensity={2.4} color="#0071e3" />
      <pointLight position={[0, 0, 3]} intensity={1.6} color="#64d2ff" />
      <DistortCore />
      <WireShell />
      <ParticleField />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      // "demand" means it only renders when invalidate() is called;
      // FrameLimiter caps that to ~30fps and low DPR caps fragment work.
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <FrameLimiter fps={30} />
      <Scene />
    </Canvas>
  )
}
