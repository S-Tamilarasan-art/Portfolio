"use client"

// Vanilla Three.js hero backdrop: a dense drifting particle field.
// Mouse position gently steers the camera (parallax).
import { useEffect, useRef } from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 9000
const SPHERE_RADIUS = 80

function getAccentColor() {
  const isDark = document.documentElement.classList.contains("dark")
  return isDark ? 0x0071e3 : 0x1a1a2e
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.innerWidth < 768) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = document.createElement("canvas")
    container.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      300,
    )
    camera.position.set(0, 0, 40)

    const accent = getAccentColor()

    // Particle field distributed inside a sphere.
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = SPHERE_RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: accent,
      size: 0.15,
      transparent: true,
      opacity: document.documentElement.classList.contains("dark") ? 0.4 : 0.6,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Mouse parallax target for the camera.
    const pointer = { x: 0, y: 0 }
    const cameraTarget = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onPointerMove)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)

      particles.rotation.x += 0.0003
      particles.rotation.y += 0.0005

      cameraTarget.x += (pointer.x * 4 - cameraTarget.x) * 0.05
      cameraTarget.y += (-pointer.y * 4 - cameraTarget.y) * 0.05
      camera.position.x = cameraTarget.x
      camera.position.y = cameraTarget.y
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", onResize)

    const themeObserver = new MutationObserver(() => {
      const nextAccent = getAccentColor()
      particleMaterial.color.setHex(nextAccent)
      particleMaterial.opacity = document.documentElement.classList.contains("dark") ? 0.4 : 0.6
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      themeObserver.disconnect()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
      container.removeChild(canvas)
    }
  }, [])

  return <div ref={containerRef} className="size-full" />
}
