// src/components/sections/GallerySection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { GalleryItem } from '../../types';

interface Props {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: Props) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(gallery.map(g => g.category)))];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter(g => g.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24" style={{ background: '#080a06' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Visual Archive"
          title="Gallery"
          subtitle="A curated visual chronicle of history, heritage, and service. Click any image to explore its story."
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-inter tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-yellow-600/20 border-yellow-600/50 text-yellow-400'
                  : 'border-stone-700/50 text-stone-500 hover:border-yellow-700/40 hover:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="masonry-grid"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="masonry-item relative cursor-pointer group rounded-xl overflow-hidden img-zoom-container"
                onClick={() => setSelectedItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                aria-label={`View photo: ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full block object-cover"
                  style={{ aspectRatio: i % 4 === 0 ? '4/3' : i % 4 === 1 ? '3/4' : i % 4 === 2 ? '1/1' : '16/9' }}
                  loading="lazy"
                />
                {/* Hover overlay with info */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(8,10,6,0.96) 0%, rgba(8,10,6,0.5) 50%, transparent 100%)' }}
                >
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="font-inter text-[10px] text-yellow-500/80 tracking-widest uppercase mb-1">{item.category} · {item.year}</div>
                    <p className="font-garamond text-stone-200 text-sm leading-snug">{item.caption}</p>
                    {item.history && (
                      <div className="mt-2 flex items-center gap-1.5 text-yellow-400/70 text-xs font-inter">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Click to read the story
                      </div>
                    )}
                  </div>
                </div>
                {/* Corner expand icon */}
                <div
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(212,160,23,0.9)' }}
                >
                  <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                {/* Category tag */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-inter text-[9px] tracking-widest uppercase px-2 py-1 rounded-full"
                    style={{ background: 'rgba(10,12,8,0.85)', color: 'rgba(212,160,23,0.9)', border: '1px solid rgba(212,160,23,0.3)' }}>
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---- Photo Story Modal ---- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(8, 10, 6, 0.96)', backdropFilter: 'blur(24px)' }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #141a0d, #0d120a)',
                border: '1px solid rgba(212,160,23,0.25)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,160,23,0.1)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />
              
              <div className="flex flex-col lg:flex-row">
                {/* Image side */}
                <div className="lg:w-3/5 relative" style={{ minHeight: '300px', maxHeight: '580px' }}>
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.caption}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '580px' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(20,26,13,0.8) 100%), linear-gradient(0deg, rgba(20,26,13,0.5) 0%, transparent 40%)' }} />
                  
                  {/* Category + Year badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="font-inter text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{ background: 'rgba(10,12,8,0.85)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.4)' }}>
                      {selectedItem.category}
                    </span>
                    <span className="font-inter text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{ background: 'rgba(10,12,8,0.85)', color: 'rgba(240,235,224,0.6)' }}>
                      {selectedItem.year}
                    </span>
                  </div>
                </div>

                {/* Story side */}
                <div className="lg:w-2/5 p-7 lg:p-8 flex flex-col">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="self-end w-9 h-9 rounded-full flex items-center justify-center mb-6 flex-shrink-0 transition-all duration-200 hover:bg-stone-700/40"
                    style={{ border: '1px solid rgba(212,160,23,0.2)' }}
                    aria-label="Close"
                  >
                    <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Museum-style label */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-8 w-1 rounded-full" style={{ background: 'linear-gradient(180deg, #d4a017, #8a6100)' }} />
                    <div>
                      <div className="font-inter text-[10px] text-yellow-700/60 tracking-[0.3em] uppercase">Heritage Collection</div>
                      <div className="font-inter text-yellow-600/50 text-[10px]">Assam Regimental Centre</div>
                    </div>
                  </div>

                  <h3 className="font-cinzel text-stone-100 text-xl leading-snug mb-4">
                    {selectedItem.caption}
                  </h3>

                  {selectedItem.history ? (
                    <div className="flex-1 overflow-y-auto pr-1">
                      <div className="w-10 h-px mb-4" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
                      <p className="font-garamond text-stone-300/90 text-base leading-relaxed">
                        {selectedItem.history}
                      </p>
                    </div>
                  ) : (
                    <p className="font-garamond text-stone-400 text-base leading-relaxed italic flex-1">
                      Part of the digital heritage archive of the Assam Regimental Centre, documenting the proud history of India's northeastern military forces.
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-inter text-xs text-stone-600">ARC Heritage Archive</span>
                      <span className="font-inter text-xs text-yellow-700/50">{selectedItem.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
