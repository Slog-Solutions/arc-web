// src/components/sections/HistorySection.tsx — REFINED
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
  // Per-paragraph images from real assami folder — passed from parent
  paragraphImages?: string[];
}

// Real history photos from assami/History folder
const HISTORY_IMAGES = [
  '/assami/History/history-01.jpg',
  '/assami/History/history-02.jpg',
  '/assami/History/history-03.jpg',
  '/assami/History/history-04.jpg',
  '/assami/Assam Regimental Centre/arc-training-recruits.jpg',
  '/assami/Assam Regiment Soldiers/soldiers-guardians.jpg',
];

const IMAGE_CAPTIONS = [
  'Historic photograph — early days of the Assam Regiment, 1941–45',
  'Colour presentation ceremony — a tradition of honour and sacrifice',
  'Regiment archives — records of service spanning eight decades',
  'Burma Campaign veterans — men who shaped the regiment\'s character',
  'Parade at Happy Valley — the annual tradition since 1941',
  'Soldiers of the regiment — guardians of the Northeast frontier',
];

export default function HistorySection({
  overview, paragraphs, timeline, quotes, highlights, heroImage, paragraphImages,
}: Props) {
  return (
    <section id="history" className="relative section-xl section-pattern">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader tag="Heritage & Legacy" title="History" subtitle={overview} />

        {/* ── Stat highlights ───────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="stat-card rounded-xl p-7 text-center"
            >
              <div className="font-cinzel text-4xl md:text-5xl text-gold-gradient mb-2 leading-none">{h.value}</div>
              <div className="font-inter text-xs text-stone-500 tracking-widest uppercase mt-1">{h.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Full-width banner image ────────────────────── */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative rounded-2xl overflow-hidden mb-24 img-zoom-container"
            style={{ height: '480px' }}
          >
            <img src={heroImage} alt="Historical archive" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-overlay-dark" />
            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <div className="font-inter text-xs text-yellow-500/70 tracking-[0.3em] uppercase mb-2">Historical Archive</div>
                <div className="font-cinzel text-stone-100 text-2xl md:text-3xl mb-2">Preserving the Legacy of Valour</div>
                <div className="font-garamond text-stone-300/80 text-base italic">
                  Eight decades of duty, honour, and sacrifice — the living heritage of the Assam Regimental Centre
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Alternating image + text paragraphs ──────── */}
        <div className="space-y-20 mb-24">
          {paragraphs.map((para, i) => {
            const imgSrc = paragraphImages?.[i] ?? HISTORY_IMAGES[i % HISTORY_IMAGES.length];
            const caption = IMAGE_CAPTIONS[i % IMAGE_CAPTIONS.length];
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center`}
              >
                {/* Image */}
                <motion.div
                  className="w-full md:w-1/2 img-zoom-container rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
                  style={{ height: '320px' }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={imgSrc}
                    alt={caption}
                    className="w-full h-full object-cover"
                  />
                  {/* Caption overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: 'linear-gradient(0deg, rgba(8,10,6,0.9) 0%, transparent 100%)' }}
                  >
                    <div className="font-inter text-stone-400 text-xs italic">{caption}</div>
                  </div>
                </motion.div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-start gap-5">
                    <div
                      className="mt-1 flex-shrink-0 w-1 rounded-full"
                      style={{
                        height: '80px',
                        background: 'linear-gradient(180deg, #d4a017 0%, transparent 100%)',
                      }}
                    />
                    <div>
                      <div className="font-inter text-xs text-yellow-600/60 tracking-[0.3em] uppercase mb-3">
                        Chapter {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="font-garamond text-stone-300/90 text-lg md:text-xl leading-[1.85]">{para}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Quote blocks ──────────────────────────────── */}
        <div className="space-y-8 mb-24">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="quote-block pl-8 pr-8 py-10 rounded-r-2xl"
            >
              <div className="text-yellow-600/40 font-cinzel text-6xl leading-none mb-3 select-none">"</div>
              <p className="font-garamond text-2xl md:text-3xl text-stone-200 italic leading-[1.6] mb-6">{q.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px" style={{ background: '#d4a017' }} />
                <div>
                  <div className="font-cinzel text-yellow-500/90 text-sm tracking-wider">{q.author}</div>
                  <div className="font-inter text-stone-500 text-xs mt-0.5">{q.designation}</div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>

        {/* ── Premium Alternating Timeline ─────────────── */}
        <div className="mt-8">
          <SectionHeader tag="Chronological Record" title="Timeline" centered />

          <div className="relative mt-16">
            {/* Center vertical line */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(212,160,23,0.45) 8%, rgba(212,160,23,0.45) 92%, transparent)' }}
            />

            <div className="flex flex-col gap-12">
              {timeline.map((entry, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.04, duration: 0.6, ease: 'easeOut' }}
                    className="relative flex flex-col md:flex-row items-center gap-4 md:gap-0"
                  >
                    {/* Card — left side (even) or invisible spacer */}
                    <div className={`w-full md:w-[46%] ${isEven ? 'md:pr-14' : 'md:order-3 md:pl-14'}`}>
                      {(isEven ? true : false) ? null : null}
                      <div
                        className="group rounded-2xl p-7 hover-lift"
                        style={{
                          background: 'linear-gradient(145deg, #141a0d, #1c2912)',
                          border: '1px solid rgba(212,160,23,0.15)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="font-cinzel text-yellow-500 text-3xl leading-none">{entry.year}</div>
                          {entry.significance && (
                            <span className="font-inter text-[10px] text-yellow-600/70 tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                              style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}>
                              {entry.significance}
                            </span>
                          )}
                        </div>
                        <div className="font-cinzel text-stone-100 text-base mb-2 group-hover:text-yellow-300 transition-colors duration-300">{entry.title}</div>
                        <div className="w-8 h-px mb-3" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
                        <p className="font-garamond text-stone-400 text-base leading-relaxed">{entry.description}</p>
                      </div>
                    </div>

                    {/* Centre dot */}
                    <div className="hidden md:flex md:order-2 w-[8%] justify-center flex-shrink-0 relative" style={{ zIndex: 2 }}>
                      <div className="timeline-dot-lg" />
                    </div>

                    {/* Spacer opposite side */}
                    <div className={`hidden md:block w-[46%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />

                    {/* Swap order for odd items */}
                    {!isEven && (
                      <div className={`w-full md:w-[46%] md:order-1 md:pr-14`}>
                        <div
                          className="group rounded-2xl p-7 hover-lift"
                          style={{
                            background: 'linear-gradient(145deg, #141a0d, #1c2912)',
                            border: '1px solid rgba(212,160,23,0.15)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="font-cinzel text-yellow-500 text-3xl leading-none">{entry.year}</div>
                            {entry.significance && (
                              <span className="font-inter text-[10px] text-yellow-600/70 tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                                style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}>
                                {entry.significance}
                              </span>
                            )}
                          </div>
                          <div className="font-cinzel text-stone-100 text-base mb-2 group-hover:text-yellow-300 transition-colors duration-300">{entry.title}</div>
                          <div className="w-8 h-px mb-3" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
                          <p className="font-garamond text-stone-400 text-base leading-relaxed">{entry.description}</p>
                        </div>
                      </div>
                    )}

                    {isEven && (
                      <div className="w-full md:w-[46%] md:order-3 md:pl-14 hidden md:block">
                        <div
                          className="group rounded-2xl p-7 hover-lift"
                          style={{
                            background: 'linear-gradient(145deg, #141a0d, #1c2912)',
                            border: '1px solid rgba(212,160,23,0.15)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="font-cinzel text-yellow-500 text-3xl leading-none">{entry.year}</div>
                            {entry.significance && (
                              <span className="font-inter text-[10px] text-yellow-600/70 tracking-widest uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                                style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}>
                                {entry.significance}
                              </span>
                            )}
                          </div>
                          <div className="font-cinzel text-stone-100 text-base mb-2 group-hover:text-yellow-300 transition-colors duration-300">{entry.title}</div>
                          <div className="w-8 h-px mb-3" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
                          <p className="font-garamond text-stone-400 text-base leading-relaxed">{entry.description}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
