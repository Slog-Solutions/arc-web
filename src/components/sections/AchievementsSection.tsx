// src/components/sections/AchievementsSection.tsx
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { Achievement } from '../../types';

interface Props {
  achievements: Achievement[];
  highlights?: { label: string; value: string }[];
}

export default function AchievementsSection({ achievements, highlights }: Props) {
  const categories = Array.from(new Set(achievements.map(a => a.category)));

  return (
    <section id="achievements" className="relative py-24 section-pattern">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Honour Roll"
          title="Achievements"
          subtitle="A chronicle of gallantry, operational excellence, and service to the nation spanning decades of devotion."
        />

        {/* Medal showcase row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {['🎖️ Param Vir Chakra', '⭐ Ashoka Chakra', '🏆 Mahavir Chakra', '🎗️ Vir Chakra', '🏅 Sena Medal', '🌟 Vishisht Seva Medal'].map((medal, i) => (
            <div
              key={i}
              className="medal-shine px-4 py-2 rounded-full text-sm font-inter text-stone-300 border border-yellow-700/25"
              style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(30,47,14,0.5) 100%)',
              }}
            >
              {medal}
            </div>
          ))}
        </motion.div>

        {/* Stats if provided */}
        {highlights && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl border"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.06) 0%, rgba(20,26,13,0.8) 100%)',
                  borderColor: 'rgba(212,160,23,0.2)',
                }}
              >
                <div className="font-cinzel text-3xl text-gold-gradient mb-1">{h.value}</div>
                <div className="font-inter text-xs text-stone-500 uppercase tracking-widest">{h.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Category tabs + cards */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-yellow-700/50" />
                <span className="font-cinzel text-yellow-600/80 text-xs tracking-[0.3em] uppercase">{cat}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-yellow-700/30 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {achievements.filter(a => a.category === cat).map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="heritage-card rounded-xl p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-cinzel text-stone-100 text-base group-hover:text-yellow-400 transition-colors duration-300">
                            {achievement.title}
                          </h4>
                          <span className="text-xs font-inter text-stone-500 flex-shrink-0 border border-stone-700/50 px-2 py-0.5 rounded">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="font-garamond text-stone-400 text-sm leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Historic photo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 rounded-xl overflow-hidden relative"
          style={{ height: '300px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80"
            alt="Historic military ceremony"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay-dark flex items-center justify-center">
            <div className="text-center">
              <div className="font-cinzel text-yellow-500/80 text-xs tracking-widest uppercase mb-2">In Memoriam</div>
              <div className="font-garamond text-stone-200 text-2xl md:text-3xl italic">
                "Their names shall live for evermore."
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
