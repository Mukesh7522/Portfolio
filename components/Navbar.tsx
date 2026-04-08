'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const navItems = [
  { name: 'About',       href: '#about'       },
  { name: 'Skills',      href: '#skills'      },
  { name: 'Experience',  href: '#experience'  },
  { name: 'Projects',    href: '#projects'    },
  { name: 'Achievements',href: '#achievements'},
  { name: 'Contact',     href: '#contact'     },
]

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection,    setActiveSection]    = useState('')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const current = navItems.find(item => {
        const el = document.getElementById(item.href.slice(1))
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= 120 && r.bottom >= 120
      })
      setActiveSection(current?.href.slice(1) ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (href: string) => {
    setIsMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          padding:         isScrolled ? '12px 0' : '20px 0',
          backgroundColor: isScrolled ? 'rgba(3,7,18,0.85)' : 'transparent',
          backdropFilter:  isScrolled ? 'blur(16px)' : 'none',
          borderBottom:    isScrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="gradient-text text-2xl"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MS
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => { e.preventDefault(); goto(item.href) }}
                  className="relative text-sm transition-colors duration-200"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    color:      isActive ? '#38bdf8' : '#94a3b8',
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0"
                      style={{ height: 1, background: '#38bdf8' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden transition-colors"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ color: '#94a3b8' }}
          >
            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-40 w-64 md:hidden"
              style={{
                background:   'rgba(12,18,32,0.98)',
                backdropFilter: 'blur(20px)',
                borderLeft:   '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex flex-col pt-24 px-8 gap-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={e => { e.preventDefault(); goto(item.href) }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize:   18,
                      color:      activeSection === item.href.slice(1) ? '#38bdf8' : '#94a3b8',
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
