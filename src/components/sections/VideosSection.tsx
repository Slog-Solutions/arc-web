// src/components/sections/VideosSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { VideoItem } from '../../types';

interface Props {
  videos: VideoItem[];
}

function PlayIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-16 h-16' : 'w-11 h-11';
  const iconDim = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
      style={{
        background: 'rgba(212,160,23,0.15)',
        border: '2px solid rgba(212,160,23,0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <svg className={`${iconDim} text-yellow-400 ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

export default function VideosSection({ videos }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const featured = videos.find(v => v.featured);
  const regular = videos.filter(v => !v.featured);

  return (
    <section id="videos" className="relative py-24 section-pattern">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          tag="Documentary Archive"
          title="Videos"
          subtitle="Cinematic documentaries and historic footage preserving the living memory of the regiment."
        />

        {/* Featured Video — Full Width Cinematic */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="font-inter text-xs text-yellow-600/70 tracking-[0.3em] uppercase">Featured Documentary</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,160,23,0.3), transparent)' }} />
            </div>

            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ height: '500px' }}
              onClick={() => setActiveVideo(featured)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setActiveVideo(featured)}
              aria-label={`Play video: ${featured.title}`}
            >
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(8,10,6,0.98) 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'rgba(8,10,6,0.25)' }} />

              {/* Film grain */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                backgroundSize: '150px',
              }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="flex items-end justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <PlayIcon size="lg" />
                      <div>
                        <div className="font-inter text-xs text-yellow-500/80 tracking-widest uppercase">Play Documentary</div>
                        <div className="font-inter text-stone-400 text-xs">{featured.duration} &nbsp;·&nbsp; {featured.year}</div>
                      </div>
                    </div>
                    <h3 className="font-cinzel text-stone-100 text-2xl md:text-3xl mb-3 leading-snug">
                      {featured.title}
                    </h3>
                    <p className="font-garamond text-stone-300 text-base md:text-lg max-w-2xl leading-relaxed">
                      {featured.description}
                    </p>
                  </div>
                  {/* FEATURED badge */}
                  <div className="hidden md:block flex-shrink-0">
                    <div
                      className="px-4 py-2 rounded-lg text-xs font-cinzel text-yellow-400 tracking-[0.2em] uppercase"
                      style={{ background: 'rgba(8,10,6,0.9)', border: '1px solid rgba(212,160,23,0.3)' }}
                    >
                      Featured
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {regular.map((video, i) => {
            const videoKey = `${video.youtubeId}-${i}`;
            const isHovered = hoveredId === videoKey;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'linear-gradient(145deg, #141a0d, #0d120a)',
                  border: isHovered ? '1px solid rgba(212,160,23,0.4)' : '1px solid rgba(212,160,23,0.12)',
                  boxShadow: isHovered ? '0 20px 60px rgba(212,160,23,0.1)' : 'none',
                  transition: 'all 0.4s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                }}
                onClick={() => setActiveVideo(video)}
                onMouseEnter={() => setHoveredId(videoKey)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveVideo(video)}
                aria-label={`Play video: ${video.title}`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,10,6,0.85) 0%, rgba(8,10,6,0.2) 100%)' }} />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon size="lg" />
                  </div>

                  {/* Duration badge */}
                  <div
                    className="absolute bottom-3 right-3 font-inter text-xs text-stone-200 px-2 py-0.5 rounded"
                    style={{ background: 'rgba(8,10,6,0.88)' }}
                  >
                    {video.duration}
                  </div>

                  {/* Year tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="font-inter text-[9px] tracking-widest uppercase px-2 py-1 rounded"
                      style={{ background: 'rgba(8,10,6,0.85)', color: 'rgba(212,160,23,0.8)', border: '1px solid rgba(212,160,23,0.25)' }}
                    >
                      {video.year}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-cinzel text-stone-100 text-base mb-2 leading-snug group-hover:text-yellow-400 transition-colors duration-300">
                    {video.title}
                  </h4>
                  <p className="font-garamond text-stone-400 text-sm leading-relaxed flex-1">{video.description}</p>
                  
                  <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(212,160,23,0.1)' }}>
                    <div className="flex items-center gap-2 text-yellow-500/60 text-xs font-inter group-hover:text-yellow-400 transition-colors duration-300">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch on YouTube</span>
                    </div>
                    <span className="font-inter text-xs text-stone-600">{video.duration}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(8,10,6,0.97)', backdropFilter: 'blur(24px)' }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="font-inter text-xs text-yellow-600/60 tracking-widest uppercase mb-1">Now Playing</div>
                  <h3 className="font-cinzel text-stone-100 text-lg md:text-xl leading-snug">{activeVideo.title}</h3>
                  <p className="font-inter text-stone-500 text-sm mt-1">{activeVideo.year} &nbsp;·&nbsp; {activeVideo.duration}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-all duration-200 ml-4 flex-shrink-0"
                  style={{ borderColor: 'rgba(212,160,23,0.2)' }}
                  aria-label="Close video player"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* YouTube embed */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  paddingBottom: '56.25%',
                  border: '1px solid rgba(212,160,23,0.2)',
                  boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,160,23,0.1)',
                }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <p className="font-garamond text-stone-400 text-base mt-4 leading-relaxed">{activeVideo.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
