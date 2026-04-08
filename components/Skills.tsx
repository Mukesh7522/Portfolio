'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

const SkillGalaxy = dynamic(() => import('@/components/three/SkillGalaxy'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 560, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(12,18,32,0.5)', borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#475569' }}>
        Loading galaxy...
      </span>
    </div>
  ),
})

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        {/* Section label */}


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 8 }}
        >
          Skills &amp; Expertise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: '#475569', marginBottom: 40 }}
        >
          drag to orbit · hover to inspect
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Suspense fallback={null}>
            <SkillGalaxy />
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
