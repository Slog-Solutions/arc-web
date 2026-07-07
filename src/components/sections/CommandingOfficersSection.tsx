// src/components/sections/CommandingOfficersSection.tsx - REFINED (3D Flip Cards)
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
    <section id="commanding-officers" className="relative section-xl" style={{ background: 'linear-gradient(180deg, #0a0c08 0%, #0e1309 50%, #0a0c08 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Leadership Chronicles"
          title="Commanding Officers"
          subtitle="Hover or tap any card to view their biography and key contributions to the regiment."
        />

        {/* Officers Grid - 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {officers.map((officer, i) => {
            const officerImg = officer.image || PORTRAIT_FALLBACKS[i % PORTRAIT_FALLBACKS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flip-card w-full h-[450px]"
              >
                <div className="flip-card-inner w-full h-full">
                  {/* Card Front */}
                  <div className="flip-card-front w-full h-full bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border border-yellow-700/20 shadow-2xl flex flex-col justify-between">
                    <div className="relative w-full h-[320px] overflow-hidden group img-zoom-container">
                      <img
                        src={officerImg}
                        alt={officer.name}
                        className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.9]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PORTRAIT_FALLBACKS[i % PORTRAIT_FALLBACKS.length];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Rank tag */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 rounded text-[10px] font-inter uppercase tracking-widest text-yellow-500 border border-yellow-700/30"
                        style={{ background: 'rgba(10,12,8,0.85)', backdropFilter: 'blur(4px)' }}>
                        {officer.rank}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <div className="font-cinzel text-yellow-500/90 text-[11px] tracking-widest uppercase mb-1">{officer.rank}</div>
                      <h3 className="font-cinzel text-stone-100 text-lg mb-1 leading-snug">{officer.name}</h3>
                      <div className="font-inter text-stone-500 text-xs tracking-wider">{officer.tenure}</div>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div className="flip-card-back w-full h-full p-6 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-6 w-0.5 bg-yellow-500 rounded-full" />
                        <div>
                          <div className="font-cinzel text-stone-200 text-base leading-snug">{officer.name}</div>
                          <div className="font-inter text-stone-500 text-[10px] tracking-wider uppercase">{officer.tenure}</div>
                        </div>
                      </div>
                      <div className="h-px bg-yellow-700/10 mb-4" />
                      <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase mb-2">Biography</div>
                      <p className="font-garamond text-stone-300 text-[14px] leading-relaxed mb-4">{officer.bio}</p>
                    </div>

                    <div className="border-t border-yellow-700/10 pt-4 mt-auto">
                      <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase mb-1">Key Contribution</div>
                      <p className="font-inter text-stone-400 text-xs leading-relaxed italic">{officer.contribution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gaon Buras Section */}
        {gaonBuras && gaonBuras.length > 0 && (
          <>
            <div className="divider-gold mb-24" />
            <SectionHeader
              tag="Community Pillars"
              title="Gaon Buras"
              subtitle="The village elders and community chieftains who served as the vital link between the regiment and local tribes."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gaonBuras.map((gb, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flip-card w-full h-[400px]"
                >
                  <div className="flip-card-inner w-full h-full">
                    {/* Front */}
                    <div className="flip-card-front w-full h-full bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border border-yellow-700/20 shadow-2xl p-7 flex flex-col justify-between">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center border border-yellow-500/20 bg-yellow-500/5 mb-4">
                        <span className="text-3xl select-none">👴</span>
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
