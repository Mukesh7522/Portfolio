'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiDownload, HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiUser, HiChatAlt2, HiOutlineAnnotation, HiLightningBolt, HiRefresh, HiChartBar } from 'react-icons/hi'
import { FaLinkedin, FaGithub, FaRegStickyNote } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const services = [
  { title: 'Data Pipeline Engineering',  accent: '#38bdf8', icon: HiLightningBolt, desc: 'ETL pipelines, Airflow, PostgreSQL' },
  { title: 'Workflow Automation',        accent: '#34d399', icon: HiRefresh,         desc: 'Python APIs, integrations, Dropbox' },
  { title: 'Analytics Platforms',       accent: '#818cf8', icon: HiChartBar,        desc: 'FastAPI, React dashboards, RLS' },
]

const contactLinks = [
  { icon: HiMail,           label: 'Mukesh7522@gmail.com',      href: 'mailto:Mukesh7522@gmail.com',        color: '#38bdf8' },
  { icon: HiPhone,          label: '+91 9087405606',             href: 'tel:+919087405606',                   color: '#818cf8' },
  { icon: HiLocationMarker, label: 'Tirupur, Tamil Nadu',        href: undefined,                             color: '#34d399' },
  { icon: FaLinkedin,       label: 'LinkedIn',                   href: 'https://linkedin.com/in/mukesh7522', color: '#38bdf8' },
  { icon: FaGithub,         label: 'GitHub',                     href: 'https://github.com/Mukesh7522',      color: '#94a3b8' },
]

