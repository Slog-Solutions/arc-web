// src/components/sections/AchievementsSection.tsx
import { motion } from 'framer-motion';
import type { Achievement } from '../../types';

interface Props {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: Props) {
  return (
    <section className="relative py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            className="museum-wood-frame brass-corners rounded-xl overflow-hidden p-6 flex flex-col hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] transition-all duration-300 transform hover:-translate-y-1.5"
          >
            {/* Case Background Spotlight Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/[0.02] to-transparent pointer-events-none" />

            {/* Medal Icon Showcase */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(212,160,23,0.1)] text-2xl filter drop-shadow-md">
                {achievement.icon || '🎖️'}
              </div>
              <span className="font-inter text-[10px] text-yellow-500/80 tracking-widest uppercase px-2.5 py-1 bg-yellow-500/[0.08] border border-yellow-500/20 rounded">
                {achievement.year}
              </span>
            </div>

            {/* Badge Category */}
            <div className="font-inter text-[9px] text-[#d4a017]/70 tracking-widest uppercase mb-2">
              {achievement.category}
            </div>

            {/* Title */}
            <h3 className="font-cinzel text-stone-100 text-lg md:text-xl mb-3 font-semibold group-hover:text-yellow-400 transition-colors duration-300">
              {achievement.title}
            </h3>

            {/* Description */}
            <p className="font-garamond text-stone-400 text-sm md:text-base leading-relaxed flex-grow">
              {achievement.description}
            </p>

            {/* Small subtle exhibit identifier at bottom right */}
            <div className="mt-4 text-right">
              <span className="font-inter text-[8px] text-stone-600 tracking-wider uppercase">
                Record #{idx + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
