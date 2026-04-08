'use client'

import { useEffect } from 'react'
import Navbar      from '@/components/Navbar'
import Hero        from '@/components/Hero'
import About       from '@/components/About'
import Skills      from '@/components/Skills'
import Experience  from '@/components/Experience'
import Projects    from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Education   from '@/components/Education'
import Contact     from '@/components/Contact'
import Footer      from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0
      const bar   = document.getElementById('scroll-progress')
      if (bar) bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="relative" style={{ backgroundColor: '#030712' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
