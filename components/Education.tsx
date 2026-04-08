'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'

const education = [
  {
    degree:      'Professional Certificate in Data Analytics',
    institution: 'ExcelR Institute',
    location:    'Bengaluru',
    duration:    '08/2023 – 04/2024',
  },
  {
    degree:      'BSc Computer Systems & Design',
    institution: 'PSG College of Technology',
    location:    'Coimbatore',
    duration:    '06/2018 – 05/2021',
  },
]

const certs = [
  {
    name:   'Oracle Cloud Infrastructure 2025 — Data Science Professional',
    url:    'https://catalog-education.oracle.com/pls/certview/sharebadge?id=F3EDA8B5E0979F8BD157C05D73E86D0CF4C7420A255830F31ED9B08E9ABE867',
    accent: '#818cf8',
  },
  {
    name:   'Oracle Database@AWS Certified Associate',
    url:    'https://catalog-education.oracle.com/pls/certview/sharebadge?id=38514B851D339BF77E1C1E11E1615049F66347E7934488D8E28DD6D337291E66',
    accent: '#38bdf8',
  },
  {
    name:   'Google Advanced Data Analytics',
    url:    'https://www.coursera.org/account/accomplishments/professional-cert/G4HHDKNAADRP',
    accent: '#34d399',
  },
  {
    name:   'Linux Command Line Fundamentals',
    url:    'https://www.udemy.com/certificate/UC-8c863bfa-605c-42d8-92d2-e5b13be02c45/',
    accent: '#f472b6',
  },
]

export default function Education() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 48 }}
        >
          Education &amp; Certifications
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              letterSpacing: '0.12em', color: 'rgba(56,189,248,0.6)', marginBottom: 20 }}>
              {'DEGREES'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  style={{
                    borderLeft: '2px solid rgba(56,189,248,0.3)',
                    paddingLeft: 20,
                  }}
                >
                  <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
                    fontSize: 16, color: '#f8fafc', marginBottom: 4 }}>
                    {edu.degree}
                  </h4>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
                    fontSize: 14, color: '#38bdf8', marginBottom: 2 }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                    color: '#475569' }}>
                    {edu.location} · {edu.duration}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              letterSpacing: '0.12em', color: 'rgba(56,189,248,0.6)', marginBottom: 20 }}>
              {'CERTIFICATIONS'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {certs.map((cert, i) => (
                <motion.a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display:      'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap:          12, padding: '12px 14px',
                    background:   '#0c1220',
                    border:       `1px solid ${cert.accent}20`,
                    borderLeft:   `3px solid ${cert.accent}`,
                    borderRadius: 8,
                    textDecoration: 'none',
                    transition:   'all 0.2s',
                    cursor:       'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}50`
                    ;(e.currentTarget as HTMLElement).style.background  = `${cert.accent}0a`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor  = `${cert.accent}20`
                    ;(e.currentTarget as HTMLElement).style.borderLeftColor = cert.accent
                    ;(e.currentTarget as HTMLElement).style.background  = '#0c1220'
                  }}
                >
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
                    fontSize: 13, color: '#94a3b8', lineHeight: 1.4 }}>
                    {cert.name}
                  </p>
                  <HiExternalLink style={{ color: cert.accent, flexShrink: 0, width: 14, height: 14 }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
