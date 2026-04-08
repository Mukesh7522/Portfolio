'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Counter animation ─────────────────────────────────────── */
function Counter({
  value, suffix, prefix, isInView,
}: { value: number; suffix?: string; prefix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const step     = value / (duration / (1000 / 60))
    let cur        = 0
    const timer    = setInterval(() => {
      cur += step
      if (cur >= value) { setCount(value); clearInterval(timer) }
      else setCount(value % 1 !== 0 ? parseFloat(cur.toFixed(1)) : Math.floor(cur))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, value])

  const fmt = (v: number) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + 'M'
    if (v >= 1000)      return (v / 1000).toFixed(0) + 'K'
    return v.toFixed(v % 1 === 0 ? 0 : 1)
  }

  return <>{prefix}{fmt(count)}{suffix}</>
}

const stats = [
  { raw: 30_000_000, display: '30M+', label: 'Records Processed',          prefix: '',  suffix: '+' },
  { raw: 12,         display: '₹12L', label: 'Annual Cost Savings',         prefix: '₹', suffix: 'L+' },
  { raw: 60,         display: '60%',  label: 'Support Requests Reduced',    prefix: '',  suffix: '%' },
  { raw: 13,         display: '13+',  label: 'D2C Platforms Integrated',    prefix: '',  suffix: '+' },
]

export default function About() {
  const ref     = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        {/* Section label */}


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 56 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" ref={ref}>
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                `Analytics Engineer with strong data engineering experience building production-grade data pipelines, multi-source ETL systems, and full-stack analytics platforms. Architected unified PostgreSQL data warehouses consolidating 30M+ records across multiple channels.`,
                `Delivered ₹12L+ in annual cost savings by replacing legacy BI tooling with custom self-service analytics platforms, reducing analytics support requests by 60%.`,
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400,
                  fontSize: 15, color: '#94a3b8', lineHeight: 1.75,
                }}>
                  {text}
                </p>
              ))}
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: '#475569' }}>
                <span style={{ color: '#f8fafc', fontWeight: 500 }}>Location:</span>{' '}
                Tirupur, Tamil Nadu, India
              </p>
            </div>
          </motion.div>

          {/* Stat cards 2×2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="card"
                style={{ padding: '24px 20px', textAlign: 'center' }}
                whileHover={{ y: -2 }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
                  fontSize:   28, lineHeight: 1,
                  background: 'linear-gradient(135deg,#38bdf8,#818cf8,#34d399)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: 8,
                }}>
                  {isInView ? (
                    <Counter value={s.raw} suffix={s.suffix} prefix={s.prefix} isInView={isInView} />
                  ) : '0'}
                </div>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 12,
                  color: '#475569', lineHeight: 1.4,
                }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
