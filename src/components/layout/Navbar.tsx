// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Color Palette Constants matching specifications
  const BRONZE = '#a4783a';
  const HIGHLIGHT = '#d4b270';
  const MUTED_BORDER = 'rgba(164, 120, 58, 0.45)';
  const BG_COLOR = '#0B120E';
  const SECONDARY_COLOR = '#101712';

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 top-4"
        style={{
          width: '98%',
          left: '1%',
          right: '1%',
        }}
      >
        {/* Main Header Box */}
        <div 
          className="relative w-full grid items-center"
          style={{
            height: '104px',
            gridTemplateColumns: '30% 52% 18%',
            background: BG_COLOR,
            border: `1.5px solid ${BRONZE}`,
            borderRadius: '8px',
            boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.8), 0 12px 40px rgba(0, 0, 0, 0.55)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Subtle vignette/texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              borderRadius: '8px'
            }}
          />

          {/* Precise Engraved Corner Ornaments - Top-Left */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-2 left-2 pointer-events-none">
            <path d="M 2 12 L 2 2 L 12 2" stroke={BRONZE} stroke-width="1.5" />
            <path d="M 5 9 L 5 5 L 9 5" stroke={BRONZE} stroke-width="0.75" opacity="0.6" />
            <line x1="2" y1="2" x2="7" y2="7" stroke={BRONZE} stroke-width="1" />
            <circle cx="4.5" cy="4.5" r="1" fill={BRONZE} />
          </svg>

          {/* Precise Engraved Corner Ornaments - Top-Right */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-2 right-2 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M 2 12 L 2 2 L 12 2" stroke={BRONZE} stroke-width="1.5" />
            <path d="M 5 9 L 5 5 L 9 5" stroke={BRONZE} stroke-width="0.75" opacity="0.6" />
            <line x1="2" y1="2" x2="7" y2="7" stroke={BRONZE} stroke-width="1" />
            <circle cx="4.5" cy="4.5" r="1" fill={BRONZE} />
          </svg>

          {/* Precise Engraved Corner Ornaments - Bottom-Left */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-2 left-2 pointer-events-none" style={{ transform: 'scaleY(-1)' }}>
            <path d="M 2 12 L 2 2 L 12 2" stroke={BRONZE} stroke-width="1.5" />
            <path d="M 5 9 L 5 5 L 9 5" stroke={BRONZE} stroke-width="0.75" opacity="0.6" />
            <line x1="2" y1="2" x2="7" y2="7" stroke={BRONZE} stroke-width="1" />
            <circle cx="4.5" cy="4.5" r="1" fill={BRONZE} />
          </svg>

          {/* Precise Engraved Corner Ornaments - Bottom-Right */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-2 right-2 pointer-events-none" style={{ transform: 'scale(-1)' }}>
            <path d="M 2 12 L 2 2 L 12 2" stroke={BRONZE} stroke-width="1.5" />
            <path d="M 5 9 L 5 5 L 9 5" stroke={BRONZE} stroke-width="0.75" opacity="0.6" />
            <line x1="2" y1="2" x2="7" y2="7" stroke={BRONZE} stroke-width="1" />
            <circle cx="4.5" cy="4.5" r="1" fill={BRONZE} />
          </svg>

          {/* ── SECTION 1: Logo & Title (30% - Fixed Width Grid) ── */}
          <div className="flex items-center h-full pl-8 relative" style={{ gap: '30px' }}>
            {/* Logo: Dominant visual anchor, exactly 82px circle */}
            <Link to="/" className="relative group flex-shrink-0">
              <div 
                className="rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  width: '82px',
                  height: '82px',
                  border: `1.5px solid ${BRONZE}`,
                  background: `radial-gradient(circle, ${SECONDARY_COLOR}, ${BG_COLOR})`,
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
                }}
              >
                <img src="/assami/navbar%20logo.png" alt="Assam Regiment" className="w-[85%] h-[85%] object-contain" />
              </div>
            </Link>

            {/* Title & Subtitle Group */}
            <div className="flex flex-col justify-center flex-shrink-0">
              <span className="font-cinzel text-[#E1BC78] text-[24px] font-semibold tracking-[2px] leading-none mb-1 text-shadow-sm">
                ASSAM REGIMENT
              </span>
              <span className="font-cinzel text-[#B88945] text-[10px] tracking-[8px] uppercase leading-none mt-1">
                DIGITAL MUSEUM
              </span>
              {/* Ornament below subtitle - Moved lower & centered */}
              <div className="mt-3.5 w-full flex items-center justify-center opacity-85">
                <div className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent to-[#B88945]" />
                <span className="text-[#E1BC78] text-[10px] px-2 leading-none" style={{ transform: 'translateY(-1px)' }}>❦</span>
                <div className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent to-[#B88945]" />
              </div>
            </div>

            {/* Vertical Separator - Centered, full height relative to content area */}
            <div 
              className="absolute right-0 top-[12px] bottom-[12px] w-[1px]"
              style={{ background: `linear-gradient(180deg, transparent, ${MUTED_BORDER} 20%, ${MUTED_BORDER} 80%, transparent)` }}
            />
          </div>

          {/* ── SECTION 2: Navigation Section (52%) ── */}
          <div className="hidden lg:flex items-center justify-center h-full relative" style={{ paddingLeft: '24px' }}>
            {/* Fixed-width nav container (760px) */}
            <div className="flex items-center justify-center" style={{ width: '760px' }}>
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                
                // Split label into exactly three lines for baseline consistency
                const words = item.label.split(' ');
                let line1 = words[0] || '';
                let line2 = words[1] || '';
                let line3 = words[2] || '';

                return (
                  <div key={item.id} className="flex items-center justify-center h-full">
                    <Link
                      to={item.path}
                      className="flex items-start justify-center text-center transition-all duration-300"
                      style={{ width: '140px', height: '80px', paddingTop: '18px' }}
                    >
                      <span 
                        className={`font-cinzel text-[12px] tracking-[2px] font-semibold uppercase leading-[1.4] transition-colors duration-300 ${isActive ? 'text-[#E1BC78]' : 'text-[#B88945]'}`}
                        style={{
                          textShadow: isActive ? '0 0 8px rgba(225, 188, 120, 0.4)' : 'none',
                          transform: item.id === 'arc' ? 'translateY(-5px)' : 'none',
                        }}
                      >
                        {line1}<br />
                        {line2 || <span className="opacity-0">-</span>}<br />
                        {line3 || <span className="opacity-0">-</span>}
                      </span>
                    </Link>

                    {/* Divider between items with exact vertically centered diamond */}
                    {i < navItems.length - 1 && (
                      <div className="flex flex-col items-center justify-center h-[52px] w-[1px] relative mx-2">
                        <div className="w-[1px] h-full bg-[#B88945] opacity-[0.35]" />
                        <span className="text-[#B88945] text-[7px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] select-none opacity-80">♦</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom decorative flourish under nav - Centered mathematically */}
            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none opacity-50" style={{ width: '280px' }}>
              <div className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent to-[#B88945]" />
              <span className="text-[#E1BC78] text-[10px] px-3 leading-none">❧ ⚜ ☙</span>
              <div className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent to-[#B88945]" />
            </div>
          </div>

          {/* ── SECTION 3: Motto Badge (18%) ── */}
          <div className="hidden lg:flex items-center justify-end pr-8 h-full">
            {/* Badge container: 240px wide, 72px high */}
            <div className="relative flex items-center justify-center" style={{ width: '240px', height: '72px' }}>
              <svg width="240" height="72" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                {/* Outer Border (8-sided) - Stroke matching outer border thickness */}
                <path d="M 12,1 L 228,1 L 239,12 L 239,60 L 228,71 L 12,71 L 1,60 L 1,12 Z" stroke={BRONZE} stroke-width="1.5" fill={SECONDARY_COLOR}/>
                {/* Inner Border (8-sided) */}
                <path d="M 14,4 L 226,4 L 236,14 L 236,58 L 226,68 L 14,68 L 4,58 L 4,14 Z" stroke={MUTED_BORDER} stroke-width="1"/>
                {/* Decorative diamonds on sides */}
                <path d="M 12,36 L 15,33 L 18,36 L 15,39 Z" fill={BRONZE} />
                <path d="M 222,36 L 225,33 L 228,36 L 225,39 Z" fill={BRONZE} />
              </svg>
              
              <div className="flex flex-col items-center justify-center text-center relative z-10 pt-[2px] h-full">
                <span className="font-cinzel text-[#F4E8D3] text-[11px] font-semibold tracking-[3px] uppercase leading-none mb-1.5">ASAM VIKRAM</span>
                <span className="font-cinzel text-[#C88B47] text-[10px] font-semibold tracking-[3px] uppercase leading-none">TAGRA RAHO</span>
              </div>
            </div>
          </div>

          {/* ── Mobile Hamburger (Fallback for viewport scaling) ── */}
          <div className="lg:hidden ml-auto pr-6 z-10">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-sm transition-colors"
              style={{ border: `1px solid ${MUTED_BORDER}`, background: SECONDARY_COLOR }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block transition-all duration-300 bg-[#B88945]"
                  style={{
                    width: '20px',
                    height: '1.5px',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(11,18,14,0.98)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <Link
                    to={item.path}
                    className="font-cinzel uppercase tracking-[4px] text-xl transition-colors duration-300 hover:text-[#F4E8D3]"
                    style={{ color: location.pathname === item.path ? '#F4E8D3' : '#B88945' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}