// src/components/sections/GallerySection.tsx — REFINED (Museum Photography Gallery)
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
    <section id="gallery" className="relative museum-room-wall spotlight-glow" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="museum-container">
        <SectionHeader
          tag="Visual Archive"
          title="Photography Gallery"
          subtitle="Walk through the visual collection of historic moments, field trainings, and official parades. Click any portrait or action record to open its catalog entry."
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-4 justify-center" style={{ marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-inter tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-yellow-600/20 border-yellow-600/50 text-yellow-400'
                  : 'border-stone-700/50 text-stone-500 hover:border-yellow-700/40 hover:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Handcrafted Museum Masonry/Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '80px' }}
          >
            {filtered.map((item, i) => {
              const isFeatured = i === 0; // Large centerpiece image
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className={`relative cursor-pointer group museum-wood-frame brass-corners rounded-xl overflow-hidden shadow-2xl ${
                    isFeatured ? 'lg:col-span-2 lg:row-span-1' : ''
                  }`}
                  onClick={() => setSelectedItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                  aria-label={`View photo: ${item.caption}`}
                >
                  <div className="relative w-full overflow-hidden img-zoom-container" style={{ height: isFeatured ? '480px' : '360px' }}>
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Exhibit Details Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="translate-y-1.5 group-hover:translate-y-0 transition-transform duration-400">
                        
                        {/* Brass tag look */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a2412] text-yellow-400 text-[9px] tracking-widest uppercase font-inter rounded border border-yellow-500/20 mb-3">
                          <span>{item.category}</span>
                          <span className="w-1 h-1 rounded-full bg-yellow-500/50" />
                          <span>{item.year}</span>
                        </div>

                        <p className="font-cinzel text-stone-100 text-base md:text-lg mb-2 leading-snug group-hover:text-yellow-400 transition-colors duration-300">
                          {item.caption}
                        </p>
                        
                        <div className="flex items-center gap-2 text-stone-400 text-xs font-inter mt-3">
                          <span className="text-[10px] uppercase tracking-widest text-yellow-500/80">Click to examine document</span>
                          <svg className="w-3.5 h-3.5 text-yellow-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Corner Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="font-inter text-[9px] tracking-widest uppercase px-3 py-1 rounded bg-[#0a0c08]/90 text-yellow-500 border border-yellow-500/30">
                        Exhibit 0{item.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Exhibition Modal ────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(6,8,4,0.97)', backdropFilter: 'blur(28px)' }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-[#2b1d0c]"
              onClick={e => e.stopPropagation()}
            >
              {/* Gold border strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
              
              <div className="flex flex-col lg:flex-row bg-[#080a06]">
                
                {/* Visual Side */}
                <div className="lg:w-3/5 relative min-h-[350px] lg:min-h-[500px]">
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.caption}
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Category + Year Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="font-inter text-[10px] tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full"
                      style={{ background: 'rgba(10,12,8,0.92)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.35)' }}>
                      {selectedItem.category}
                    </span>
                    <span className="font-inter text-[10px] tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full"
                      style={{ background: 'rgba(10,12,8,0.92)', color: 'rgba(240,235,224,0.6)' }}>
                      {selectedItem.year}
                    </span>
                  </div>
                </div>

                {/* Information Plaque Side (Vintage Paper) */}
                <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-[#f3ede2] to-[#e4d7be]">
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="self-end w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-stone-900/5 hover:bg-stone-900/10 border border-stone-800/20"
                    aria-label="Close exhibition modal"
                  >
                    <svg className="w-4 h-4 text-stone-850" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="my-6">
                    {/* Engraved plaque header */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="h-9 w-[3px] bg-yellow-600 rounded-full" />
                      <div>
                        <div className="font-inter text-[10px] text-stone-700 uppercase tracking-[0.28em] font-semibold">Exhibition Record</div>
                        <div className="font-inter text-stone-500 text-[10px]">Registry No. ARC-{selectedItem.id}</div>
                      </div>
                    </div>

                    <h3 className="font-cinzel text-stone-950 text-xl md:text-2xl leading-snug mb-5 font-bold">
                      {selectedItem.caption}
                    </h3>

                    <div className="h-px bg-stone-400/40 w-16 mb-5" />

                    {selectedItem.history ? (
                      <p className="font-garamond text-stone-900 text-base md:text-lg leading-relaxed italic">
                        {selectedItem.history}
                      </p>
                    ) : (
                      <p className="font-garamond text-stone-700 text-base leading-relaxed italic">
                        Documented evidence of regimental accomplishments, preserved for the historical archives at Happy Valley, Shillong.
                      </p>
                    )}
                  </div>

                  {/* Footing note */}
                  <div className="pt-6 border-t border-stone-400/40 mt-auto">
                    <div className="flex items-center justify-between text-stone-600 font-inter text-xs">
                      <span>ARC Heritage Catalog</span>
                      <span className="font-semibold">{selectedItem.year}</span>
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
