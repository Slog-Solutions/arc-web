// src/components/sections/CommandingOfficersSection.tsx - REFINED (Large Museum Portraits)
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { CommandingOfficer, GaonBura } from '../../types';

interface Props {
  officers: CommandingOfficer[];
  gaonBuras?: GaonBura[];
}

const PORTRAIT_FALLBACKS = [
  '/assami/Commanding Officers (CO History)/co-ross-howman.jpg',
  '/assami/Commanding Officers (CO History)/co-pk-singh.jpg',
  '/assami/Commanding Officers (CO History)/co-mk-nair.jpg',
  '/assami/Commanding Officers (CO History)/co-ak-sharma.jpg',
];

export default function CommandingOfficersSection({ officers, gaonBuras }: Props) {
  return (
    <section id="commanding-officers" className="relative py-32 museum-room-wall spotlight-glow">
      <div className="museum-container">
        
        {/* Section Header */}
        <SectionHeader
          tag="Portrait Gallery"
          title="Commanding Officers"
          subtitle="Hover or tap a portrait frame to inspect the service records, military biography and key accomplishments."
        />

        {/* ── Large Portrait Grid (3D Flip Plaque Layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12 mb-28">
          {officers.map((officer, i) => {
            const officerImg = officer.image || PORTRAIT_FALLBACKS[i % PORTRAIT_FALLBACKS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="flip-card w-full h-[580px]"
              >
                <div className="flip-card-inner w-full h-full">
                  
                  {/* Front Side: Large Framed Portrait */}
                  <div className="flip-card-front w-full h-full bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border-8 border-[#2b1d0c] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-4 relative">
                    {/* Brass corner indicators */}
                    <div className="absolute top-2 left-2 text-[#d4a017] text-[10px]">✦</div>
                    <div className="absolute top-2 right-2 text-[#d4a017] text-[10px]">✦</div>
                    <div className="absolute bottom-2 left-2 text-[#d4a017] text-[10px]">✦</div>
                    <div className="absolute bottom-2 right-2 text-[#d4a017] text-[10px]">✦</div>

                    <div className="relative w-full h-[400px] overflow-hidden img-zoom-container rounded-lg border border-[#2b1d0c]">
                      <img
                        src={officerImg}
                        alt={officer.name}
                        className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.85]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      
                      {/* Interactive Flip Hint */}
                      <div className="absolute top-4 right-4 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 text-[8px] font-inter uppercase tracking-widest border border-yellow-500/35 rounded backdrop-blur-sm">
                        Hover to inspect
                      </div>
                    </div>

                    {/* Bottom Label Plate */}
                    <div className="p-4 text-center bg-[#0d120a] border-t border-[#443118]/50 rounded-b-md">
                      <div className="font-cinzel text-yellow-500/90 text-xs tracking-[0.2em] uppercase mb-1">{officer.rank}</div>
                      <h3 className="font-cinzel text-stone-100 text-lg md:text-xl font-bold leading-tight mb-1">{officer.name}</h3>
                      <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase">{officer.tenure}</div>
                    </div>
                  </div>

                  {/* Back Side: Information Exhibit Plaque (Vintage Paper) */}
                  <div className="flip-card-back w-full h-full p-8 flex flex-col justify-between bg-gradient-to-b from-[#f3ede2] to-[#e4d7be] border-8 border-[#2b1d0c] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                    
                    <div>
                      {/* Metal bar divider */}
                      <div className="flex items-center gap-3.5 mb-5">
                        <div className="h-9 w-[3px] bg-yellow-600 rounded-full" />
                        <div>
                          <div className="font-cinzel text-stone-900 text-base font-bold leading-tight">{officer.name}</div>
                          <div className="font-inter text-stone-600 text-[9px] tracking-widest uppercase mt-0.5">{officer.rank} · {officer.tenure}</div>
                        </div>
                      </div>
                      
                      <div className="h-px bg-stone-400/40 w-16 mb-5" />
                      
                      {/* Biography */}
                      <div className="mb-6">
                        <div className="font-inter text-stone-700 text-[9px] tracking-widest uppercase font-bold mb-1.5">Regimental Biography</div>
                        <p className="font-garamond text-stone-900 text-[15px] leading-relaxed italic">{officer.bio}</p>
                      </div>
                    </div>

                    {/* Contributions / Historical Importance */}
                    <div className="border-t border-stone-400/40 pt-4 mt-auto">
                      <div className="font-inter text-stone-700 text-[9px] tracking-widest uppercase font-bold mb-1">Key Contributions</div>
                      <p className="font-inter text-stone-850 text-xs leading-relaxed">{officer.contribution}</p>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Gaon Buras Heritage Section ────────────────── */}
        {gaonBuras && gaonBuras.length > 0 && (
          <>
            <div className="room-divider">
              <div className="room-divider-line" />
              <div className="room-divider-flourish">
                <span>✦</span>
                <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Annex · Community Pillars</span>
                <span>✦</span>
              </div>
              <div className="room-divider-line" />
            </div>

            <SectionHeader
              tag="Cultural Pillars"
              title="Gaon Buras"
              subtitle="The village elders and community leaders who served as the vital bridge between the regiment and local tribes."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {gaonBuras.map((gb, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                  className="flip-card w-full h-[500px]"
                >
                  <div className="flip-card-inner w-full h-full">
                    
                    {/* Front: Framed Heritage Portrait Card */}
                    <div className="flip-card-front w-full h-full bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border-8 border-[#2b1d0c] shadow-2xl p-6 flex flex-col justify-between relative">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center border border-yellow-500/20 bg-yellow-500/5 mb-4">
                        <span className="text-4xl select-none">👴</span>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-end">
                        <span className="font-inter text-yellow-600/70 text-xs tracking-wider uppercase mb-1">{gb.tribe}</span>
                        <h4 className="font-cinzel text-stone-100 text-xl mb-2">{gb.name}</h4>
                        <div className="font-inter text-stone-500 text-xs tracking-widest">{gb.era}</div>
                        <div className="mt-4 font-inter text-yellow-500/80 text-[11px] uppercase tracking-widest flex items-center gap-2">
                          <span>Hover to view history</span>
                          <svg className="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back w-full h-full p-7 flex flex-col justify-between overflow-y-auto">
                      <div>
                        <div className="font-cinzel text-stone-200 text-base leading-snug mb-1">{gb.name}</div>
                        <div className="font-inter text-yellow-600/60 text-[10px] tracking-wider uppercase mb-4">{gb.tribe} · {gb.era}</div>
                        <div className="h-px bg-yellow-700/10 mb-4" />
                        <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase mb-1">Community Role</div>
                        <p className="font-garamond text-stone-300 text-[14px] leading-relaxed mb-4">{gb.role}</p>
                      </div>
                      
                      <div className="border-t border-yellow-700/10 pt-4 mt-auto">
                        <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase mb-1">Historical Importance</div>
                        <p className="font-garamond text-stone-400 text-xs leading-relaxed italic">{gb.contribution}</p>
                      </div>
                    </div>
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
