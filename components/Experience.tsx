'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    title:    'Data Analyst',
    company:  'Technosport',
    companyColor: '#38bdf8',
    period:   '07/2024 – Present',
    location: 'Tirupur',
    tag:      'CURRENT',
    side:     'right',
    achievements: [
      {
        heading: 'Architected Unified PostgreSQL Data Warehouse',
        desc:    'Designed and owned a PostgreSQL data warehouse processing 30M+ records across B2B (Odoo) and D2C (Amazon, Myntra, 13+ platforms). Implemented raw → clean → analytics materialized view architecture.',
      },
      {
        heading: 'Automated Multi-Source ETL Ecosystem',
        desc:    'Built Python pipelines ingesting 200+ files per cycle from Dropbox APIs, orchestrated via Apache Airflow + Docker with Slack failure alerts.',
      },
      {
        heading: 'Internal Analytics Platform',
        desc:    'Engineered FastAPI + React analytics portal with 5 executive dashboards covering B2B vs D2C, Inventory, and Product Catalog.',
      },
      {
        heading: 'Cost Savings & Efficiency',
        desc:    'Reduced BI licensing costs by ₹12L/year. Cut analytics support requests by 60%.',
      },
    ],
  },
  {
    title:    'Data Analyst Intern',
    company:  'ExcelR',
    companyColor: '#818cf8',
    period:   '07/2023 – 04/2024',
    location: 'Bengaluru',
    tag:      null,
    side:     'left',
    description:
      'Wrote complex SQL queries and performed Python-based data cleaning. Built Power BI and Tableau dashboards using DAX and Power Query for end-to-end business reporting.',
  },
]

export default function Experience() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 56 }}
        >
          Professional Experience
        </motion.h2>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Timeline line — desktop only */}
          <div
            className="hidden md:block absolute"
            style={{
              left:       '50%', top: 0, bottom: 0, width: 1,
              background: 'linear-gradient(to bottom, #38bdf8, #818cf8, #34d399)',
              transform:  'translateX(-50%)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: exp.side === 'right' ? 40 : -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="relative flex items-start md:items-center"
              >
                {/* Timeline dot — desktop */}
                <div
                  className="hidden md:block absolute"
                  style={{
                    left:       '50%', top: '50%',
                    transform:  'translate(-50%, -50%)',
                    width:      12, height: 12, borderRadius: '50%',
                    background: exp.companyColor,
                    border:     '3px solid #030712',
                    zIndex:     2,
                  }}
                />

                {/* Spacer for left side */}
                {exp.side === 'right' && <div className="hidden md:block md:w-[48%]" />}

                {/* Card */}
                <div
                  className="card w-full md:w-[48%]"
                  style={{ padding: 28, marginLeft: exp.side === 'right' ? 0 : undefined }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: 16 }}>
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700,
                          fontSize: 20, color: '#f8fafc', marginBottom: 4 }}>
                          {exp.title}
                        </h3>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                          fontSize: 15, color: exp.companyColor, marginBottom: 4 }}>
                          {exp.company}
                        </p>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                          color: '#475569' }}>
                          {exp.period} · {exp.location}
                        </p>
                      </div>
                      {exp.tag && (
                        <div style={{
                          display:       'inline-flex', alignItems: 'center', gap: 5,
                          background:    'rgba(52,211,153,0.08)',
                          border:        '1px solid rgba(52,211,153,0.3)',
                          borderRadius:  20, padding: '3px 10px',
                          fontFamily:    'JetBrains Mono, monospace', fontSize: 10,
                          color:         '#34d399',
                        }}>
                          <span className="pulse-dot" style={{
                            display: 'inline-block', width: 6, height: 6,
                            borderRadius: '50%', background: '#34d399',
                          }} />
                          {exp.tag}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Achievements */}
                  {'achievements' in exp && exp.achievements ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {exp.achievements.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            borderLeft: `2px solid ${exp.companyColor}50`,
                            paddingLeft: 12,
                          }}
                        >
                          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                            fontSize: 13, color: '#f8fafc', marginBottom: 4 }}>
                            {a.heading}
                          </p>
                          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13,
                            color: '#94a3b8', lineHeight: 1.6 }}>
                            {a.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14,
                      color: '#94a3b8', lineHeight: 1.7 }}>
                      {'description' in exp ? exp.description : null}
                    </p>
                  )}
                </div>

                {/* Spacer for right side */}
                {exp.side === 'left' && <div className="hidden md:block md:w-[48%]" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
