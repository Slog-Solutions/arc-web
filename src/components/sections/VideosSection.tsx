// src/components/sections/VideosSection.tsx — REFINED (Museum Cinema Room)
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import type { VideoItem } from '../../types';

interface Props {
  videos: VideoItem[];
}

function PlayIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const iconDim = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
      style={{
        background: 'rgba(212,160,23,0.18)',
        border: '2px solid #d4a017',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 20px rgba(212,160,23,0.3)',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featured = videos.find(v => v.featured);
  const regular = videos.filter(v => !v.featured);

  return (
    <section id="videos" className="relative py-32 museum-room-wall spotlight-glow overflow-hidden">

      {/* Film Strip Top Border Ornament */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#0a0c08] flex items-center justify-around pointer-events-none opacity-20">
        {Array.from({ length: 30 }).map((_, idx) => (
          <div key={idx} className="w-3 h-2.5 bg-[#d4a017]/40 rounded-sm" />
        ))}
      </div>

      <div className="museum-container">
        <SectionHeader
          tag="Documentary Screening"
          title="Regimental Cinema"
          subtitle="Sit back and watch historical documentary reels and border patrol footage from our digital archives."
        />

        {/* ── Featured Video (Cinematic Exhibition Screen) ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '96px' }}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="font-inter text-xs text-yellow-600/70 tracking-[0.3em] uppercase">Now Screening</span>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-700/30 to-transparent" />
            </div>

            {/* Projection Frame */}
            <div className="museum-wood-frame brass-corners rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
              <div
                className="relative cursor-pointer group"
                style={{ height: '520px' }}
                onClick={() => setActiveVideo(featured)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveVideo(featured)}
                aria-label={`Screen video: ${featured.title}`}
              >
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.75]"
                />

                {/* Cinematic Spotlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Projection Screen shimmer line */}
                <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '128px',
                }} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <PlayIcon size="lg" />
                        <div>
                          <div className="font-inter text-xs text-yellow-500 tracking-widest uppercase">Start Screening</div>
                          <div className="font-inter text-stone-400 text-xs mt-0.5">{featured.duration} &nbsp;·&nbsp; Reel Year: {featured.year}</div>
                        </div>
                      </div>

                      <h3 className="font-cinzel text-stone-100 text-2xl md:text-3.5xl mb-3 font-bold leading-snug">
                        {featured.title}
                      </h3>
                      <p className="font-garamond text-stone-300 text-base md:text-lg max-w-3xl leading-relaxed italic">
                        {featured.description}
                      </p>
                    </div>

                    <div className="hidden md:block flex-shrink-0">
                      <span className="brass-plate text-xs font-bold px-4 py-1.5">
                        Historical Reel
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Secondary Archive Reels (Grid) ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regular.map((video, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group cursor-pointer museum-wood-frame brass-corners rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_15px_40px_rgba(212,160,23,0.18)] transition-all duration-400 transform hover:-translate-y-1.5"
                onClick={() => setActiveVideo(video)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setActiveVideo(video)}
                aria-label={`Play video: ${video.title}`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c08] via-transparent to-transparent" />

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon size="lg" />
                  </div>

                  {/* Reel Duration tag */}
                  <div
                    className="absolute bottom-3 right-3 font-inter text-[10px] tracking-widest text-stone-200 px-2 py-0.5 rounded"
                    style={{ background: 'rgba(8,10,6,0.92)' }}
                  >
                    {video.duration}
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="font-inter text-[9px] tracking-widest uppercase px-2.5 py-1 rounded bg-[#0a0c08]/90 text-yellow-500 border border-yellow-500/20"
                    >
                      Reel {video.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border-t border-[#443118]/40">
                  <h4 className="font-cinzel text-stone-100 text-base mb-2 font-bold leading-snug group-hover:text-yellow-400 transition-colors duration-300">
                    {video.title}
                  </h4>
                  <p className="font-garamond text-stone-400 text-sm leading-relaxed flex-1 italic">{video.description}</p>

                  <div className="mt-5 pt-4 flex items-center justify-between border-t border-[#443118]/30">
                    <div className="flex items-center gap-2 text-yellow-500/70 text-xs font-inter group-hover:text-yellow-400 transition-colors duration-300">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch Archive Reel</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Projector Screening Modal ──────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
              style={{ background: 'rgba(6,8,4,0.98)', backdropFilter: 'blur(30px)' }}
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl max-h-full flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex flex-shrink-0 items-start justify-between mb-4 md:mb-6">
                  <div>
                    <div className="font-inter text-xs text-yellow-600/70 tracking-widest uppercase mb-1">Archive Playback</div>
                    <h3 className="font-cinzel text-stone-100 text-lg md:text-xl font-bold leading-snug">{activeVideo.title}</h3>
                    <p className="font-inter text-stone-500 text-xs mt-1">Reel Date: {activeVideo.year} &nbsp;·&nbsp; Duration: {activeVideo.duration}</p>
                  </div>
                  
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-all duration-200 ml-4 flex-shrink-0"
                    style={{ borderColor: 'rgba(212,160,23,0.3)' }}
                    aria-label="Close screening"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Projection Box */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden flex-shrink min-h-0"
                  style={{
                    aspectRatio: '16 / 9',
                    maxHeight: '65vh',
                    border: '10px solid #2b1d0c',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,160,23,0.2)',
                    margin: '0 auto'
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

                <p className="font-garamond text-stone-400 text-sm md:text-base mt-4 md:mt-6 leading-relaxed italic flex-shrink-0 overflow-y-auto max-h-[15vh]">{activeVideo.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
