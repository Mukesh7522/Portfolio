'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiDatabase,
  HiCode,
  HiChartBar,
  HiChartPie,
} from 'react-icons/hi';

const skillCategories = [
  {
    icon: HiDatabase,
    title: 'Data Engineering & Orchestration',
    skills: [
      'Apache Airflow',
      'Docker',
      'FastAPI',
      'REST APIs',
      'Dropbox API',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: HiCode,
    title: 'Languages & Transformation',
    skills: [
      'Python (Pandas, ETL automation)',
      'SQL (CTEs, window functions, indexing)',
      'dbt (in progress)',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: HiChartPie,
    title: 'Databases & Modeling',
    skills: [
      'PostgreSQL (schemas, materialized views, RLS)',
      'MySQL',
      'Star schema, dimensional modeling',
      'Raw → Clean → Analytics layer architecture',
    ],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: HiChartBar,
    title: 'DevOps & Infrastructure',
    skills: [
      'Linux',
      'Git',
      'GitHub Actions',
      'Docker',
      'RDP server deployment',
      'Slack monitoring',
    ],
    gradient: 'from-teal-500 to-green-500',
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="glass-strong p-8 rounded-xl hover-lift group"
              >
                <div
                  className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${category.gradient} mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="flex items-start gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{
                        delay: (index * 0.15) + (skillIndex * 0.05) + 0.3,
                        duration: 0.5,
                      }}
                    >
                      <span className="text-primary-400 mt-1">▹</span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

