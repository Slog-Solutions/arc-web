// src/components/layout/Navbar.tsx — REFINED (centered links, taller, premium hover)
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8, 10, 6, 0.97)'
            : 'linear-gradient(180deg, rgba(8,10,6,0.9) 0%, rgba(8,10,6,0.4) 80%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'blur(6px)',
          borderBottom: scrolled ? '1px solid rgba(212,160,23,0.18)' : 'none',
          boxShadow: scrolled ? '0 4px 48px rgba(0,0,0,0.55)' : 'none',
        }}
      >
        {/* Scroll progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.4), transparent)' }} />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12" style={{ height: scrolled ? '68px' : '84px', transition: 'height 0.4s ease', display: 'flex', alignItems: 'center' }}>
          <div className="w-full flex items-center justify-between gap-4">

            {/* ── Logo ─────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                style={{
                  background: 'radial-gradient(circle at 38% 38%, rgba(212,160,23,0.28) 0%, rgba(10,12,8,0.9) 68%)',
                  border: '1.5px solid rgba(212,160,23,0.45)',
                  boxShadow: '0 0 22px rgba(212,160,23,0.12)',
                }}
              >
                <span className="text-[1.35rem] select-none">🦏</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-cinzel text-yellow-400/90 text-sm tracking-[0.18em] leading-snug group-hover:text-yellow-300 transition-colors duration-300">
                  Assam Regimental Centre
                </div>
                <div className="font-inter text-yellow-800/55 text-[9px] tracking-[0.38em] uppercase mt-0.5">
                  Est. 1941 · Happy Valley, Shillong
                </div>
              </div>
            </Link>

            {/* ── Centered Navigation Links ─────────────── */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="relative group px-5 xl:px-6 py-2"
                  >
                    {/* Hover background pill */}
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(212,160,23,0.06)' }}
                    />
                    {/* Label */}
                    <span
                      className={`relative font-cinzel text-[0.8rem] xl:text-[0.85rem] tracking-[0.18em] uppercase transition-all duration-300 ${
                        isActive ? 'text-yellow-400' : 'text-stone-300/80 group-hover:text-yellow-300'
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-5 xl:left-6 right-5 xl:right-6 h-[1.5px] rounded-full transition-all duration-400"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #d4a017, transparent)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    {/* Hover underline (non-active) */}
                    {!isActive && (
                      <span
                        className="absolute bottom-0 left-5 xl:left-6 right-5 xl:right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                        style={{ background: 'rgba(212,160,23,0.35)', transformOrigin: 'center' }}
                      />
                    )}
                    {/* Active glow dot */}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#d4a017', boxShadow: '0 0 8px rgba(212,160,23,0.9)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Badge + Hamburger ───────────────── */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div
                className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'rgba(212,160,23,0.06)',
                  border: '1px solid rgba(212,160,23,0.18)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                <span className="font-cinzel text-yellow-700/80 text-[10px] tracking-[0.28em] uppercase whitespace-nowrap">
                  Rhino Charge!
                </span>
              </div>

              {/* Hamburger */}
              <button
                className="lg:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-[5px] transition-all duration-300"
                style={{
                  background: menuOpen ? 'rgba(212,160,23,0.12)' : 'rgba(212,160,23,0.04)',
                  border: '1px solid rgba(212,160,23,0.2)',
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                id="mobile-menu-btn"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-px bg-yellow-500 transition-all duration-300"
                    style={{
                      width: '18px',
                      opacity: i === 1 && menuOpen ? 0 : 1,
                      transform:
                        menuOpen
                          ? i === 0
                            ? 'rotate(45deg) translate(4px, 4px)'
                            : i === 2
                            ? 'rotate(-45deg) translate(4px, -4px)'
                            : 'none'
                          : 'none',
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen Mobile Menu ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(6, 8, 4, 0.99)', backdropFilter: 'blur(32px)' }}
          >
            {/* Top accent */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #d4a017, transparent)' }} />

            {/* Logo row */}
            <div className="flex items-center gap-3 p-6">
              <span className="text-2xl">🦏</span>
              <span className="font-cinzel text-yellow-500/70 text-sm tracking-wider">Assam Regimental Centre</span>
            </div>

            {/* Links */}
            <div className="flex flex-col items-start gap-2 px-8 pt-4 flex-1">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    className="w-full"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-5 py-4 px-5 rounded-xl w-full transition-all duration-300 ${
                        isActive ? 'text-yellow-400' : 'text-stone-300 hover:text-yellow-300'
                      }`}
                      style={{
                        background: isActive ? 'rgba(212,160,23,0.08)' : 'transparent',
                        borderLeft: isActive ? '2px solid #d4a017' : '2px solid transparent',
                      }}
                    >
                      <span className="font-cinzel text-2xl tracking-widest uppercase">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom motto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 flex flex-col gap-1"
            >
              <div className="h-px w-24 mb-4" style={{ background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
              <div className="font-cinzel text-yellow-600/55 text-xs tracking-[0.4em] uppercase">Asam Vikram · Unique Valour</div>
              <div className="font-garamond text-stone-600 text-sm italic mt-0.5">Est. 15 June 1941 · Happy Valley, Shillong</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
