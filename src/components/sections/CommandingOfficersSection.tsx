// src/components/sections/CommandingOfficersSection.tsx
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { CommandingOfficer, GaonBura } from '../../types';

interface Props {
  officers: CommandingOfficer[];
  gaonBuras?: GaonBura[];
}

const PORTRAIT_FALLBACKS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1474176857409-1e878f0c2df5?w=400&q=80',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdcd63?w=400&q=80',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&q=80',
];

export default function CommandingOfficersSection({ officers, gaonBuras }: Props) {
  return (
    <section id="commanding-officers" className="relative py-24" style={{ background: 'linear-gradient(180deg, #0a0c08 0%, #0e1309 50%, #0a0c08 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Leadership Chronicles"
          title="Commanding Officers"
          subtitle="The men who shaped the regiment — their command, their legacy, their honour."
        />

        {/* Officers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {officers.map((officer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="heritage-card rounded-xl overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Portrait */}
                <div className="sm:w-40 h-48 sm:h-auto flex-shrink-0 img-zoom-container relative">
                  <img
                    src={PORTRAIT_FALLBACKS[i % PORTRAIT_FALLBACKS.length]}
                    alt={officer.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PORTRAIT_FALLBACKS[i % PORTRAIT_FALLBACKS.length];
                    }}
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(90deg, transparent 60%, rgba(20,26,13,0.9) 100%)',
                  }} />
                  {/* Overlay badge */}
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-inter text-yellow-500/80 border border-yellow-700/30"
                    style={{ background: 'rgba(10,12,8,0.85)' }}>
                    {officer.rank.split(' ')[0]}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1">
                  <div className="font-inter text-xs text-yellow-600/70 tracking-widest uppercase mb-1">{officer.rank}</div>
                  <h3 className="font-cinzel text-stone-100 text-xl mb-1 group-hover:text-yellow-400 transition-colors duration-300">{officer.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-px bg-yellow-700/60" />
                    <span className="font-inter text-stone-500 text-xs tracking-wider">{officer.tenure}</span>
                  </div>
                  <p className="font-garamond text-stone-400 text-sm leading-relaxed mb-4">{officer.bio}</p>
                  <div className="border-t pt-4" style={{ borderColor: 'rgba(212,160,23,0.15)' }}>
                    <div className="font-inter text-xs text-yellow-600/60 uppercase tracking-widest mb-1">Key Contribution</div>
                    <p className="font-inter text-stone-400 text-xs leading-relaxed">{officer.contribution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gaon Buras Section */}
        {gaonBuras && gaonBuras.length > 0 && (
          <>
            <div className="divider-gold mb-20" />
            <SectionHeader
              tag="Community Pillars"
              title="Gaon Buras"
              subtitle="The village elders and community leaders who served as the vital bridge between the regiment and the people of Northeast India."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gaonBuras.map((gb, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass rounded-xl p-6 border hover:border-yellow-600/30 transition-all duration-300"
                  style={{ borderColor: 'rgba(212,160,23,0.12)' }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-yellow-700/30"
                    style={{ background: 'rgba(212,160,23,0.08)' }}>
                    <span className="text-xl">👴</span>
                  </div>
                  <h4 className="font-cinzel text-stone-100 text-lg mb-1">{gb.name}</h4>
                  <div className="font-inter text-xs text-yellow-600/70 tracking-wider mb-1">{gb.tribe}</div>
                  <div className="font-inter text-xs text-stone-500 mb-4">{gb.era}</div>
                  <div className="divider-gold mb-4" />
                  <div className="mb-3">
                    <div className="font-inter text-xs text-stone-500 uppercase tracking-widest mb-1">Role</div>
                    <p className="font-garamond text-stone-300 text-sm">{gb.role}</p>
                  </div>
                  <div>
                    <div className="font-inter text-xs text-stone-500 uppercase tracking-widest mb-1">Contribution</div>
                    <p className="font-garamond text-stone-400 text-sm leading-relaxed">{gb.contribution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
