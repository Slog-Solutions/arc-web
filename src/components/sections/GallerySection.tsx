// src/components/sections/GallerySection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import SectionHeader from './SectionHeader';
import type { GalleryItem } from '../../types';

interface Props {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(gallery.map(g => g.category)))];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter(g => g.category === activeCategory);

  const slides = filtered.map(item => ({ src: item.src, alt: item.caption }));

  return (
    <section id="gallery" className="relative py-24" style={{ background: '#080a06' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Visual Archive"
          title="Gallery"
          subtitle="A curated visual chronicle of history, heritage, and service."
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

        {/* Masonry gallery */}
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
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="masonry-item relative cursor-pointer group rounded-lg overflow-hidden img-zoom-container"
                onClick={() => { setIndex(i); setOpen(true); }}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full block object-cover"
                  style={{ aspectRatio: i % 3 === 0 ? '4/3' : i % 3 === 1 ? '3/4' : '1/1' }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-4">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="font-inter text-xs text-yellow-500/80 tracking-widest uppercase mb-1">{item.category}</div>
                    <p className="font-garamond text-stone-200 text-sm leading-snug">{item.caption}</p>
                    <div className="font-inter text-stone-500 text-xs mt-1">{item.year}</div>
                  </div>
                </div>
                {/* Corner marker */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(212,160,23,0.9)' }}>
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          styles={{
            container: { backgroundColor: 'rgba(10, 12, 8, 0.97)' },
          }}
        />
      </div>
    </section>
  );
}
