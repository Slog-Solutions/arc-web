import { motion } from 'framer-motion';
import type { Achievement } from '../../types';

interface Props {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: Props) {
  if (!achievements?.length) return null;

  // Decide grid columns based on count
  const count = achievements.length;
  const gridCols =
    count === 1
      ? 'lg:grid-cols-1 max-w-2xl'
      : count === 2
      ? 'lg:grid-cols-2 max-w-5xl'
      : 'lg:grid-cols-3 max-w-7xl';

  return (
    <section className="pt-16 mt-16 md:mt-24 relative flex flex-col items-center justify-center w-full">
      <div className="w-full px-4 md:px-8 relative z-10 flex flex-col items-center justify-center">
        
        {/* The Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8 md:gap-12 w-full mx-auto justify-center`}>
          {achievements.map((achievement, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: 'easeOut' }}
              className="relative flex flex-col items-center text-center group"
              style={{
                background: 'linear-gradient(180deg, rgba(20,24,18,0.95) 0%, rgba(10,12,8,0.98) 100%)',
                border: '1px solid rgba(198,155,83,0.3)',
                borderRadius: '4px',
                padding: '3rem 2.5rem',
                boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* Outer decorative border (double border effect) */}
              <div className="absolute inset-2 border border-[#C69B53]/15 pointer-events-none rounded-sm transition-colors duration-500 group-hover:border-[#C69B53]/40" />

              {/* Decorative top bracket */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-[#C69B53] to-transparent opacity-80" />

              {/* Year badge */}
              <div className="mb-6 px-5 py-1.5 border border-[#C69B53]/40 bg-[#C69B53]/10 text-[#C69B53] text-xs font-bold tracking-[0.3em] uppercase shadow-inner">
                {achievement.year}
              </div>

              {/* Title */}
              <h3 className="font-cinzel font-bold text-xl md:text-2xl leading-snug mb-6 text-[#F4F0E8] group-hover:text-[#C69B53] transition-colors duration-300">
                {achievement.title}
              </h3>

              {/* Decorative diamond divider line */}
              <div className="flex items-center justify-center w-full mb-6 gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C69B53]/60" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C69B53]" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C69B53]/60" />
              </div>

              {/* Description */}
              <p className="text-base md:text-lg leading-relaxed flex-grow text-[#C8C0B3] font-garamond italic px-2">
                &ldquo;{achievement.description}&rdquo;
              </p>

              {/* Category chip */}
              {achievement.category && (
                <div className="mt-8 text-[11px] font-bold uppercase tracking-[0.4em] text-[#C69B53]/70">
                  {achievement.category}
                </div>
              )}
              
              {/* Bottom Bracket */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C69B53]/50 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
