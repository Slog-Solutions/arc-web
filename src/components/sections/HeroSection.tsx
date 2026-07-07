// src/components/sections/HeroSection.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  tagline?: string;
  established?: string;
  motto?: string;
  mottoMeaning?: string;
  backgroundImage?: string;
  badge?: string;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1920&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
  'https://images.unsplash.com/photo-1471644946846-4ce53acaab6b?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
];

export default function HeroSection({
  title,
  subtitle,
  tagline,
  established,
  motto,
  mottoMeaning,
  backgroundImage,
  badge,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const bgImage = backgroundImage || HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];

  return (
    <div ref={ref} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-olive-950/60" />
        <div className="absolute inset-0 hero-overlay" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,12,8,0.7) 100%)'
        }} />
        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ opacity }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-inter tracking-[0.3em] uppercase border text-yellow-500/80"
              style={{ background: 'rgba(212,160,23,0.08)', borderColor: 'rgba(212,160,23,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Established */}
        {established && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-10 bg-yellow-700/60" />
            <span className="font-inter text-xs text-yellow-600/70 tracking-[0.4em] uppercase">Est. {established}</span>
            <div className="h-px w-10 bg-yellow-700/60" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-stone-100 mb-4"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-garamond text-xl md:text-2xl text-stone-300/80 max-w-2xl mb-6 leading-relaxed italic"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Motto */}
        {motto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="divider-gold mb-4" style={{ width: '120px' }} />
            <div className="font-cinzel text-yellow-500 text-lg tracking-[0.3em] uppercase">{motto}</div>
            {mottoMeaning && (
              <div className="font-garamond text-stone-400 text-sm italic">{mottoMeaning}</div>
            )}
          </motion.div>
        )}

        {/* Tagline */}
        {tagline && !motto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-garamond text-yellow-500/70 italic text-base md:text-lg"
          >
            {tagline}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-xs text-stone-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-600/80 to-transparent"
              style={{ height: '100%' }}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
