// src/components/sections/VideosSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { VideoItem } from '../../types';

interface Props {
  videos: VideoItem[];
}

export default function VideosSection({ videos }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const featured = videos.find(v => v.featured);
  const regular = videos.filter(v => !v.featured);

  return (
    <section id="videos" className="relative py-24 section-pattern">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Documentary Archive"
          title="Videos"
          subtitle="Cinematic documentaries and historic footage preserving the living memory of the regiment."
        />

        {/* Featured Video */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="font-inter text-xs text-yellow-600/70 tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Featured Documentary
            </div>
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: '480px' }}
              onClick={() => setActiveVideo(featured)}
            >
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 video-card-overlay" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-yellow-500/60 group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,160,23,0.15)' }}>
                    <svg className="w-6 h-6 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-inter text-xs text-yellow-500/80 tracking-widest uppercase">Play Documentary</div>
                    <div className="font-inter text-stone-400 text-xs">{featured.duration} • {featured.year}</div>
                  </div>
                </div>
                <h3 className="font-cinzel text-stone-100 text-2xl md:text-3xl mb-3">{featured.title}</h3>
                <p className="font-garamond text-stone-300 text-lg max-w-2xl leading-relaxed">{featured.description}</p>
              </div>
              {/* Corner badge */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-cinzel text-yellow-400 border border-yellow-600/40"
                style={{ background: 'rgba(10,12,8,0.85)' }}>
                FEATURED
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regular.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="heritage-card rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative" style={{ height: '200px' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-yellow-500/60 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    style={{ background: 'rgba(10,12,8,0.7)' }}>
                    <svg className="w-5 h-5 text-yellow-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-inter text-stone-300"
                  style={{ background: 'rgba(10,12,8,0.85)' }}>
                  {video.duration}
                </div>
              </div>
              <div className="p-5">
                <div className="font-inter text-xs text-stone-500 mb-2">{video.year}</div>
                <h4 className="font-cinzel text-stone-100 text-base mb-2 group-hover:text-yellow-400 transition-colors duration-300 leading-snug">
                  {video.title}
                </h4>
                <p className="font-garamond text-stone-400 text-sm leading-relaxed">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
              style={{ background: 'rgba(10,12,8,0.95)', backdropFilter: 'blur(20px)' }}
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="w-full max-w-4xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-cinzel text-stone-100 text-xl">{activeVideo.title}</h3>
                    <p className="font-inter text-stone-500 text-sm mt-1">{activeVideo.year} • {activeVideo.duration}</p>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-all duration-200"
                  >
                    ✕
                  </button>
                </div>
                {/* YouTube embed */}
                <div className="relative w-full rounded-xl overflow-hidden border border-stone-700/50"
                  style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="font-garamond text-stone-400 text-base mt-4 leading-relaxed">{activeVideo.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
