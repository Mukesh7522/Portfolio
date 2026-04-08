'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { HiChevronDown, HiDownload } from 'react-icons/hi'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

const socials = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mukesh7522', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/Mukesh7522',       label: 'GitHub'   },
  { icon: MdEmail,    href: 'mailto:Mukesh7522@gmail.com',          label: 'Email'    },
]

const fade = (delay: number) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* 3D background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full container-custom text-center" style={{ paddingTop: 80 }}>
        {/* Available label */}
        <motion.div {...fade(0)} className="inline-flex items-center gap-2 mb-6">
          <span
            className="pulse-dot"
            style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#34d399' }}
          />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            letterSpacing: '0.15em', color: 'rgba(56,189,248,0.8)',
          }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fade(0.1)}
          className="gradient-text mb-3"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.05 }}
        >
          <span className="text-5xl md:text-7xl">MUKESH SRIDHARAN</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          {...fade(0.2)}
          className="mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
            fontSize: 'clamp(18px, 3vw, 24px)', color: '#94a3b8', letterSpacing: '0.08em' }}
        >
          DATA ENGINEER
        </motion.p>

        {/* Tagline */}
        <motion.p
          {...fade(0.3)}
          className="mx-auto mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400,
            fontSize: 16, color: '#475569', maxWidth: 520, lineHeight: 1.6 }}
        >
          Data Engineering &amp; Orchestration Specialist
          <br />Building Production-Grade Pipelines
        </motion.p>

        {/* Bio */}
        <motion.p
          {...fade(0.35)}
          className="mx-auto mb-8"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400,
            fontSize: 15, color: '#475569', maxWidth: 480, lineHeight: 1.7 }}
        >
          Architecting unified data warehouses and self-service analytics
          platforms delivering significant annual cost savings.
        </motion.p>

        {/* Stat bar */}
        <motion.div
          {...fade(0.4)}
          className="inline-flex items-center gap-0 mb-8"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            background: 'rgba(12,18,32,0.6)',
            border:     '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding:    '10px 24px',
          }}
        >
          {[
            { val: '30M+', label: 'Records'  },
            { val: '₹12L', label: 'Saved'    },
            { val: '13+',  label: 'Platforms' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <span style={{ margin: '0 20px', color: 'rgba(255,255,255,0.1)', fontSize: 18 }}>|</span>
              )}
              <div className="flex flex-col items-center">
                <span style={{ fontSize: 16, fontWeight: 600, color: '#f8fafc' }}>{s.val}</span>
                <span style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div {...fade(0.5)} className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => goto('projects')}
            style={{
              background: '#38bdf8', color: '#030712',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              fontSize: 14, padding: '10px 24px', borderRadius: 8,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#7dd3fc')}
            onMouseLeave={e => (e.currentTarget.style.background = '#38bdf8')}
          >
            View Projects
          </button>

          <a
            href="/resume.pdf"
            download="Mukesh_Sridharan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:    'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              fontSize:   14, padding: '10px 24px', borderRadius: 8,
              border:     '1px solid rgba(56,189,248,0.4)', color: '#38bdf8',
              background: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
              textDecoration: 'none',
            }}
          >
            <HiDownload size={16} />
            Download Resume
          </a>

          <button
            onClick={() => goto('contact')}
            style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
              fontSize:   14, padding: '10px 24px', borderRadius: 8,
              border:     '1px solid rgba(255,255,255,0.08)', color: '#94a3b8',
              background: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fade(0.6)} className="flex justify-center gap-3 mb-12">
          {socials.map(s => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  display:     'flex', alignItems: 'center', justifyContent: 'center',
                  width:       36, height: 36, borderRadius: '50%',
                  border:      '1px solid rgba(255,255,255,0.08)',
                  color:       '#475569', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color       = '#38bdf8'
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color       = '#475569'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <Icon size={16} />
              </a>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="bounce-slow" style={{ color: '#475569' }}>
          <HiChevronDown size={24} />
        </div>
      </motion.div>
    </section>
  )
}
