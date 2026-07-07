// src/components/sections/HistorySection.tsx
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
}

export default function HistorySection({ overview, paragraphs, timeline, quotes, highlights, heroImage }: Props) {
  return (
    <section id="history" className="relative py-24 section-pattern">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader tag="Heritage & Legacy" title="History" subtitle={overview} />

        {/* Stats highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="stat-card rounded-lg p-6 text-center"
            >
              <div className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-2">{h.value}</div>
              <div className="font-inter text-xs text-stone-500 tracking-widest uppercase">{h.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Large banner image */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl overflow-hidden mb-20 img-zoom-container"
            style={{ height: '400px' }}
          >
            <img src={heroImage} alt="Historical" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-overlay-dark" />
            <div className="absolute bottom-8 left-8">
              <div className="font-cinzel text-yellow-500/80 text-xs tracking-widest uppercase mb-1">Historical Archive</div>
              <div className="font-garamond text-stone-200 text-xl italic">Preserving the legacy of valour</div>
            </div>
          </motion.div>
        )}

        {/* Alternating text + image paragraphs */}
        <div className="space-y-16 mb-20">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2 img-zoom-container rounded-lg overflow-hidden" style={{ height: '260px' }}>
                <img
                  src={`https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80`}
                  alt={`Historical context ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80`;
                  }}
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-start gap-4">
                  <div className="mt-2 w-px h-16 bg-gradient-to-b from-yellow-600/80 to-transparent flex-shrink-0" />
                  <p className="font-garamond text-lg text-stone-300 leading-relaxed">{para}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="quote-block pl-8 pr-6 py-8 rounded-r-lg mb-12"
          >
            <div className="text-yellow-600/50 font-cinzel text-5xl leading-none mb-2">"</div>
            <p className="font-garamond text-xl md:text-2xl text-stone-200 italic leading-relaxed mb-4">{q.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-700" />
              <div>
                <div className="font-cinzel text-yellow-500/90 text-sm">{q.author}</div>
                <div className="font-inter text-stone-500 text-xs">{q.designation}</div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Timeline */}
        <div className="mt-24">
          <SectionHeader tag="Chronological Record" title="Timeline" centered={true} />
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(212,160,23,0.4) 10%, rgba(212,160,23,0.4) 90%, transparent)' }} />

            <div className="space-y-8">
              {timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="heritage-card rounded-lg p-6 hover:border-yellow-600/40 transition-all duration-300">
                      <div className="font-cinzel text-yellow-500 text-2xl mb-1">{entry.year}</div>
                      <div className="font-cinzel text-stone-200 text-base mb-2">{entry.title}</div>
                      <p className="font-garamond text-stone-400 text-base leading-relaxed">{entry.description}</p>
                      {entry.significance && (
                        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter text-yellow-600/80 border border-yellow-700/30"
                          style={{ background: 'rgba(212,160,23,0.06)' }}>
                          {entry.significance}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-yellow-600 top-8"
                    style={{ background: '#0a0c08', boxShadow: '0 0 16px rgba(212,160,23,0.5)' }} />

                  {/* Spacer */}
                  <div className="hidden md:block w-[10%]" />
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
