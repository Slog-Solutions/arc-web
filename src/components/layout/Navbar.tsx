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

  // Color Palette Constants matching the reference exactly (10% less saturated bronze colors)
  const BRONZE = '#85683c'; 
  const MUTED_BORDER = 'rgba(133, 104, 60, 0.3)';
  const BG_COLOR = '#050806'; // Extremely dark green-black
  const SECONDARY_COLOR = '#0a0f0c';

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
            boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.95), 0 12px 40px rgba(0, 0, 0, 0.65)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Subtle noise vignette/texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              borderRadius: '8px'
            }}
          />

          {/* Thin, precise vector corner ornaments */}
          <img src="/assets/navbar/corner-top-left.svg" className="absolute top-[6px] left-[6px] w-6 h-6 pointer-events-none" alt="" />
          <img src="/assets/navbar/corner-top-right.svg" className="absolute top-[6px] right-[6px] w-6 h-6 pointer-events-none" alt="" />
          <img src="/assets/navbar/corner-bottom-left.svg" className="absolute bottom-[6px] left-[6px] w-6 h-6 pointer-events-none" alt="" />
          <img src="/assets/navbar/corner-bottom-right.svg" className="absolute bottom-[6px] right-[6px] w-6 h-6 pointer-events-none" alt="" />

          {/* ── SECTION 1: Logo & Title (30% - Fixed Width Grid) ── */}
          <div className="flex items-center h-full pl-6 relative" style={{ gap: '30px' }}>
            {/* Logo circle: Diameter ~70px, positioned slightly lower */}
            <Link to="/" className="relative group flex-shrink-0 outline-none focus:outline-none" style={{ zIndex: 20, transform: 'translateY(4px)' }}>
              <div 
                className="rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  width: '70px',
                  height: '70px',
                  border: `1.2px solid ${BRONZE}`,
                  background: `radial-gradient(circle, ${SECONDARY_COLOR}, ${BG_COLOR})`,
                  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8)',
                }}
              >
                <img src="/assami/navbar%20logo.png" alt="Assam Regiment" className="w-[84%] h-[84%] object-contain" />
              </div>
            </Link>

            {/* Title block: Shifted 18px right, centered vertically together */}
            <div className="flex flex-col items-center justify-center flex-grow text-center" style={{ minWidth: '220px', marginLeft: '18px' }}>
              <span className="font-cinzel text-[#E1BC78] text-[29px] font-semibold tracking-[2px] leading-none mb-2.5">
                ASSAM REGIMENT
              </span>
              <span className="font-cinzel text-[#85683c] text-[10px] tracking-[8px] uppercase leading-none mb-3">
                DIGITAL MUSEUM
              </span>
              <img src="/assets/navbar/logo-divider.svg" className="w-[120px] h-[12px] opacity-80 pointer-events-none" alt="" />
            </div>

            {/* Vertical Separator - Shifted 30px right and centered vertically */}
            <div 
              className="absolute right-[-30px] top-[14px] bottom-[14px] w-[1px]"
              style={{ background: `linear-gradient(180deg, transparent, rgba(133, 104, 60, 0.25) 20%, rgba(133, 104, 60, 0.25) 80%, transparent)` }}
            />
          </div>

          {/* ── SECTION 2: Navigation Section (52%) ── */}
          <div className="hidden lg:flex items-center justify-center h-full relative" style={{ paddingLeft: '44px' }}>
            {/* Centered navigation container (760px) */}
            <div className="flex items-center justify-center relative h-full" style={{ width: '760px' }}>
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                
                // Split label into exactly three lines for optical baseline consistency
                const words = item.label.split(' ');
                let line1 = words[0] || '';
                let line2 = words[1] || '';
                let line3 = words[2] || '';

                return (
                  <div key={item.id} className="flex items-center justify-center h-full relative">
                    <Link
                      to={item.path}
                      className="flex items-start justify-center text-center transition-all duration-300 outline-none focus:outline-none"
                      style={{ width: '140px', height: '80px', paddingTop: '14px' }}
                    >
                      <span 
                        className={`font-cinzel text-[12px] tracking-[2.5px] uppercase leading-[1.4] transition-all duration-300 ${isActive ? 'text-[#E1BC78] font-bold' : 'text-[#85683c] font-semibold'}`}
                        style={{
                          textShadow: isActive ? '0 0 10px rgba(225, 188, 120, 0.5)' : 'none',
                          transform: item.id === 'arc' ? 'translateY(-5px)' : 'none',
                        }}
                      >
                        {line1}<br />
                        {line2 || <span className="opacity-0">-</span>}<br />
                        {line3 || <span className="opacity-0">-</span>}
                      </span>
                    </Link>

                    {/* Highly refined diamond divider matching visual system */}
                    {i < navItems.length - 1 && (
                      <img src="/assets/navbar/diamond-divider.svg" className="h-[52px] w-[12px] opacity-[0.25] pointer-events-none mx-2" alt="" />
                    )}
                  </div>
                );
              })}

              {/* Navigation flourish placed inside the 760px block to guarantee mathematical and visual alignment centered directly beneath Arunachal Scouts */}
              <img 
                src="/assets/navbar/nav-divider.svg" 
                className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-[700px] h-[20px] pointer-events-none opacity-95" 
                style={{ 
                  zIndex: 10,
                }} 
                alt="Museum Navigation Divider Flourish" 
              />
            </div>
          </div>

          {/* ── SECTION 3: Motto Badge (18%) ── */}
          <div className="hidden lg:flex items-center justify-end pr-8 h-full">
            {/* Elongated Badge container: 240px wide, exactly 60px high */}
            <div className="relative flex items-center justify-center" style={{ width: '240px', height: '60px' }}>
              <img src="/assets/navbar/badge-frame.svg" className="absolute inset-0 w-[240px] h-[64px] pointer-events-none" alt="" />
              <img src="/assets/navbar/badge-decoration.svg" className="absolute inset-0 w-[240px] h-[64px] pointer-events-none" alt="" />
              
              {/* Vertically and horizontally centered text */}
              <div className="flex flex-col items-center justify-center text-center relative z-10 pt-[2px] h-full">
                <span className="font-cinzel text-[#F4E8D3] text-[11px] font-semibold tracking-[3px] uppercase leading-none mb-1.5">ASAM VIKRAM</span>
                <span className="font-cinzel text-[#C88B47] text-[10px] font-semibold tracking-[3px] uppercase leading-none">TAGRA RAHO</span>
              </div>
            </div>
          </div>

          {/* ── Mobile Hamburger (Fallback) ── */}
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
                  className="block transition-all duration-300 bg-[#85683c]"
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
                    style={{ color: location.pathname === item.path ? '#F4E8D3' : '#85683c' }}
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