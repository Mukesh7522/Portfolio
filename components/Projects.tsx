'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const projects = [
  {
    title:       'FlightPulse — Real-Time Flight Tracking Pipeline',
    accent:      '#34d399',
    badge:       'LIVE' as const,
    liveUrl:     'https://flight--pulse.vercel.app/',
    github:      'https://github.com/Mukesh7522/Flight-Pulse',
    description: 'Real-time data pipeline tracking 16,000+ aircraft across 115+ countries, refreshed every 3 minutes.',
    tech:        ['OpenSky API', 'Supabase', 'dbt', 'FastAPI', 'React', 'GitHub Actions', 'Vercel'],
    features:    [
      'Engineered pipeline processing 16,000+ live aircraft every 3 minutes',
      'Ghost flight detection identifying stale transponder signals',
      'PostgreSQL schema with raw + analytics layers, hourly auto-purge',
      'Deployed on Vercel, CI/CD via GitHub Actions',
    ],
  },
  {
    title:       'Stock Market Analytics Platform',
    accent:      '#818cf8',
    badge:       'LIVE' as const,
    liveUrl:     'https://mukesh-tradingdb.vercel.app/',
    github:      'https://github.com/Mukesh7522/stock-market-analytics',
    description: 'Production financial dashboard with 500K+ historical stock records and real-time updates.',
    tech:        ['React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'yFinance', 'GitHub Actions'],
    features:    [
      'Ingests 500K+ historical stock records with real-time updates',
      '15+ technical indicators: RSI, MACD, Bollinger Bands',
      'ML forecasting with LSTM, ARIMA, Prophet models',
      'Star schema 18 tables, sub-200ms API response times',
    ],
  },
  {
    title:       'Distro Forge — Sales Analytics Platform',
    accent:      '#38bdf8',
    badge:       'CONFIDENTIAL' as const,
    description: 'Self-service analytics portal for 40+ distributors replacing ₹12L/year Power BI licensing with custom infrastructure.',
    tech:        ['Python', 'PostgreSQL', 'FastAPI', 'React', 'Odoo', 'ChannelKonnect'],
    features:    [
      'Consolidated Odoo ERP + ChannelKonnect data into centralized warehouse',
      'Row-Level Security for distributor-specific data access control',
      'Eliminated ₹12L/year in BI licensing costs',
      'Real-time primary vs secondary sales tracking for 40+ distributors',
    ],
  },
  {
    title:       'Fashion Expo — Mobile Order System',
    accent:      '#f472b6',
    badge:       'CONFIDENTIAL' as const,
    description: 'Full-stack mobile ordering platform built in 5 days, handling 300+ orders across 10+ staff.',
    tech:        ['Flask', 'Python', 'HTML', 'CSS', 'JavaScript', 'Excel', 'Dropbox'],
    features:    [
      'Built in 5 days — handled 300+ orders across 10+ staff',
      'Replaced paper-based workflow end-to-end',
      'Reduced order capture time 85% (12 min → 2 min)',
      'Real-time inventory via Excel/Dropbox sync',
    ],
  },
]

export default function Projects() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 48 }}
        >
          Featured Projects
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background:   '#0c1220',
                border:       `1px solid rgba(255,255,255,0.06)`,
                borderRadius: 12,
                padding:      24,
                borderLeft:   `3px solid ${p.accent}`,
                transition:   'border-color 0.2s, transform 0.2s',
                cursor:       'default',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${p.accent}50` }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)' }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: 17, color: '#f8fafc', lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <div style={{ flexShrink: 0 }}>
                  {p.badge === 'LIVE' ? (
                    <div style={{
                      display:    'inline-flex', alignItems: 'center', gap: 5,
                      background: 'rgba(52,211,153,0.08)',
                      border:     '1px solid rgba(52,211,153,0.3)',
                      borderRadius: 20, padding: '2px 8px',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                      color:      '#34d399',
                    }}>
                      <span className="pulse-dot" style={{
                        display: 'inline-block', width: 5, height: 5,
                        borderRadius: '50%', background: '#34d399',
                      }} />
                      LIVE
                    </div>
                  ) : (
                    <div style={{
                      background:   'rgba(71,85,105,0.15)',
                      border:       '1px solid rgba(71,85,105,0.3)',
                      borderRadius: 20, padding: '2px 8px',
                      fontFamily:   'JetBrains Mono, monospace', fontSize: 9,
                      color:        '#475569',
                    }}>
                      CONFIDENTIAL
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13,
                color: '#94a3b8', lineHeight: 1.6, marginBottom: 14 }}>
                {p.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mb-14">
                {p.tech.map(t => (
                  <span key={t} style={{
                    fontFamily:   'JetBrains Mono, monospace', fontSize: 10,
                    padding:      '3px 8px', borderRadius: 4,
                    background:   'rgba(17,24,39,0.8)',
                    border:       '1px solid rgba(255,255,255,0.06)',
                    color:        '#475569',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span style={{ color: p.accent, flexShrink: 0, marginTop: 1 }}>▹</span>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, color: '#94a3b8' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Links */}
              {'liveUrl' in p || 'github' in p ? (
                <div className="flex gap-3 flex-wrap">
                  {'liveUrl' in p && p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        display:    'inline-flex', alignItems: 'center', gap: 5,
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                        fontSize:   12, padding: '6px 12px', borderRadius: 6,
                        background: `${p.accent}20`, border: `1px solid ${p.accent}40`,
                        color:      p.accent, textDecoration: 'none', transition: 'all 0.2s',
                      }}
                    >
                      <HiExternalLink size={13} /> Live Demo
                    </a>
                  )}
                  {'github' in p && p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{
                        display:    'inline-flex', alignItems: 'center', gap: 5,
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                        fontSize:   12, padding: '6px 12px', borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)',
                        border:     '1px solid rgba(255,255,255,0.08)',
                        color:      '#94a3b8', textDecoration: 'none', transition: 'all 0.2s',
                      }}
                    >
                      <FaGithub size={13} /> GitHub
                    </a>
                  )}
                </div>
              ) : null}

              {'company' in p && p.company && (
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  color: '#475569', marginTop: 4,
                }}>
                  @ {p.company}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
