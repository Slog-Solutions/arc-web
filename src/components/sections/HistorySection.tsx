// src/components/sections/HistorySection.tsx — REFINED (Museum Exhibition Hall)
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { TimelineEntry, Quote, Highlight } from '../../types';

interface Props {
  overview: string;
  paragraphs: string[];
  timeline: TimelineEntry[];
  quotes: Quote[];
  highlights: Highlight[];
  heroImage?: string;
  paragraphImages?: string[];
}

const HISTORY_IMAGES = [
  '/assami/History/history-01.jpg',
  '/assami/History/history-02.jpg',
  '/assami/History/history-03.jpg',
  '/assami/History/history-04.jpg',
];

const IMAGE_CAPTIONS = [
  'Historic Archives — Early recruits of the Assam Regiment, 1941',
  'Regimental Colour Parade — A legacy of ultimate devotion to the Nation',
  'Vintage Collections — Original battlefield field gear & records, WWII',
  'Burma Campaign Frontline — Infantry tactical units on the advance, 1944',
];

export default function HistorySection({
  overview,
  paragraphs,
  timeline,
  quotes,
  highlights,
  heroImage,
  paragraphImages,
}: Props) {
  // Helper to pick a museum icon based on chronological content
  const getTimelineIcon = (title: string, desc: string) => {
    const text = (title + ' ' + desc).toLowerCase();
    if (text.includes('battalion') || text.includes('raised') || text.includes('raising') || text.includes('found')) return '📜'; // Scroll/Charter
    if (text.includes('standoff') || text.includes('vigil') || text.includes('battle') || text.includes('ops') || text.includes('kargil')) return '⚔️'; // Crossed swords
    if (text.includes('headquarters') || text.includes('base') || text.includes('pasighat') || text.includes('established')) return '🗺️'; // Map
    if (text.includes('medal') || text.includes('award') || text.includes('honour') || text.includes('commendation')) return '🏅'; // Medal
    return '🧭'; // Compass fallback
  };

  return (
    <section id="history" className="relative py-32 museum-room-wall spotlight-glow overflow-hidden">
      
      {/* Visual background flourishes */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <div className="museum-container">
        
        {/* Exhibition Entrance Header */}
        <div className="mb-20 text-center">
          <SectionHeader tag="Heritage Exhibition" title="Chronicles of Valour" subtitle={overview} />
        </div>

        {/* ── Spotlight Stat Highlights ───────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-6 text-center bg-gradient-to-b from-[#141a0d] to-[#080a06] border border-[#2b1d0c] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            >
              {/* Corner screws */}
              <span className="absolute top-2 left-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute top-2 right-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute bottom-2 left-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute bottom-2 right-2 text-[#2b1d0c] text-[8px]">✛</span>
              
              <div className="font-cinzel text-3xl md:text-4xl text-gold-gradient font-bold leading-none mb-2">{h.value}</div>
              <div className="font-inter text-[10px] text-stone-500 uppercase tracking-[0.2em]">{h.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Main Exhibition Centrepiece ────────────────── */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="museum-wood-frame brass-corners rounded-2xl overflow-hidden mb-28"
            style={{ height: '520px' }}
          >
            <img src={heroImage} alt="Historical Centrepiece" className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex brass-plate mb-3 font-bold">
                Exhibition Centrepiece
              </div>
              <h3 className="font-cinzel text-stone-100 text-2xl md:text-3xl tracking-wide mb-2">Preserving Eight Decades of Valour</h3>
              <p className="font-garamond text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed italic">
                From the dense jungles of Burma in 1941 to the high-altitude borders of the Himalayas today.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Alternating Exhibit Rooms (Chapters) ────────── */}
        <div className="space-y-32 mb-28">
          {paragraphs.map((para, i) => {
            const imgSrc = paragraphImages?.[i] ?? HISTORY_IMAGES[i % HISTORY_IMAGES.length];
            const caption = IMAGE_CAPTIONS[i % IMAGE_CAPTIONS.length];
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                {/* Large Framed Picture */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 flex-shrink-0"
                >
                  <div className="museum-wood-frame brass-corners rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="img-zoom-container" style={{ height: '360px' }}>
                      <img src={imgSrc} alt={caption} className="w-full h-full object-cover filter brightness-90 contrast-[1.03]" />
                    </div>
                    {/* Engraved caption under the photo */}
                    <div className="bg-[#0f140a] p-4 text-center border-t border-[#2b1d0c]">
                      <span className="font-inter text-stone-400 text-xs italic tracking-wider">
                        {caption}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Old vintage paper information plaque */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="vintage-paper-card p-8 md:p-10 rounded-2xl border relative hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-400">
                    {/* Decorative archive tags */}
                    <div className="absolute -top-3.5 left-8 px-4 py-1 bg-[#2b1d0c] text-yellow-500 font-cinzel text-[10px] uppercase tracking-widest rounded-md border border-yellow-500/20">
                      Archive Exhibit 0{i + 1}
                    </div>
                    <div className="font-cinzel text-stone-600 text-[11px] uppercase tracking-widest mb-4">
                      Chapter 0{i + 1} — Historical Records
                    </div>
                    <div className="h-px bg-[#c2b090] w-16 mb-6" />
                    <p className="font-garamond text-stone-900 text-lg md:text-xl leading-relaxed italic">
                      {para}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Quote plaques ─────────────────────────────── */}
        <div className="space-y-12 mb-32">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-10 bg-[#0f140a] border-l-4 border-yellow-500 rounded-r-2xl overflow-hidden"
              style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}
            >
              <div className="absolute -right-6 -bottom-6 text-yellow-600/5 font-cinzel text-[120px] pointer-events-none select-none">
                🦏
              </div>
              <span className="text-yellow-500/30 font-cinzel text-6xl leading-none absolute top-4 left-6 select-none">“</span>
              <div className="pl-6">
                <p className="font-garamond text-2xl md:text-3xl text-stone-200 italic leading-relaxed mb-6">
                  {q.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-yellow-500/60" />
                  <div>
                    <div className="font-cinzel text-yellow-500/90 text-sm tracking-wider">{q.author}</div>
                    <div className="font-inter text-stone-500 text-[10px] tracking-widest uppercase mt-0.5">{q.designation}</div>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>

        {/* ── Timeline (Chronology Wall) ────────────────── */}
        <div className="mt-32">
          <SectionHeader tag="Chronological Exhibit" title="Chronology Wall" centered />
          
          <div className="relative mt-20">
            {/* Center vertical brass rail */}
            <div className="brass-rail hidden md:block" />

            <div className="flex flex-col gap-16">
              {timeline.map((entry, i) => {
                const isEven = i % 2 === 0;
                const exhibitIcon = getTimelineIcon(entry.title, entry.description);
                return (
                  <div key={i} className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0">
                    
                    {/* Card container */}
                    <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12' : 'md:order-3 md:pl-12'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                        className="vintage-paper-card p-8 rounded-2xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-400 relative"
                      >
                        {/* Screws */}
                        <div className="absolute top-2.5 left-2.5 text-[8px] text-stone-600/70">✛</div>
                        <div className="absolute top-2.5 right-2.5 text-[8px] text-stone-600/70">✛</div>
                        <div className="absolute bottom-2.5 left-2.5 text-[8px] text-stone-600/70">✛</div>
                        <div className="absolute bottom-2.5 right-2.5 text-[8px] text-stone-600/70">✛</div>

                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="brass-plate text-xs px-2.5 py-0.5">
                            {entry.year}
                          </div>
                          {entry.significance && (
                            <span className="font-inter text-[9px] text-[#2b1d0c] font-bold tracking-widest uppercase border border-[#c2b090] px-2 py-0.5 bg-[#e4d7be]/60 rounded">
                              {entry.significance}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3.5 mb-2">
                          <span className="text-2xl filter drop-shadow-md select-none">{exhibitIcon}</span>
                          <h4 className="font-cinzel text-stone-900 text-base md:text-lg font-bold leading-tight">
                            {entry.title}
                          </h4>
                        </div>
                        
                        <div className="h-px bg-stone-400/30 w-12 mb-3" />
                        <p className="font-garamond text-stone-850 text-sm md:text-base leading-relaxed">
                          {entry.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline node */}
                    <div className="hidden md:flex md:order-2 w-[10%] justify-center relative" style={{ zIndex: 10 }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f0ca50] to-[#d4a017] border-2 border-stone-900 shadow-[0_0_15px_rgba(212,160,23,0.8)]">
                        <span className="text-base select-none">{exhibitIcon}</span>
                      </div>
                    </div>

                    {/* Empty opposite side spacer */}
                    <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />

                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
