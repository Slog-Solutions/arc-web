// src/components/sections/AchievementsSection.tsx - REFINED
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
    <section id="achievements" className="relative section-xl section-pattern">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Honour Roll"
          title="Achievements"
          subtitle="A chronicle of gallantry, operational excellence, and service to the nation spanning decades of devotion."
        />

        {/* Medal shine badge row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-20"
        >
          {[
            '🎖️ Param Vir Chakra',
            '⭐ Ashoka Chakra',
            '🏆 Mahavir Chakra',
            '🎗️ Vir Chakra',
            '🏅 Sena Medal',
            '🌟 Vishisht Seva Medal'
          ].map((medal, i) => (
            <div
              key={i}
              className="medal-shine px-5 py-2.5 rounded-full text-xs font-inter uppercase tracking-widest text-stone-300 border border-yellow-700/25 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.08) 0%, rgba(30,47,14,0.4) 100%)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {medal}
            </div>
          ))}
        </motion.div>

        {/* Statistics Grid */}
        {highlights && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center p-8 rounded-2xl border flex flex-col justify-center items-center shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.05) 0%, rgba(20,26,13,0.85) 100%)',
                  borderColor: 'rgba(212,160,23,0.22)',
                }}
              >
                <div className="font-cinzel text-4xl md:text-5xl text-gold-gradient mb-2 font-bold leading-none">{h.value}</div>
                <div className="font-inter text-[10px] text-stone-500 uppercase tracking-widest mt-1">{h.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Categories and Cards */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-10 bg-yellow-500/50 rounded-full" />
                <span className="font-cinzel text-yellow-500/90 text-sm tracking-[0.25em] uppercase">{cat}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-yellow-700/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements
                  .filter(a => a.category === cat)
                  .map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="heritage-card rounded-2xl p-6 md:p-8 hover-lift"
                    >
                      <div className="flex items-start gap-5">
                        <div className="text-4xl flex-shrink-0 bg-yellow-500/5 w-14 h-14 rounded-xl flex items-center justify-center border border-yellow-500/10">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-cinzel text-stone-100 text-base md:text-lg group-hover:text-yellow-400 transition-colors duration-300">
                              {achievement.title}
                            </h4>
                            <span className="text-[10px] font-inter text-stone-500 border border-stone-700/50 px-2.5 py-0.5 rounded-full flex-shrink-0">
                              {achievement.year}
                            </span>
                          </div>
                          <p className="font-garamond text-stone-400 text-base leading-relaxed">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Real Historic photo strip at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 rounded-2xl overflow-hidden relative shadow-2xl"
          style={{ height: '320px' }}
        >
          <img
            src="/assami/Assam Regimental Centre/arc-passing-out-parade.jpg"
            alt="Historic military ceremony"
            className="w-full h-full object-cover filter contrast-[1.02]"
          />
          <div className="absolute inset-0 hero-overlay-dark flex items-center justify-center px-6 text-center">
            <div>
              <div className="font-cinzel text-yellow-500/80 text-[11px] tracking-[0.3em] uppercase mb-3">In Memoriam</div>
              <div className="font-garamond text-stone-200 text-2xl md:text-3xl italic max-w-2xl leading-relaxed">
                "Their names shall live for evermore."
              </div>
              <div className="h-px w-24 bg-yellow-500/30 mx-auto mt-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
