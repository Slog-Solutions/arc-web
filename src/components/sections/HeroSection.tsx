// src/components/sections/HeroSection.tsx - REFINED
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface Props {
  title: string | React.ReactNode;
  subtitle?: string;
  tagline?: string;
  established?: string;
  motto?: string;
  mottoMeaning?: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  badge?: string;
  compact?: boolean;
  contentPaddingTop?: string;
  showDividerBelowSubtitle?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  tagline,
  established,
  motto,
  mottoMeaning,
  backgroundImage,
  backgroundImages,
  badge,
  compact = false,
  contentPaddingTop,
  showDividerBelowSubtitle,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rawImages = backgroundImages && backgroundImages.length > 0
    ? backgroundImages
    : backgroundImage
      ? [backgroundImage]
      : [];

  // Safely encode URLs to handle spaces in filenames
  const images = rawImages.map(img => encodeURI(img));

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  // Parallax / Zoom effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-olive-950 flex items-center justify-center ${compact ? 'h-[38vh] min-h-[340px]' : 'h-screen min-h-[800px]'
      }`}>
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: compact ? 0 : y, scale: compact ? 1 : scale }}
      >
        <AnimatePresence initial={false}>
          {images.map((img, idx) => (
            idx === currentImageIndex && (
              <motion.div
                key={img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img})` }}
              />
            )
          ))}
        </AnimatePresence>

        {/* Darker premium gradient overlays to keep text perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C120D] via-olive-950/60 to-black/60" />
        <div className="absolute inset-0 bg-black/45" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(12,18,13,0.85) 100%)'
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
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center justify-center"
        style={{ opacity, paddingTop: contentPaddingTop || (compact ? '110px' : '220px') }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className={compact ? 'mb-4' : 'mb-7'}
          >
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-3 px-6 py-2 border border-[#C69B53]/30 rounded-full bg-[#162218]/40 backdrop-blur-sm shadow-lg">
                <span className="text-[#C69B53] text-[9px]">✦</span>
                <span className="font-cinzel text-[#C69B53] text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold">
                  {badge}
                </span>
                <span className="text-[#C69B53] text-[9px]">✦</span>
              </span>
            </div>
          </motion.div>
        )}

        {/* Established Date */}
        {established && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className={`flex items-center gap-8 ${compact ? 'mb-5' : 'mb-8'}`}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#C69B53]/60" />
            <span className="font-cinzel text-xs text-[#C69B53] font-bold tracking-[0.4em] uppercase">Est. {established}</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#C69B53]/60" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`font-cinzel tracking-wide text-[#F4F0E8] font-bold leading-tight ${compact ? 'text-5xl sm:text-6xl md:text-7xl mb-4' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8'
            }`}
          style={{ textShadow: '0 4px 35px rgba(0,0,0,0.9)' }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className={`flex flex-col items-center ${compact ? 'mb-6' : 'mb-10'}`}
          >
            <p
              className={`font-garamond text-[#C8C0B3] max-w-3xl leading-relaxed italic ${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                }`}
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
            >
              {subtitle}
            </p>
            {showDividerBelowSubtitle && (
              <img
                src="/assets/navbar/logo-divider.svg"
                className="w-[140px] h-[14px] opacity-80 mt-4 pointer-events-none"
                alt=""
              />
            )}
          </motion.div>
        )}

        {/* Motto / Tagline ornament block */}
        {motto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-col items-center gap-2.5"
          >
            <div className={`font-cinzel text-[#C69B53] tracking-[0.3em] uppercase leading-none ${compact ? 'text-sm md:text-base' : 'text-xl'
              }`}>{motto}</div>
            {mottoMeaning && (
              <div className="font-garamond text-[#A8A093] text-base md:text-lg italic mt-1">{mottoMeaning}</div>
            )}
          </motion.div>
        )}

        {tagline && !motto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className={`font-garamond text-yellow-500/80 italic ${compact ? 'text-sm' : 'text-lg md:text-xl'
              }`}
          >
            {tagline}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
