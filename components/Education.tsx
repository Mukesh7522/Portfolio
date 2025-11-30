'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBadgeCheck } from 'react-icons/hi';

const education = [
  {
    degree: 'Data Analytics',
    institution: 'ExcelR Institute',
    location: 'Bengaluru',
    duration: '08/2023 – 04/2024',
  },
  {
    degree: 'BSc Computer Systems & Design',
    institution: 'PSG College of Technology',
    location: 'Coimbatore',
    duration: '06/2018 – 05/2021',
  },
];

const certifications = [
  {
    name: 'Google Advanced Data Analytics',
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/G4HHDKNAADRP',
  },
  {
    name: 'Oracle Database@AWS Certificate Architect Professional',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=38514B851D339BF77E1C1E11E1615049F66347E7934488D8E28DD6D337291E66',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Data Science Professional',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=F3EDA8B5E0979F8BD157C05D73E86D0CF4C7420A255830F31ED9B08E9ABE867',
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            <span className="gradient-text">Education & Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-strong p-8 rounded-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <HiAcademicCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  className="border-l-2 border-primary-500/50 pl-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-1">{edu.degree}</h4>
                  <p className="text-primary-400 font-medium mb-1">{edu.institution}</p>
                  <p className="text-gray-400 text-sm mb-1">{edu.location}</p>
                  <p className="text-gray-500 text-sm">{edu.duration}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-strong p-8 rounded-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-teal-500 to-green-500">
                <HiBadgeCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                  className="flex items-start gap-3 p-4 glass rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <HiBadgeCheck className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 group-hover:text-white transition-colors">{cert.name}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

