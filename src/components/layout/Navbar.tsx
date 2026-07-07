// src/components/layout/Navbar.tsx — REFINED (12-Column Ceremonial Museum Grid)
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
        style={{
          backgroundColor: '#0A0A0A',
          backdropFilter: 'blur(10px)',
          opacity: 0.96,
          boxShadow: scrolled 
            ? '0 12px 40px rgba(0,0,0,0.45), inset 0 -1px rgba(255,215,120,0.18), inset 0 1px rgba(255,255,255,0.04)' 
            : 'inset 0 -1px rgba(255,215,120,0.18), inset 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-2 left-6 text-[#C6A768] text-[10px] opacity-60 pointer-events-none">✦</div>
        <div className="absolute top-2 right-6 text-[#C6A768] text-[10px] opacity-60 pointer-events-none">✦</div>

        {/* Height and generous padding container */}
        <div 
          className="w-full mx-auto px-10 md:px-20 lg:px-24 transition-all duration-500" 
          style={{ height: scrolled ? '86px' : '104px' }}
        >
          {/* 12-Column Grid Layout */}
          <div className="w-full h-full grid grid-cols-12 gap-6 items-center">
            
            {/* ── 3 COLUMNS: LOGO (Approx 25%) ── */}
            <div className="col-span-8 lg:col-span-3 flex items-center">
              <Link to="/" className="flex items-center gap-6 group">
                {/* Emblem inside thin antique gold circular ring */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0"
                  style={{
                    borderColor: 'rgba(198, 167, 104, 0.5)',
                    background: '#0A0A0A',
                    boxShadow: 'inset 0 0 15px rgba(198, 167, 104, 0.1), 0 0 15px rgba(198, 167, 104, 0.05)',
                  }}
                >
                  <span className="text-2xl select-none group-hover:scale-105 transition-transform duration-300">🦏</span>
                </div>
                
                <div className="flex flex-col justify-center">
                  <span 
                    className="font-cinzel text-xs lg:text-[13px] tracking-[0.25em] uppercase font-bold leading-tight"
                    style={{ color: '#F6F2EB', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    Assam Regiment
                  </span>
                  <span 
                    className="font-cinzel text-[9px] lg:text-[10px] tracking-[0.4em] uppercase leading-tight mt-1"
                    style={{ color: '#8A7A58' }}
                  >
                    Digital Museum
                  </span>
                </div>
              </Link>
            </div>

            {/* ── 7 COLUMNS: NAVIGATION GROUP (Approx 55%) ── */}
            <div className="hidden lg:flex col-span-7 justify-center">
              {/* Compact cluster, not stretched */}
              <div className="flex items-center gap-12">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="relative group py-3 flex flex-col items-center"
                    >
                      <motion.span
                        className="font-cinzel text-[13px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                        style={{ color: isActive ? '#E2C98A' : '#C6A768' }}
                        whileHover={{ y: -2, color: '#E2C98A', textShadow: '0 0 8px rgba(226, 201, 138, 0.4)' }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Active indicator: glowing gold line expanding from center with faded edges */}
                      <span
                        className="absolute bottom-0 h-[2px] transition-all duration-500"
                        style={{
                          width: isActive ? '100%' : '0%',
                          background: 'linear-gradient(90deg, transparent, #E2C98A, transparent)',
                          boxShadow: isActive ? '0 0 8px rgba(226, 201, 138, 0.6)' : 'none',
                          opacity: isActive ? 1 : 0,
                          borderRadius: '100%',
                        }}
                      />

                      {/* Hover line transition */}
                      {!isActive && (
                        <span
                          className="absolute bottom-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                          style={{ 
                            width: '100%', 
                            background: 'linear-gradient(90deg, transparent, #C6A768, transparent)',
                            borderRadius: '100%'
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── 2 COLUMNS: MOTTO BADGE (Approx 20%) ── */}
            <div className="hidden lg:flex col-span-2 justify-end">
              <div 
                className="font-cinzel text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 rounded-[4px] transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                style={{
                  border: '1px solid rgba(198, 167, 104, 0.4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#C6A768',
                  boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.05), 0 4px 15px rgba(0, 0, 0, 0.5)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                Asam Vikram • Tagra Raho
              </div>
            </div>

            {/* Mobile menu trigger */}
            <div className="col-span-4 lg:hidden flex justify-end">
              <button
                className="w-12 h-12 rounded flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(198, 167, 104, 0.3)',
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                id="mobile-menu-btn"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-[1.5px] bg-[#C6A768] transition-all duration-300"
                    style={{
                      width: '22px',
                      opacity: i === 1 && menuOpen ? 0 : 1,
                      transform:
                        menuOpen
                          ? i === 0
                            ? 'rotate(45deg) translate(5px, 5px)'
                            : i === 2
                            ? 'rotate(-45deg) translate(5px, -5px)'
                            : 'none'
                          : 'none',
                    }}
                  />
                ))}
              </button>
            </div>

          </div>
        </div>

        {/* Embossed thin gold bottom divider */}
        <div 
          className="w-full h-[1px] absolute bottom-0 left-0" 
          style={{ 
            background: 'linear-gradient(90deg, transparent, #C6A768, transparent)',
            opacity: 0.8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.8)'
          }} 
        />
      </motion.nav>

      {/* Mobile view panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-40 flex flex-col justify-center"
            style={{ background: '#0A0A0A', borderTop: '1px solid rgba(198,167,104,0.3)' }}
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="font-cinzel text-xl md:text-2xl tracking-[0.25em] uppercase hover:text-[#E2C98A]"
                  style={{ color: '#C6A768' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
