// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { navItems } from '../../data/navigation';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t" style={{ borderColor: 'rgba(212,160,23,0.15)', background: '#080a06' }}>
      {/* Top divider */}
      <div className="divider-gold" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-yellow-700/40"
                style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 70%)' }}>
                <span className="text-2xl">🦏</span>
              </div>
              <div>
                <div className="font-cinzel text-yellow-500/90 tracking-wider text-sm">Assam Regimental Centre</div>
                <div className="text-stone-500 text-xs font-inter tracking-widest">EST. 1941</div>
              </div>
            </div>
            <p className="text-stone-500 text-sm font-inter leading-relaxed">
              The premier military heritage centre of Northeast India, preserving the legacy of valour, sacrifice, and duty since 1941.
            </p>
            <div className="mt-6">
              <div className="text-yellow-600/80 font-cinzel text-xs tracking-widest">"ASAM VIKRAM"</div>
              <div className="text-stone-600 text-xs font-inter mt-1">Unique Valour</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-cinzel text-yellow-600/80 text-xs tracking-[0.3em] uppercase mb-6">Units</h4>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-stone-400 hover:text-yellow-400 transition-colors duration-200 text-sm font-inter flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-yellow-700/40 group-hover:bg-yellow-500/60 transition-all duration-200 group-hover:w-6" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Motto & Location */}
          <div>
            <h4 className="font-cinzel text-yellow-600/80 text-xs tracking-[0.3em] uppercase mb-6">Regimental Centre</h4>
            <div className="space-y-4">
              <div>
                <div className="text-stone-500 text-xs font-inter uppercase tracking-widest mb-1">Location</div>
                <div className="text-stone-300 text-sm font-inter">Happy Valley, Shillong</div>
                <div className="text-stone-500 text-xs font-inter">Meghalaya, India</div>
              </div>
              <div>
                <div className="text-stone-500 text-xs font-inter uppercase tracking-widest mb-1">Established</div>
                <div className="text-stone-300 text-sm font-inter">15 June 1941</div>
              </div>
              <div>
                <div className="text-stone-500 text-xs font-inter uppercase tracking-widest mb-1">War Cry</div>
                <div className="text-yellow-500/90 text-sm font-cinzel tracking-widest">"Rhino Charge!"</div>
              </div>
              <div>
                <div className="text-stone-500 text-xs font-inter uppercase tracking-widest mb-1">Salutation</div>
                <div className="text-yellow-500/90 text-sm font-cinzel tracking-widest">"Tagra Raho"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-gold mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-stone-600 text-xs font-inter text-center md:text-left">
            © 2024 Assam Regimental Centre, Shillong. All Rights Reserved.
          </div>
          <div className="text-stone-600 text-xs font-inter text-center">
            Built with honour for the digital archive of India's military heritage.
          </div>
        </div>
      </div>
    </footer>
  );
}
