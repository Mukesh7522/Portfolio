'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiDatabase,
  HiClock,
  HiCheckCircle,
} from 'react-icons/hi';

const achievements = [
  {
    icon: HiDatabase,
    value: 100000,
    suffix: '+',
    label: 'Monthly Records Processed',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: HiClock,
    value: 75,
    suffix: '%',
    label: 'Time Reduction',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: HiCheckCircle,
    value: 99.5,
    suffix: '%',
    label: 'Data Accuracy',
    color: 'from-teal-500 to-green-500',
  },
];

const CounterAnimation = ({
  value,
  suffix = '',
  isInView,
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const step = value / (duration * 60); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        // For decimals, use toFixed(1), for integers use floor
        if (value % 1 !== 0) {
          setCount(parseFloat(current.toFixed(1)));
        } else {
          setCount(Math.floor(current));
        }
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const formatValue = (val: number) => {
    // Handle 100K case
    if (val >= 100000) {
      const thousands = Math.floor(val / 1000);
      return thousands.toString() + 'K';
    }
    // Handle other thousands
    if (val >= 1000) {
      const thousands = val / 1000;
      return thousands.toFixed(thousands % 1 === 0 ? 0 : 1) + 'K';
    }
    // Handle decimals and integers
    return val.toFixed(val % 1 === 0 ? 0 : 1);
  };

  return (
    <span>
      {formatValue(count)}
      {suffix}
    </span>
  );
};

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center">
            <span className="gradient-text">Key Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                className="glass-strong p-8 rounded-xl hover-lift text-center group"
              >
                <div
                  className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 h-16 flex items-center justify-center">
                  <CounterAnimation
                    value={achievement.value}
                    suffix={achievement.suffix}
                    isInView={isInView}
                  />
                </div>
                <p className="text-gray-400 text-sm">{achievement.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Achievements Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="glass p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
              Impact Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">✓</span>
                <span>Eliminated 30+ hours/week through intelligent automation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">✓</span>
                <span>Built 15+ executive Power BI dashboards</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">✓</span>
                <span>Deployed 10+ Python automation scripts</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">✓</span>
                <span>Processed 500K+ stock market records</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

