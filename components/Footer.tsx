'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const socials = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mukesh7522', label: 'LinkedIn' },
  { icon: FaGithub,   href: 'https://github.com/Mukesh7522',       label: 'GitHub'   },
  { icon: MdEmail,    href: 'mailto:Mukesh7522@gmail.com',          label: 'Email'    },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p style={{
            fontFamily:  'JetBrains Mono, monospace', fontSize: 12,
            color:       '#475569', textAlign: 'center',
          }}>
            © {new Date().getFullYear()} Mukesh Sridharan. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(s => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: '#475569', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#38bdf8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#475569' }}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
