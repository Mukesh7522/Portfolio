'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiDatabase, HiLightningBolt, HiChartBar, HiClock } from 'react-icons/hi'

/* ─── Counter Animation (preserved logic) ───────────────────── */
function CounterAnimation({
  value, suffix = '', prefix = '', isInView, duration = 2,
}: {
  value: number; suffix?: string; prefix?: string; isInView: boolean; duration?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const step = value / (duration * 60)
    let cur    = 0
    const timer = setInterval(() => {
      cur += step
      if (cur >= value) { setCount(value); clearInterval(timer) }
      else setCount(value % 1 !== 0 ? parseFloat(cur.toFixed(1)) : Math.floor(cur))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, value, duration])

  const fmt = (v: number) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + 'M'
    if (v >= 1000)      return (v / 1000).toFixed(0) + 'K'
    return v.toFixed(v % 1 === 0 ? 0 : 1)
  }

  return <>{prefix}{fmt(count)}{suffix}</>
}

const stats = [
  { icon: HiDatabase,      value: 30_000_000, prefix: '',  suffix: '+',  label: 'Records Processed',   accent: '#38bdf8' },
  { icon: HiLightningBolt, value: 12,         prefix: '₹', suffix: 'L',  label: 'Annual Cost Savings', accent: '#fbbf24' },
  { icon: HiChartBar,      value: 60,         prefix: '',  suffix: '%',  label: 'Support Reduction',   accent: '#34d399' },
  { icon: HiClock,         value: 85,         prefix: '',  suffix: '%',  label: 'Order Time Saved',    accent: '#818cf8' },
]

const highlights = [
  'Eliminated ₹12L/year Power BI licensing via custom analytics platform',
  'Processed 200+ files per ETL cycle via Dropbox API automation',
  'Tracked 16,000+ live aircraft with 3-minute refresh pipeline',
  'Fashion Expo order system deployed in 5 days for live expo event',
]

export default function Achievements() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" className="section-padding">
      <div className="container-custom">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 48 }}
        >
          Key Achievements
        </motion.h2>

        {/* Stat cards */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card"
                style={{ padding: '28px 20px', textAlign: 'center' }}
                whileHover={{ y: -3 }}
              >
                <Icon style={{ color: s.accent, width: 24, height: 24, margin: '0 auto 12px' }} />
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
                  fontSize:   32, lineHeight: 1, color: s.accent, marginBottom: 8,
                }}>
                  {isInView ? (
                    <CounterAnimation value={s.value} suffix={s.suffix} prefix={s.prefix} isInView={isInView} />
                  ) : `${s.prefix}0${s.suffix}`}
                </div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: '#475569' }}>
                  {s.label}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Impact highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background:   '#0c1220',
            border:       '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '28px 32px',
          }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            letterSpacing: '0.12em', color: 'rgba(56,189,248,0.6)', marginBottom: 20 }}>
            {'IMPACT HIGHLIGHTS'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span style={{ color: '#34d399', flexShrink: 0, marginTop: 2, fontSize: 14 }}>✓</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
