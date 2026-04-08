'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Constants ─────────────────────────────────────────────── */
const COUNT       = 150
const BOUNDS      = 7
const CONN_SQ     = 2.5 * 2.5
const MAX_LF      = 11175 * 6           // max line floats (n*(n-1)/2 pairs × 6)
const lineBuf     = new Float32Array(MAX_LF)

const ACCENT = [
  new THREE.Color('#38bdf8'),
  new THREE.Color('#818cf8'),
  new THREE.Color('#34d399'),
]

/* ─── Particles + Connections ───────────────────────────────── */
function Particles({ paused }: { paused: React.MutableRefObject<boolean> }) {
  const frame = useRef(0)

  const { pos, vel, pGeo, lGeo } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      pos[ix]     = (Math.random() - 0.5) * BOUNDS * 2
      pos[ix + 1] = (Math.random() - 0.5) * BOUNDS * 2
      pos[ix + 2] = (Math.random() - 0.5) * 3
      vel[ix]     = (Math.random() - 0.5) * 0.008
      vel[ix + 1] = (Math.random() - 0.5) * 0.008
      vel[ix + 2] = (Math.random() - 0.5) * 0.003
      const c = ACCENT[i % 3]
      col[ix] = c.r; col[ix + 1] = c.g; col[ix + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lineBuf, 3))
    lGeo.setDrawRange(0, 0)

    return { pos, vel, pGeo, lGeo }
  }, [])

  useEffect(() => () => { pGeo.dispose(); lGeo.dispose() }, [pGeo, lGeo])

  useFrame(() => {
    if (paused.current) return
    frame.current++

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      pos[ix]     += vel[ix]
      pos[ix + 1] += vel[ix + 1]
      pos[ix + 2] += vel[ix + 2]
      if (Math.abs(pos[ix])     > BOUNDS) vel[ix]     *= -1
      if (Math.abs(pos[ix + 1]) > BOUNDS) vel[ix + 1] *= -1
      if (Math.abs(pos[ix + 2]) > 1.5)   vel[ix + 2] *= -1
    }
    ;(pGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true

    /* update lines every 2nd frame */
    if (frame.current % 2 === 0) {
      let li = 0
      for (let i = 0; i < COUNT && li + 5 < MAX_LF; i++) {
        const ix = i * 3
        for (let j = i + 1; j < COUNT && li + 5 < MAX_LF; j++) {
          const jx = j * 3
          const dx = pos[ix] - pos[jx]
          const dy = pos[ix + 1] - pos[jx + 1]
          const dz = pos[ix + 2] - pos[jx + 2]
          if (dx * dx + dy * dy + dz * dz < CONN_SQ) {
            lineBuf[li++] = pos[ix];     lineBuf[li++] = pos[ix + 1]; lineBuf[li++] = pos[ix + 2]
            lineBuf[li++] = pos[jx];     lineBuf[li++] = pos[jx + 1]; lineBuf[li++] = pos[jx + 2]
          }
        }
      }
      ;(lGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
      lGeo.setDrawRange(0, li / 3)
    }
  })

  return (
    <>
      <points geometry={pGeo}>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.65} sizeAttenuation />
      </points>
      <lineSegments geometry={lGeo}>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.08} />
      </lineSegments>
    </>
  )
}

/* ─── Icosahedron Wireframe ─────────────────────────────────── */
function IcosahedronWire({ paused }: { paused: React.MutableRefObject<boolean> }) {
  const ref   = useRef<THREE.LineSegments>(null!)
  const edges = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(2.8, 1)
    const e = new THREE.EdgesGeometry(g)
    g.dispose()
    return e
  }, [])
  useEffect(() => () => edges.dispose(), [edges])
  useFrame(() => {
    if (paused.current || !ref.current) return
    ref.current.rotation.x += 0.0008
    ref.current.rotation.y += 0.0006
  })
  return (
    <lineSegments ref={ref} geometry={edges}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.15} />
    </lineSegments>
  )
}

/* ─── Orbit Rings ────────────────────────────────────────────── */
function OrbitRings({ paused }: { paused: React.MutableRefObject<boolean> }) {
  const r1 = useRef<THREE.Mesh>(null!)
  const r2 = useRef<THREE.Mesh>(null!)
  const r3 = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (paused.current) return
    if (r1.current) r1.current.rotation.z += 0.003
    if (r2.current) r2.current.rotation.z += 0.002
    if (r3.current) r3.current.rotation.z += 0.0015
  })
  return (
    <>
      <mesh ref={r1} rotation={[0.8, 0, 0]}>
        <torusGeometry args={[3.8, 0.008, 2, 80]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
      </mesh>
      <mesh ref={r2} rotation={[0.4, 1.2, 0]}>
        <torusGeometry args={[4.4, 0.008, 2, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>
      <mesh ref={r3} rotation={[1.6, 0.6, 0]}>
        <torusGeometry args={[5.0, 0.008, 2, 80]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.12} />
      </mesh>
    </>
  )
}

/* ─── Scene (handles visibility pause) ─────────────────────── */
function Scene() {
  const paused = useRef(false)
  useEffect(() => {
    const fn = () => { paused.current = document.hidden }
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [])
  return (
    <>
      <Particles       paused={paused} />
      <IcosahedronWire paused={paused} />
      <OrbitRings      paused={paused} />
    </>
  )
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
