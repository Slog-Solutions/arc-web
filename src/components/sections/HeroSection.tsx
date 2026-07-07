// src/components/sections/HeroSection.tsx - REFINED
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
  
  // Parallax / Zoom effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen min-h-[650px] overflow-hidden bg-olive-950 flex items-center justify-center">
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Darker premium gradient overlays to keep text perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-olive-950 via-olive-950/60 to-black/60" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10,12,8,0.85) 100%)'
          }} 
        />
        
        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }} />
      </motion.div>

      {/* Hero Content Container */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center justify-center pt-16"
        style={{ opacity }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-6"
          >
            <span 
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-inter tracking-[0.25em] uppercase border text-yellow-500/90 shadow-lg"
              style={{ background: 'rgba(212,160,23,0.06)', borderColor: 'rgba(212,160,23,0.3)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Established Date */}
        {established && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600/60" />
            <span className="font-inter text-xs text-yellow-600/80 tracking-[0.35em] uppercase">Est. {established}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600/60" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-stone-100 mb-6 font-bold leading-tight"
          style={{ textShadow: '0 4px 35px rgba(0,0,0,0.9)' }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-garamond text-2xl md:text-3xl text-stone-200/90 max-w-3xl mb-8 leading-relaxed italic"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Motto / Tagline ornament block */}
        {motto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent w-48 mb-4" />
            <div className="font-cinzel text-yellow-500 text-xl tracking-[0.3em] uppercase leading-none">{motto}</div>
            {mottoMeaning && (
              <div className="font-garamond text-stone-400 text-base italic mt-1">{mottoMeaning}</div>
            )}
          </motion.div>
        )}

        {tagline && !motto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="font-garamond text-yellow-500/80 italic text-lg md:text-xl"
          >
            {tagline}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <span className="font-inter text-[10px] text-stone-500 tracking-[0.25em] uppercase">Scroll to enter</span>
          <div className="w-px h-14 relative overflow-hidden bg-stone-800">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-500 to-transparent"
              style={{ height: '70%' }}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
