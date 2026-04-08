'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Types ──────────────────────────────────────────────────── */
interface NodeData {
  idx:       number
  name:      string
  catIdx:    number
  color:     string
  basePos:   [number, number, number]
  baseScale: number
  phase:     number
  isCat:     boolean
}

/* ─── Data ───────────────────────────────────────────────────── */
const CATS = [
  { name: 'Pipeline & Orchestration', color: '#38bdf8', center: [-4.2,  1.5,  0.5] as [number,number,number] },
  { name: 'Languages',                color: '#818cf8', center: [ 4.2,  1.5, -0.5] as [number,number,number] },
  { name: 'Databases & Modeling',     color: '#f472b6', center: [-0.5, -3.8,  1.0] as [number,number,number] },
  { name: 'Cloud & DevOps',           color: '#34d399', center: [ 0.5,  3.8, -1.0] as [number,number,number] },
  { name: 'Analytics & Viz',          color: '#fbbf24', center: [ 0.0,  0.0,  4.5] as [number,number,number] },
]

const SKILLS = [
  ['Apache Airflow', 'Docker', 'FastAPI', 'REST APIs', 'Dropbox API'],
  ['Python', 'SQL', 'dbt', 'Pandas', 'ETL Automation'],
  ['PostgreSQL', 'MySQL', 'Star Schema', 'Materialized Views', 'Row-Level Security'],
  ['Linux', 'Git', 'GitHub Actions', 'AWS EC2/S3', 'Slack Monitoring'],
  ['React', 'Power BI', 'Tableau', 'DAX', 'JavaScript'],
]

