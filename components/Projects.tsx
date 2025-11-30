'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Real-Time Stock Market Analytics Platform',
    description:
      'Production-grade financial dashboard analyzing 26 stocks with 10 years of historical data (500K+ records)',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'yFinance API', 'GitHub Actions', 'Vercel'],
    features: [
      'Real-time market feeds with 5 interactive modules',
      'Automated ETL pipeline with 15+ technical indicators (RSI, MACD, Bollinger Bands)',
      'ML forecasting models (LSTM, ARIMA, Prophet)',
      'Star schema database with 18 tables, 2M+ records',
      'Sub-200ms API response times',
      'CI/CD automation with Row-Level Security',
    ],
    github: 'https://github.com/Mukesh7522/stock-market-analytics',
    liveUrl: 'https://mukesh-tradingdb.vercel.app/',
    isPublic: true,
  },
  {
    title: 'Street Fighter Showdown Selector',
    description:
      'Interactive Power BI dashboard for Street Fighter 6 featuring advanced data visualization techniques with custom SVG integration, enabling dynamic character exploration and comparison',
    tech: ['Power BI', 'DAX', 'Custom SVG', 'Power Query', 'Data Modeling'],
    features: [
      'Interactive character selection dashboard with 20+ Street Fighter 6 characters',
      'Dynamic character profiles displaying stats (Height, Weight, Difficulty, Likes)',
      'Custom SVG visuals with conditional formatting for enhanced storytelling',
      'Character grid layout with filtering and sorting capabilities',
      'Advanced DAX calculations for real-time data interactions',
      'Responsive design with adaptive visualizations based on user selections',
      'Color-coded character portraits with grayscale-to-color transitions',
    ],
    github: null,
    liveUrl: 'https://www.linkedin.com/posts/mukesh7522_powerbi-datavisualization-gaming-activity-7208125094479503360-TCNs?utm_source=share&utm_medium=member_desktop&rcm=ACoAADX9JzUBq0JlLyjK6oA-iB39cYm-TUhBsqI',
    isPublic: true,
  },
  {
    title: 'Fashion Expo - Rapid Mobile Order System',
    description:
      'Full-stack mobile ordering platform digitizing paper-based sales workflow for multi-zone expo event',
    tech: ['Flask', 'Python', 'HTML', 'CSS', 'JavaScript', 'Excel', 'Dropbox'],
    features: [
      'Engineered in 5 days for 10+ staff handling 300+ orders',
      'Reduced order documentation time by 85% (12 min → 2 min per order)',
      'Automated order capture with instant product search and cart management',
      'Real-time inventory visibility via Excel/Dropbox sync',
      'Automatic Order ID generation with downloadable wholesale summaries',
    ],
    company: 'Technosport',
    isPublic: false,
  },
  {
    title: 'Distro Forge - RLS-Powered Data Platform',
    description:
      'Custom self-service data portal replacing legacy BI solution, eliminating ₹12 lakh in annual licensing costs',
    tech: ['Python', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'Odoo', 'ChannelKonnect'],
    features: [
      'Secure portal for 40+ distributors with personalized dashboards',
      'Consolidated primary and secondary sales through automated Python ETL',
      'Enterprise-grade Row-Level Security (RLS) with credential-based access',
      'Unified PostgreSQL database replacing disparate systems',
      'Centralized data governance with zero data exposure risks',
    ],
    company: 'Technosport',
    isPublic: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            <span className="gradient-text">Featured Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="glass-strong p-6 rounded-xl hover-lift group relative overflow-hidden"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full border border-primary-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 mb-6">
                {project.features.map((feature, featIndex) => (
                  <li key={featIndex} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-primary-400 mt-1">▹</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {project.isPublic && (
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project.title === 'Street Fighter Showdown Selector' ? 'View Demo' : 'View Live Demo'}
                      <HiExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="w-5 h-5" />
                      View on GitHub
                      <HiExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              )}

              {!project.isPublic && (
                <div className="flex items-center justify-end gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg font-semibold text-gray-400">
                    <HiCode className="w-5 h-5" />
                    Confidential Project
                  </div>
                  {project.company && (
                    <span className="px-3 py-2 bg-secondary-500/20 text-secondary-400 text-xs font-semibold rounded-full border border-secondary-500/30">
                      Company Project
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

