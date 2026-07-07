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

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-50"
        style={{
          top: '10px',
          left: '10px',
          right: '10px',
        }}
      >
        {/* ── Three Stars Tab centered on top ── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-2"
          style={{
            top: '-13px',
            zIndex: 10,
            width: '80px',
            height: '22px',
            background: '#0e0c0a',
            border: '1px solid #8a6820',
            borderBottom: 'none',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <span style={{ color: '#b8922a', fontSize: '9px', opacity: 0.6 }}>★</span>
          <span style={{ color: '#d4a830', fontSize: '12px' }}>★</span>
          <span style={{ color: '#b8922a', fontSize: '9px', opacity: 0.6 }}>★</span>
        </div>

        {/* ── Main Bar ── */}
        <div
          className="relative w-full flex items-center"
          style={{
            height: '96px',
            background: 'linear-gradient(180deg, #1a1510 0%, #0e0c09 40%, #0b0906 100%)',
            border: '1px solid #8a6820',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(200,163,93,0.12), inset 0 0 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Inner top highlight */}
          <div
            className="absolute top-0 left-[60px] right-[60px] h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,93,0.25), transparent)' }}
          />

          {/* ── LEFT: Large Logo Circle ── */}
          <div className="flex-shrink-0 flex items-center" style={{ paddingLeft: '0px' }}>
            {/* The circle extends outside the bar — position it absolutely on the left */}
            <Link to="/" className="group" style={{ marginLeft: '-4px', flexShrink: 0, position: 'relative', top: '24px' }}>
              <div
                className="relative flex items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105"
                style={{
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle at 38% 32%, #211a0e 0%, #100d07 55%, #070503 100%)',
                  border: '2px solid #9a7828',
                  boxShadow: '0 0 0 1px rgba(154,120,40,0.2), 0 0 20px rgba(0,0,0,0.8), inset 0 0 25px rgba(0,0,0,0.5), 0 0 12px rgba(154,120,40,0.12)',
                }}
              >
                {/* Inner ring */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '5px',
                    border: '1px solid rgba(154,120,40,0.25)',
                    borderRadius: '50%',
                  }}
                />
                <img
                  src="/assami/navbar%20logo.png"
                  alt="Assam Regiment"
                  style={{
                    width: "88%",
                    height: "88%",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
                  }}
                />
              </div>
            </Link>
          </div>

          {/* ── LEFT TEXT: Assam Regiment / Digital Museum ── */}
          <div className="hidden md:flex flex-col justify-center flex-shrink-0" style={{ marginLeft: '20px', marginRight: '4px' }}>
            <span
              className="font-cinzel uppercase leading-tight"
              style={{
                fontSize: '20px',
                letterSpacing: '3px',
                color: '#c8a040',
                fontWeight: 600,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
              }}
            >
              Assam Regiment
            </span>
            <span
              className="font-cinzel uppercase leading-tight"
              style={{
                fontSize: '11px',
                letterSpacing: '3.5px',
                color: '#9a7830',
                marginTop: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              Digital Museum
            </span>
          </div>

          {/* ── LEFT SEPARATOR ── */}
          <div
            className="hidden md:block flex-shrink-0"
            style={{
              width: '1px',
              height: '44px',
              margin: '0 18px',
              background: 'linear-gradient(180deg, transparent, #8a6820, transparent)',
            }}
          />

          {/* ── CENTER: Nav Links ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex items-center">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={item.id} className="flex items-center">
                    <Link
                      to={item.path}
                      className="relative group flex flex-col items-center"
                      style={{ padding: '6px 20px' }}
                    >
                      {/* Active glow spotlight */}
                      {isActive && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(ellipse at center, rgba(200,163,93,0.07) 0%, transparent 70%)',
                          }}
                        />
                      )}
                      <motion.span
                        className="font-cinzel uppercase relative z-10"
                        style={{
                          fontSize: '13px',
                          letterSpacing: '2.5px',
                          fontWeight: 500,
                          color: isActive ? '#f0c84a' : '#c8a040',
                          whiteSpace: 'nowrap',
                          textShadow: isActive ? '0 0 10px rgba(240,200,74,0.35)' : 'none',
                          lineHeight: 1,
                        }}
                        whileHover={{ color: '#f0c84a', textShadow: '0 0 10px rgba(240,200,74,0.35)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>

                      {/* Active underline */}
                      <motion.span
                        className="absolute"
                        style={{
                          bottom: '3px',
                          left: '20px',
                          right: '20px',
                          height: '1.5px',
                          background: 'linear-gradient(90deg, transparent, #f0c84a, transparent)',
                          boxShadow: '0 0 8px rgba(240,200,74,0.5)',
                          originX: '0.5',
                          scaleX: isActive ? 1 : 0,
                        }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.35 }}
                      />
                      {/* Hover underline */}
                      {!isActive && (
                        <span
                          className="absolute scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                          style={{
                            bottom: '3px',
                            left: '20px',
                            right: '20px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #a87e35, transparent)',
                          }}
                        />
                      )}
                    </Link>

                    {/* Bullet separator */}
                    {i < navItems.length - 1 && (
                      <span
                        style={{ color: '#6a5020', fontSize: '8px', lineHeight: 1, flexShrink: 0 }}
                      >
                        ◆
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT SEPARATOR ── */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{
              width: '1px',
              height: '44px',
              margin: '0 18px',
              background: 'linear-gradient(180deg, transparent, #8a6820, transparent)',
            }}
          />

          {/* ── RIGHT: Mini Badge + Motto ── */}
          <div className="hidden lg:flex items-center flex-shrink-0" style={{ paddingRight: '20px', gap: '10px' }}>
            {/* Small bordered square with miniature logo */}
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: '52px',
                height: '52px',
                border: '1px solid #8a6820',
                background: 'radial-gradient(circle, #1a1408, #0a0806)',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)',
                flexShrink: 0,
              }}
            >
              <img
                src="/assami/navbar%20logo.png"
                alt="Crest"
                style={{ width: '78%', height: '78%', objectFit: 'contain', opacity: 0.9 }}
              />
            </div>
            {/* Motto text */}

          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="lg:hidden ml-auto" style={{ paddingRight: '16px' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded"
              style={{ border: '1px solid rgba(138,104,32,0.4)', background: 'rgba(12,10,8,0.6)' }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block transition-all duration-300"
                  style={{
                    width: '20px',
                    height: '1.5px',
                    background: '#c8a040',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>

          {/* ── Left & Right decorative endcaps ── */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '3px',
              height: '28px',
              background: 'linear-gradient(180deg, transparent, #9a7828, transparent)',
              borderRadius: '2px',
            }}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '3px',
              height: '28px',
              background: 'linear-gradient(180deg, transparent, #9a7828, transparent)',
              borderRadius: '2px',
            }}
          />
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
            style={{ background: 'rgba(10,8,6,0.97)', backdropFilter: 'blur(16px)' }}
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
                    className="font-cinzel uppercase tracking-[4px] text-xl transition-colors duration-300 hover:text-[#f0c84a]"
                    style={{ color: location.pathname === item.path ? '#f0c84a' : '#a87e35' }}
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