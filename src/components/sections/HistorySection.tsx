// src/components/sections/HistorySection.tsx — REFINED (Museum Exhibition Hall)
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  isSubPage?: boolean;
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
  isSubPage = false,
}: Props) {
  const TIMELINE_BG_IMAGES = [
    '/assami/Assam%20Regimental%20Centre/arc-passing-out-parade.jpg',
    '/assami/Assam%20Regimental%20Centre/arc-raising-day.jpg',
    '/assami/Assam%20Regimental%20Centre/arc-training-recruits.jpg',
    '/assami/Assam%20Regimental%20Centre/arc-museum-lobby.jpg',
    '/assami/Assam%20Regimental%20Centre/arc-regimental-flag.jpg',
  ];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setBgIndex(i => (i + 1) % TIMELINE_BG_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const getTimelineIcon = (title: string, desc: string) => {
    const text = (title + ' ' + desc).toLowerCase();
    if (text.includes('battalion') || text.includes('raised') || text.includes('raising') || text.includes('found')) return '📜'; // Scroll/Charter
    if (text.includes('standoff') || text.includes('vigil') || text.includes('battle') || text.includes('ops') || text.includes('kargil')) return '⚔️'; // Crossed swords
    if (text.includes('headquarters') || text.includes('base') || text.includes('pasighat') || text.includes('established')) return '🗺️'; // Map
    if (text.includes('medal') || text.includes('award') || text.includes('honour') || text.includes('commendation')) return '🏅'; // Medal
    return '🧭'; // Compass fallback
  };

  return (
    <section id="history" className="relative museum-room-wall spotlight-glow overflow-hidden" style={{ paddingTop: isSubPage ? '20px' : '160px', paddingBottom: '160px' }}>

      {/* Subtle bottom fade only - no top shadow over heading */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="museum-container" style={{ position: 'relative', zIndex: 2 }}>


        {/* Exhibition Entrance Header */}
        <SectionHeader tag="Heritage Exhibition" title="Chronicles of Valour" subtitle={overview} />

        {/* ── Spotlight Stat Highlights ───────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '20px 32px', marginBottom: '60px', marginTop: '24px' }}>
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative text-center bg-gradient-to-b from-[#1a2210] to-[#0a0d07] border border-[#3a2910] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,160,23,0.08)]" style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '18px 16px' }}
            >
              {/* Corner screws */}
              <span className="absolute top-2 left-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute top-2 right-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute bottom-2 left-2 text-[8px] text-[#2b1d0c]">✛</span>
              <span className="absolute bottom-2 right-2 text-[#2b1d0c] text-[8px]">✛</span>

              <div className="font-cinzel text-2xl md:text-3xl text-gold-gradient font-bold leading-none mb-2">{h.value}</div>
              <div className="h-px w-6 bg-yellow-700/40 mx-auto mb-2" />
              <div className="font-inter text-[9px] text-stone-400 uppercase tracking-[0.25em]">{h.label}</div>
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
            className="museum-wood-frame brass-corners rounded-2xl overflow-hidden"
            style={{ height: '380px', marginBottom: '80px', marginTop: '24px' }}
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
        <div style={{ marginBottom: '60px', marginTop: '24px' }}>
          {paragraphs.map((para, i) => {
            const imgSrc = paragraphImages?.[i] ?? HISTORY_IMAGES[i % HISTORY_IMAGES.length];
            const caption = IMAGE_CAPTIONS[i % IMAGE_CAPTIONS.length];
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
                style={{ gap: '48px', marginBottom: i < paragraphs.length - 1 ? '60px' : '0' }}
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
                  <div className="vintage-paper-card rounded-2xl border hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-400 overflow-hidden">
                    {/* Archive badge strip at top */}
                    <div className="bg-[#2b1d0c] px-6 py-3 flex items-center justify-between">
                      <span className="font-cinzel text-yellow-500 text-[10px] uppercase tracking-widest">Archive Exhibit 0{i + 1}</span>
                      <span className="font-cinzel text-stone-600 text-[10px] uppercase tracking-widest">Chapter 0{i + 1} — Historical Records</span>
                    </div>
                    {/* Card body */}
                    <div className="p-8 md:p-10">
                      <div className="h-px bg-[#c2b090] w-16 mb-6" />
                      <p className="font-garamond text-stone-900 text-lg md:text-xl leading-relaxed italic">
                        {para}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Quote plaques ─────────────────────────────── */}
        <div style={{ marginBottom: '48px', marginTop: '24px' }}>
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-10 bg-[#0f140a] border-l-4 border-yellow-500 rounded-r-2xl overflow-hidden"
              style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.6)', marginBottom: '32px' }}
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

        {/* Thin gold separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '32px', marginTop: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.3), transparent)' }} />
          <span style={{ color: 'rgba(212,160,23,0.5)', fontSize: '10px', letterSpacing: '0.3em', fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>Heritage Archive</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,160,23,0.3), transparent)' }} />
        </div>

        {/* ── Timeline (Chronology Wall) ────────────────── */}
        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', padding: '50px 0', marginTop: '40px' }}>

          {/* Slideshow background */}
          <AnimatePresence>
            <motion.div
              key={bgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${TIMELINE_BG_IMAGES[bgIndex]}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              }}
            />
          </AnimatePresence>
          {/* Dark overlay for readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(5,7,3,0.88) 0%, rgba(10,14,6,0.82) 50%, rgba(5,7,3,0.88) 100%)',
            zIndex: 1,
          }} />

          {/* Content above background */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <SectionHeader tag="Chronological Exhibit" title="Chronology Wall" centered />

            <div className="relative" style={{ marginTop: '2.5rem' }}>
              {/* Center vertical brass rail */}
              <div className="brass-rail hidden md:block" />

              <div className="flex flex-col" style={{ gap: '140px' }}>
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

      </div>
    </section>
  );
}
