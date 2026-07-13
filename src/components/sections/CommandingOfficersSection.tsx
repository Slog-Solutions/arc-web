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

const GAON_BURA_FALLBACKS = [
  '/assami/Assam Regiment Soldiers/soldiers-guardians.jpg',
  '/assami/Assam Regiment Soldiers/soldiers-image.jpg',
  '/assami/Assam Regiment Soldiers/soldiers-flag-scarlet.jpg',
  '/assami/Assam Regiment Soldiers/soldiers-training-camp.jpg',
];

export default function CommandingOfficersSection({ officers, gaonBuras }: Props) {
  return (
    <section id="commanding-officers" className="relative" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <div className="museum-container">

        {/* Section Header */}
        <SectionHeader
          tag="Portrait Gallery"
          title="Commanding Officers"
          subtitle="Hover or tap a portrait frame to inspect the service records, military biography and key accomplishments."
        />

        {/* ── Large Portrait Grid (3D Flip Plaque Layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mb-32">
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
                  <div className="flip-card-front w-full h-full bg-[#11130d] border-[6px] border-[#2b1d0c] shadow-2xl flex flex-col relative group">
                    <div className="relative flex-1 w-full overflow-hidden img-zoom-container">
                      <img
                        src={officerImg}
                        alt={officer.name}
                        className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.85] transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11130d] via-transparent to-transparent opacity-90" />

                      {/* Interactive Flip Hint */}
                      <div className="absolute top-4 right-4 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 text-[8px] font-inter uppercase tracking-widest border border-yellow-500/35 rounded backdrop-blur-sm z-20">
                        Hover to inspect
                      </div>
                    </div>

                    {/* Bottom Label Plate (Integrated) */}
                    <div className="px-6 pb-6 pt-2 text-center relative z-10 flex-shrink-0">
                      <div className="font-cinzel text-[#d4a017] text-xs tracking-[0.2em] uppercase mb-1">{officer.rank}</div>
                      <h3 className="font-cinzel text-stone-100 text-lg md:text-xl font-bold leading-tight mb-1 filter drop-shadow-md">{officer.name}</h3>
                      <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase">{officer.tenure}</div>
                    </div>
                  </div>

                  {/* Back Side: Premium Info Plaque (Dark Military Theme) */}
                  <div className="flip-card-back w-full h-full p-8 flex flex-col bg-gradient-to-br from-[#1c2415] via-[#0f140a] to-[#0a0c08] border-[6px] border-[#2b1d0c] shadow-[inset_0_0_80px_rgba(0,0,0,0.9),_0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Top Section */}
                    <div className="flex-shrink-0 flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 mb-4 flex items-center justify-center border border-yellow-500/20 bg-yellow-500/10 rounded-full shadow-[0_0_15px_rgba(212,160,23,0.2)]">
                        <span className="text-yellow-500 text-sm">✦</span>
                      </div>
                      <div className="font-inter text-[#d4a017] opacity-80 text-[10px] tracking-[0.3em] uppercase mb-2">
                        {officer.rank}
                      </div>
                      <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#f0ca50] via-[#d4a017] to-[#f0ca50] text-3xl font-bold leading-tight mb-2 filter drop-shadow-md">
                        {officer.name}
                      </div>
                      <div className="font-inter text-stone-400 text-xs tracking-widest uppercase mb-6">
                        {officer.tenure}
                      </div>

                      <div className="flex items-center w-full max-w-[80%] mx-auto gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/50 to-transparent" />
                        <div className="w-1.5 h-1.5 bg-[#d4a017]/80 transform rotate-45" />
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/50 to-transparent" />
                      </div>
                    </div>

                    {/* Center Section (Biography) */}
                    <div className="flex-1 flex flex-col justify-center py-6 relative z-10">
                      <p className="font-garamond text-stone-300 text-[16px] md:text-[17px] leading-relaxed text-center px-4 italic">
                        {officer.bio}
                      </p>
                    </div>

                    {/* Bottom Section (Contributions) */}
                    <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
                      <div className="flex items-center w-full max-w-[50%] mx-auto gap-3 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
                        <div className="w-1 h-1 bg-[#d4a017]/50 transform rotate-45" />
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
                      </div>
                      <div className="font-inter text-[#d4a017] text-[10px] tracking-[0.25em] uppercase font-bold mb-4 text-center">
                        Key Contributions
                      </div>
                      <ul className="font-inter text-stone-400 text-[12px] leading-relaxed space-y-3 px-2 w-full max-w-[90%] mx-auto">
                        {officer.contribution.split(';').map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#d4a017] mt-1 text-[8px]">❖</span>
                            <span className="flex-1 text-left">{point.trim() + (point.trim().endsWith('.') ? '' : '.')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Gaon Buras Commanding Officer Heritage Section ────────────────── */}
        {gaonBuras && gaonBuras.length > 0 && (
          <div className="pt-8">
            {/* <div className="room-divider">
              <div className="room-divider-line" />
              <div className="room-divider-flourish">
                <span>✦</span>
                <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Annex · Community Pillars</span>
                <span>✦</span>
              </div>
              <div className="room-divider-line" />
            </div> */}

            <div className="mt-20">
              {/* <SectionHeader
                tag="Cultural Pillars"
                title="Gaon Buras Commanding Officer"
                subtitle="The village elders and community leaders who served as the vital bridge between the regiment and local tribes."
              /> */}
              <br />
              <br />

            </div>

            {/* Changed from inline styles to standard Tailwind classes for consistent managed spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mt-12 mb-16">
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
                    <div className="flip-card-front w-full h-full bg-[#11130d] border-[6px] border-[#2b1d0c] shadow-2xl flex flex-col relative group">
                      <div className="relative flex-1 w-full overflow-hidden img-zoom-container">
                        <img
                          src={GAON_BURA_FALLBACKS[i % GAON_BURA_FALLBACKS.length]}
                          alt={gb.name}
                          className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.8] sepia-[0.2] transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11130d] via-[#11130d]/40 to-transparent opacity-90" />
                        <div className="absolute top-4 right-4 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 text-[8px] font-inter uppercase tracking-widest border border-yellow-500/35 rounded backdrop-blur-sm z-20">Hover to view</div>
                      </div>

                      <div className="px-6 pb-6 pt-4 text-center relative z-10 flex-shrink-0">
                        <div className="font-cinzel text-[#d4a017] text-xs tracking-[0.2em] uppercase mb-2">{gb.tribe}</div>
                        <h3 className="font-cinzel text-stone-100 text-lg md:text-xl font-bold leading-tight mb-2 filter drop-shadow-md">{gb.name}</h3>
                        <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase">{gb.era}</div>
                      </div>
                    </div>

                    {/* Back: Premium Info Plaque (Dark Military Theme) */}
                    <div className="flip-card-back w-full h-full p-8 flex flex-col bg-gradient-to-br from-[#1c2415] via-[#0f140a] to-[#0a0c08] border-[6px] border-[#2b1d0c] shadow-[inset_0_0_80px_rgba(0,0,0,0.9),_0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Top Section */}
                      <div className="flex-shrink-0 flex flex-col items-center text-center relative z-10">
                        <div className="w-8 h-8 mb-4 flex items-center justify-center border border-yellow-500/20 bg-yellow-500/10 rounded-full shadow-[0_0_15px_rgba(212,160,23,0.2)]">
                          <span className="text-yellow-500 text-sm">✧</span>
                        </div>
                        <div className="font-inter text-[#d4a017] opacity-80 text-[10px] tracking-[0.3em] uppercase mb-2">
                          Community Elder · {gb.tribe}
                        </div>
                        <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#f0ca50] via-[#d4a017] to-[#f0ca50] text-3xl font-bold leading-tight mb-2 filter drop-shadow-md">
                          {gb.name}
                        </div>
                        <div className="font-inter text-stone-400 text-xs tracking-widest uppercase mb-6">
                          {gb.era}
                        </div>

                        <div className="flex items-center w-full max-w-[80%] mx-auto gap-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/50 to-transparent" />
                          <div className="w-1.5 h-1.5 bg-[#d4a017]/80 transform rotate-45" />
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/50 to-transparent" />
                        </div>
                      </div>

                      {/* Center Section (Role) */}
                      <div className="flex-1 flex flex-col justify-center py-6 relative z-10">
                        <p className="font-garamond text-stone-300 text-[16px] md:text-[17px] leading-relaxed text-center px-4 italic">
                          {gb.role}
                        </p>
                      </div>

                      {/* Bottom Section (Contributions Footer) */}
                      <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
                        <div className="flex items-center w-full max-w-[50%] mx-auto gap-3 mb-6">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
                          <div className="w-1 h-1 bg-[#d4a017]/50 transform rotate-45" />
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
                        </div>
                        <div className="font-inter text-[#d4a017] text-[10px] tracking-[0.25em] uppercase font-bold mb-4 text-center">
                          Historical Importance
                        </div>
                        <ul className="font-inter text-stone-400 text-[12px] leading-relaxed space-y-3 px-2 w-full max-w-[90%] mx-auto">
                          {gb.contribution.split(';').map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#d4a017] mt-1 text-[8px]">❖</span>
                              <span className="flex-1 text-left">{point.trim() + (point.trim().endsWith('.') ? '' : '.')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
