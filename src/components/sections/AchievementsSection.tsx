// src/components/sections/AchievementsSection.tsx - REFINED (Hall of Honour Layout)
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { Achievement } from '../../types';

interface Props {
  achievements: Achievement[];
  highlights?: { label: string; value: string }[];
}

export default function AchievementsSection({ achievements, highlights }: Props) {
  const categories = Array.from(new Set(achievements.map(a => a.category)));
  const featuredAchievement = achievements[0]; // First achievement acts as featured

  return (
    <section id="achievements" className="relative py-32 museum-room-wall spotlight-glow">
      <div className="museum-container">
        
        {/* Section Header */}
        <SectionHeader
          tag="Hall of Valour"
          title="Hall of Honour"
          subtitle="Honouring military excellence, gallantry decorations, and campaign awards earned through supreme sacrifice."
        />

        {/* ── Visual Medal Cabinet Showcase ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
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
              className="brass-plate text-xs font-bold px-5 py-2.5 shadow-lg flex items-center gap-2"
            >
              <span>{medal}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Featured Achievement Showcase (Entrance Plaque) ── */}
        {featuredAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="museum-wood-frame brass-corners rounded-2xl p-8 md:p-10 mb-20 bg-gradient-to-br from-[#1b2512] to-[#0a0c08] shadow-2xl relative"
          >
            <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-500 text-[9px] tracking-widest uppercase px-3 py-1 rounded border border-yellow-500/20">
              Featured Honour
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-yellow-500/10 border-2 border-yellow-500/30 text-5xl">
                {featuredAchievement.icon}
              </div>
              <div className="flex-1">
                <span className="font-inter text-yellow-600/80 text-[10px] tracking-widest uppercase mb-1.5 block">
                  {featuredAchievement.category} · Year: {featuredAchievement.year}
                </span>
                <h3 className="font-cinzel text-stone-100 text-2xl font-bold leading-tight mb-3">
                  {featuredAchievement.title}
                </h3>
                <p className="font-garamond text-stone-300 text-base md:text-lg leading-relaxed max-w-4xl italic">
                  {featuredAchievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Integrated Stats Highlights ── */}
        {highlights && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center p-8 rounded-2xl border flex flex-col justify-center items-center shadow-xl bg-gradient-to-b from-[#141a0d] to-[#080a06] border-[#2b1d0c]"
              >
                <div className="font-cinzel text-4xl md:text-5xl text-gold-gradient mb-2 font-bold leading-none">{h.value}</div>
                <div className="font-inter text-[10px] text-stone-500 uppercase tracking-widest mt-1">{h.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Grid Layout of Campaign Honours & Awards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((cat) => (
            <div key={cat} className="space-y-6">
              
              {/* Campaign header plaque */}
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-10 bg-yellow-500/50 rounded-full" />
                <span className="font-cinzel text-yellow-500/90 text-sm tracking-[0.25em] uppercase font-bold">{cat}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-yellow-700/20 to-transparent" />
              </div>

              <div className="space-y-6">
                {achievements
                  .filter(a => a.category === cat)
                  .map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="museum-wood-frame brass-corners rounded-2xl p-6 hover-lift relative bg-[#0f140a]"
                    >
                      <div className="flex items-start gap-6">
                        <div className="text-4xl flex-shrink-0 bg-yellow-500/5 w-14 h-14 rounded-xl flex items-center justify-center border border-yellow-500/10">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h4 className="font-cinzel text-stone-100 text-base md:text-lg font-bold">
                              {achievement.title}
                            </h4>
                            <span className="brass-plate text-[9px] px-2 py-0.5 font-bold flex-shrink-0">
                              {achievement.year}
                            </span>
                          </div>
                          <p className="font-garamond text-stone-400 text-sm leading-relaxed italic">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Historic Parade photo strip at bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-28 rounded-2xl overflow-hidden relative shadow-2xl border-4 border-[#2b1d0c]"
          style={{ height: '360px' }}
        >
          <img
            src="/assami/Assam Regimental Centre/arc-passing-out-parade.jpg"
            alt="Historic military ceremony"
            className="w-full h-full object-cover filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center px-6 text-center">
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