/* deterministic pseudo-random in [-1, 1] */
function hr(seed: number, n: number): number {
  const x = Math.sin(seed * 127.1 + n * 311.7 + 43.78) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

function buildNodes(): NodeData[] {
  const nodes: NodeData[] = []
  CATS.forEach((cat, ci) => {
    nodes.push({ idx: ci, name: cat.name, catIdx: ci, color: cat.color,
      basePos: cat.center, baseScale: 0.22, phase: ci * 1.2, isCat: true })
  })
  CATS.forEach((cat, ci) => {
    SKILLS[ci].forEach((skill, si) => {
      const seed = ci * 5 + si
      const [cx, cy, cz] = cat.center
      nodes.push({
        idx: 5 + ci * 5 + si, name: skill, catIdx: ci, color: cat.color,
        basePos: [cx + hr(seed,0)*1.4, cy + hr(seed,1)*1.4, cz + hr(seed,2)*1.4],
        baseScale: 0.10, phase: seed * 0.4, isCat: false,
      })
    })
  })
  return nodes
}

const NODES = buildNodes()
const N     = NODES.length

/* ─── Galaxy Scene (inside Canvas) ──────────────────────────── */
function GalaxyScene({
  activeCategory, isMobile,
}: {
  activeCategory: number | null
  isMobile:       boolean
}) {
  const { camera, size } = useThree()
  const centerRef  = useRef<THREE.Mesh>(null!)
  const groupRefs  = useRef<(THREE.Group | null)[]>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const lastHov    = useRef<number | null>(null)
  const seg        = isMobile ? 8 : 16

  const curS = useRef<number[]>(NODES.map(n => n.baseScale))
  const tgtS = useRef<number[]>(NODES.map(n => n.baseScale))

  /* connection line geometries */
  const { skillGeo, catGeo } = useMemo(() => {
    const sv: number[] = [], cv: number[] = []
    NODES.forEach(node => {
      if (!node.isCat) {
        const cat = NODES[node.catIdx]
        sv.push(...node.basePos, ...cat.basePos)
      } else {
        cv.push(...node.basePos, 0, 0, 0)
      }
    })
    const skillGeo = new THREE.BufferGeometry()
    skillGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sv), 3))
    const catGeo = new THREE.BufferGeometry()
    catGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cv), 3))
    return { skillGeo, catGeo }
  }, [])
  useEffect(() => () => { skillGeo.dispose(); catGeo.dispose() }, [skillGeo, catGeo])

  /* per-frame: float + scale lerp */
  useFrame(({ clock }) => {
    if (document.hidden) return
    const t = clock.elapsedTime

    for (let i = 0; i < N; i++) {
        const node = NODES[i]
        const group = groupRefs.current[i]
        if (!group) continue
        
        curS.current[i] += (tgtS.current[i] - curS.current[i]) * 0.10
        const sc = curS.current[i]
        
        group.position.set(node.basePos[0], node.basePos[1] + Math.sin(t * 0.8 + node.phase) * 0.25, node.basePos[2])
        group.scale.set(sc, sc, sc)
    }

    if (centerRef.current) {
      const sc = 0.95 + Math.sin(t * 1.2) * 0.05
      centerRef.current.scale.set(sc, sc, sc)
    }
  })

  /* hover handlers */
  const onPointerMove = (idx: number) => {
    if (idx === lastHov.current) return
    lastHov.current = idx
    setHoveredIdx(idx)
    NODES.forEach((n, i) => {
      tgtS.current[i] = i === idx ? n.baseScale * 1.6 : n.baseScale
    })
  }

  const onPointerLeave = () => {
    lastHov.current = null
    setHoveredIdx(null)
    NODES.forEach((n, i) => { tgtS.current[i] = n.baseScale })
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight color="#38bdf8" intensity={4}  distance={18} position={[0, 0, 0]} />
      <pointLight color="#818cf8" intensity={2}  distance={12} position={[5, 5, 3]} />
      <pointLight color="#34d399" intensity={1.5} distance={10} position={[-5, -4, 2]} />

      <lineSegments geometry={skillGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
      </lineSegments>
      <lineSegments geometry={catGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </lineSegments>

      {NODES.map((node, i) => {
        const isHovered = hoveredIdx === i
        const isDimmed = activeCategory !== null && activeCategory !== node.catIdx
        const baseColor = isDimmed ? new THREE.Color(node.color).multiplyScalar(0.15).getStyle() : node.color

        return (
          <group 
            key={i} 
            ref={(el) => { groupRefs.current[i] = el }}
          >
            <mesh
              onPointerMove={(e) => { e.stopPropagation(); onPointerMove(i) }}
              onPointerLeave={(e) => { e.stopPropagation(); onPointerLeave() }}
            >
              <sphereGeometry args={[1, seg, seg]} />
              <meshBasicMaterial 
                transparent 
                opacity={0.92} 
                color={baseColor} 
              />
            </mesh>
            
            <Html 
              transform 
              sprite 
              center 
              style={{ pointerEvents: 'none', zIndex: isHovered ? 20 : 10, transition: 'all 0.2s', opacity: isDimmed ? 0.3 : 1 }}
              distanceFactor={8}
            >
              <div style={{
                background: isHovered ? '#0c1220' : 'rgba(12, 18, 32, 0.75)',
                border: `1px solid ${node.color}${isHovered ? 'ff' : '4d'}`,
                borderRadius: 8,
                padding: isHovered ? '6px 12px' : '4px 8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                backdropFilter: 'blur(4px)',
                marginTop: isHovered ? '-40px' : '-20px', // slightly offset up
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600, fontSize: isHovered ? 14 : 11, color: isHovered ? '#f8fafc' : '#e2e8f0',
                  transition: 'all 0.2s',
                }}>
                  {node.name}
                </div>
                {isHovered && node.isCat === false && (
                  <div style={{
                    fontFamily:   'JetBrains Mono, monospace',
                    fontSize:     10, marginTop: 4,
                    color:        node.color,
                    background:   `${node.color}1a`,
                    border:       `1px solid ${node.color}4d`,
                    borderRadius: 4, padding: '1px 6px',
                    display:      'inline-block',
                  }}>
                    {CATS[node.catIdx].name}
                  </div>
                )}
              </div>
            </Html>
          </group>
        )
      })}

      <mesh ref={centerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, seg, seg]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#38bdf8"
          emissiveIntensity={2} metalness={0.1} roughness={0.2}
        />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  )
}

/* ─── Main Export ────────────────────────────────────────────── */
export default function SkillGalaxy() {
  const [activeCat, setActiveCat] = useState<number | null>(null)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const canvasH  = isMobile ? 380 : 560

  return (
    <div className="w-full">
      {/* Canvas container */}
      <div className="relative w-full" style={{ height: canvasH }}>
        <Canvas
          camera={{ fov: 55, position: [0, 0, 11] }}
          gl={{ antialias: !isMobile, alpha: true }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
            gl.setClearColor(0x000000, 0)
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <GalaxyScene
            activeCategory={activeCat}
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        <button
          onClick={() => setActiveCat(null)}
          style={{
            fontFamily:   'JetBrains Mono, monospace', fontSize: 12,
            padding:      '5px 14px', borderRadius: 20, cursor: 'pointer',
            transition:   'all 0.2s',
            background:   activeCat === null ? 'rgba(56,189,248,0.15)' : 'transparent',
            border:       activeCat === null ? '1px solid rgba(56,189,248,0.6)' : '1px solid rgba(255,255,255,0.06)',
            color:        activeCat === null ? '#38bdf8' : '#475569',
          }}
        >
          All
        </button>
        {CATS.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveCat(activeCat === i ? null : i)}
            style={{
              fontFamily:   'JetBrains Mono, monospace', fontSize: 12,
              padding:      '5px 14px', borderRadius: 20, cursor: 'pointer',
              transition:   'all 0.2s',
              background:   activeCat === i ? `${cat.color}26` : 'transparent',
              border:       activeCat === i ? `1px solid ${cat.color}99` : '1px solid rgba(255,255,255,0.06)',
              color:        activeCat === i ? cat.color : '#475569',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
