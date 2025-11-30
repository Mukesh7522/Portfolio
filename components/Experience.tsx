'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';

const experiences = [
  {
    title: 'Data Analyst',
    company: 'Technosport',
    location: 'Tirupur',
    duration: '07/2024 – Present',
    achievements: [
      {
        heading: 'Architected End-to-End Reporting Pipeline',
        description:
          'Built production data workflow extracting 100K+ monthly transactional records from Odoo ERP, transforming raw data using Python/Pandas in Jupyter, and delivering 15+ executive dashboards in Power BI that reduced decision-making cycles by 50% through real-time operational visibility.',
      },
      {
        heading: 'Eliminated 30+ Hours/Week Through Intelligent Automation',
        description:
          'Identified critical bottlenecks in manual reporting processes and deployed 10+ Python automation scripts with Task Scheduler orchestration, achieving 75% time reduction and 99.5% data accuracy while enabling team to focus on strategic analysis over repetitive tasks.',
      },
    ],
    side: 'left',
  },
  {
    title: 'Data Analyst Intern',
    company: 'ExcelR',
    location: 'Bengaluru',
    duration: '07/2023 – 04/2024',
    description:
      'Executed SQL queries, cleaned and transformed data using Python, and maintained Tableau/Power BI dashboards to ensure accurate insights for weekly business reviews, while independently handling ad-hoc Excel analysis and rapidly mastering Power Query & DAX to build versatile end-to-end analytics capabilities.',
    side: 'right',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            <span className="gradient-text">Professional Experience</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-teal-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.duration}`}
                initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-4 border-[#0a0a0a] z-10" />
                </div>

                {/* Content Card */}
                <div
                  className={`glass-strong p-6 md:p-8 rounded-xl hover-lift ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:w-[48%]' : 'md:ml-auto md:w-[48%]'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                      <HiBriefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-primary-400 font-semibold mb-1">{exp.company}</p>
                      <p className="text-gray-400 text-sm">
                        {exp.duration} • {exp.location}
                      </p>
                    </div>
                  </div>

                  {exp.achievements ? (
                    <div className="space-y-4 mt-6">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="border-l-2 border-primary-500/50 pl-4">
                          <h4 className="font-semibold text-white mb-2">{achievement.heading}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed mt-4">{exp.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