export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' })
  const [isSending, setSending] = useState(false)
  const [status, setStatus]     = useState<'idle'|'ok'|'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true); setStatus('idle')
    try {
      await emailjs.send('service_96iydis', 'template_gazls5v',
        { name: form.name, email: form.email, subject: form.subject, message: form.message },
        'wD4uP52QIoHhQRl7e')
      setStatus('ok'); setForm({ name: '', email: '', subject: '', message: '' })
    } catch { setStatus('err') }
    finally  { setSending(false) }
  }

  const fieldWrapper: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
    padding: '0 14px', transition: 'all 0.2s', overflow: 'hidden'
  }

  const field: React.CSSProperties = {
    width: '100%', padding: '14px 0',
    background: 'transparent', border: 'none',
    fontFamily: 'Space Grotesk, sans-serif', fontSize: 13,
    color: '#f8fafc', outline: 'none',
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        {/* Header */}

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)',
            color: '#f8fafc', marginBottom: 48 }}>
          Get In Touch
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* ── LEFT: info ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Open for work - REDESIGNED HORIZONTAL */}
            <div style={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: 24 }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="pulse-dot" style={{ display:'inline-block', width:8, height:8,
                  borderRadius:'50%', background:'#34d399', boxShadow: '0 0 12px #34d399' }} />
                <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11,
                  letterSpacing:'0.12em', color:'#34d399' }}>
                  AVAILABLE FOR FREELANCE &amp; COLLABORATION
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {services.map(s => {
                  const Icon = s.icon;
                  return (
                  <div key={s.title} style={{ display:'flex', flexDirection:'column', alignItems:'flex-start',
                    padding:'16px', background:'rgba(255,255,255,0.02)', position: 'relative',
                    borderRadius:'12px', borderTop:`3px solid ${s.accent}` }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px',
                      background: `linear-gradient(180deg, ${s.accent}15, transparent)`, borderRadius: '12px 12px 0 0' }} />
                    <span style={{ fontSize:26, color: s.accent, marginBottom: 12, display: 'block' }}>
                      <Icon />
                    </span>
                    <p style={{ fontFamily:'Space Grotesk, sans-serif', fontWeight:700,
                      fontSize:14, color:'#f8fafc', marginBottom: 6, lineHeight: 1.3 }}>{s.title}</p>
                    <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11,
                      color:'#94a3b8', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                )})}
              </div>
            </div>

            {/* Contact links */}
            <div style={{ background:'#0c1220', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:16, padding:24 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map(c => {
                const Icon = c.icon
                const Tag  = (c.href ? 'a' : 'div') as React.ElementType
                return (
                  <Tag key={c.label} href={c.href}
                    target={c.href?.startsWith('http') ? '_blank' : undefined}
                    rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group"
                    style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none',
                      cursor: c.href ? 'pointer' : 'default', padding: '12px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.02)',
                      transition: 'all 0.3s', overflow: 'hidden' }}
                    onMouseEnter={(e: any) => { e.currentTarget.style.borderColor = `${c.color}40`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={(e: any) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    <div style={{ background: `${c.color}20`, padding: '10px', borderRadius: '8px', flexShrink: 0,
                      transition: 'transform 0.3s' }} className="group-hover:scale-110">
                      <Icon style={{ color:c.color, width:18, height:18 }} />
                    </div>
                    <span className="truncate" style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:14, fontWeight:500,
                      color:'#e2e8f0', minWidth: 0 }}>{c.label}</span>
                  </Tag>
                )
              })}
            </div>

            {/* Resume */}
            <div className="flex gap-4">
              <a href="/resume.pdf" download="Mukesh_Sridharan_Resume.pdf"
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
                  gap:8, padding:'14px 24px', background:'rgba(56,189,248,0.1)',
                  border:'1px solid rgba(56,189,248,0.4)', borderRadius:10, flex: 1,
                  fontFamily:'Space Grotesk, sans-serif', fontWeight:600, fontSize:14,
                  color:'#38bdf8', textDecoration:'none', transition:'all 0.2s',
                  boxShadow: '0 4px 14px rgba(56,189,248,0.1)' }}>
                <HiDownload size={18}/> Download Full Resume
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: form (REDESIGNED) ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ background:'#0c1220', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:16, padding:32, position: 'relative', overflow: 'hidden' }}>

              {/* Decorative background glow */}
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Form header */}
              <div className="mb-8 pb-4 border-b border-slate-800/60">
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, color: '#f8fafc', marginBottom: 4 }}>
                  Send a Message
                </h3>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, color: '#94a3b8' }}>
                  Have a question or proposal? I'd love to hear from you.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20, position: 'relative', zIndex: 1 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div style={{...fieldWrapper}} className="group focus-within:border-sky-400 focus-within:bg-sky-400/5">
                    <HiUser className="text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18}/>
                    <input type="text" value={form.name} required disabled={isSending}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="Your Name" style={field} />
                  </div>
                  <div style={{...fieldWrapper}} className="group focus-within:border-sky-400 focus-within:bg-sky-400/5">
                    <HiMail className="text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18}/>
                    <input type="email" value={form.email} required disabled={isSending}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="Email Address" style={field} />
                  </div>
                </div>
                
                <div style={{...fieldWrapper}} className="group focus-within:border-sky-400 focus-within:bg-sky-400/5">
                  <HiOutlineAnnotation className="text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18}/>
                  <input type="text" value={form.subject} required disabled={isSending}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    placeholder="Subject line" style={field} />
                </div>

                <div style={{...fieldWrapper, alignItems: 'flex-start', padding: '14px'}} className="group focus-within:border-sky-400 focus-within:bg-sky-400/5">
                  <HiChatAlt2 className="text-slate-500 group-focus-within:text-sky-400 transition-colors mt-1" size={18}/>
                  <textarea value={form.message} required disabled={isSending} rows={5}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Tell me about your project, data pipeline needs, or just say hi..."
                    style={{ ...field, padding: '0', resize:'none', minHeight: '120px' }} />
                </div>

                <button type="submit" disabled={isSending} className="group" style={{
                  display:'flex', alignItems:'center', justifyItems:'center', justifyContent: 'center', gap:10,
                  padding:'16px 24px', width:'100%', marginTop: '8px',
                  background: isSending ? 'rgba(56,189,248,0.2)' : 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  color: isSending ? '#38bdf8' : '#fff',
                  fontFamily:'Space Grotesk, sans-serif', fontWeight:700, fontSize:15, letterSpacing: '1px', textTransform: 'uppercase',
                  borderRadius:8, border:'none', cursor: isSending ? 'not-allowed' : 'pointer',
                  transition:'all 0.3s', boxShadow: isSending ? 'none' : '0 10px 25px -5px rgba(56,189,248,0.4)',
                }}>
                  {isSending ? (
                    <><span style={{ animation:'spin 1s linear infinite', display:'inline-block' }}>⟳</span> INITIATING TRANSFER...</>
                  ) : (
                    <><HiPaperAirplane size={18} style={{ transform:'rotate(90deg)' }} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/> TRANSMIT MESSAGE</>
                  )}
                </button>

                {status === 'ok' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
                    <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:12, color:'#34d399' }}>
                      ✓ Message sequence delivered successfully! I'll be in touch soon.
                    </p>
                  </motion.div>
                )}
                {status === 'err' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
                    <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:12, color:'#f472b6' }}>
                      ✗ Transmission error. Please email me directly at Mukesh7522@gmail.com
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
