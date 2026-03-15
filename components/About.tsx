'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiDatabase, HiClock, HiCheckCircle, HiLightningBolt } from 'react-icons/hi';

const stats = [
  {
    icon: HiDatabase,
    value: '100K+',
    label: 'Records Processed Monthly',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: HiClock,
    value: '75%',
    label: 'Time Reduction Through Automation',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: HiCheckCircle,
    value: '99.5%',
    label: 'Data Accuracy',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: HiLightningBolt,
    value: '₹12L+',
    label: 'Annual Cost Savings',
    color: 'from-primary-400 to-secondary-400',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              Analytics Engineer with strong data engineering experience building production-grade data
              pipelines, multi-source ETL systems, and full-stack analytics platforms. I've architected
              unified PostgreSQL data warehouses consolidating 30M+ records across multiple channels.
            </p>
            <p>
              Delivered ₹12L+ in annual cost savings by replacing legacy BI tooling with custom
              self-service analytics platforms, while building 40+ success-critical performance
              dashboards that reduced analytics support requests by ~60%.
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Location:</span> Tirupur, Tamil Nadu, India
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="glass-strong p-6 rounded-xl hover-lift group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

