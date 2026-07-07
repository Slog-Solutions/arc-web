// src/components/layout/SectionNav.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'history', label: 'History', icon: '📜' },
  { id: 'commanding-officers', label: 'Commanding Officers', icon: '⭐' },
  { id: 'achievements', label: 'Achievements', icon: '🎖️' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
];

export default function SectionNav() {
  const [active, setActive] = useState('history');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showOnScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', showOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', showOnScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 hidden md:flex"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group relative flex items-center justify-end"
              title={s.label}
            >
              {/* Label tooltip */}
              <div className={`absolute right-8 px-3 py-1.5 rounded-lg text-xs font-inter whitespace-nowrap transition-all duration-200 border pointer-events-none ${
                active === s.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
                style={{
                  background: 'rgba(10,12,8,0.95)',
                  borderColor: 'rgba(212,160,23,0.25)',
                  color: active === s.id ? '#f0ca50' : '#a89070',
                }}>
                {s.label}
              </div>
              {/* Dot */}
              <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                active === s.id
                  ? 'bg-yellow-500 border-yellow-400 shadow-[0_0_10px_rgba(212,160,23,0.6)]'
                  : 'bg-transparent border-stone-600 group-hover:border-yellow-700'
              }`} />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
