// src/components/layout/Footer.tsx — REFINED (Museum Exit Hall Layout)
import { Link } from 'react-router-dom';
import { navItems } from '../../data/navigation';

const unitHighlights = [
  { label: 'Battle Honours', value: '28+', desc: 'Assam Regiment' },
  { label: 'Gallantry Awards', value: '500+', desc: 'All Units Combined' },
  { label: 'Years of Sentinel Duty', value: '189+', desc: 'Assam Rifles' },
  { label: 'Active Battalions', value: '21+', desc: 'Assam Regiment' },
];

export default function Footer() {
  return (
    <footer className="relative py-24 bg-[#060806] border-t-2 border-[#2b1d0c] overflow-hidden">

      {/* Subtle exit hall background image overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none filter brightness-50 contrast-125"
        style={{
          backgroundImage: 'url("/assami/shillong/shillong-happy-valley.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c08] via-transparent to-black pointer-events-none" />

      {/* Decorative top brass border line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4a017] to-transparent mb-16" />

      {/* Museum Stats Board */}
      <div className="relative z-10 w-[94%] max-w-[1600px] mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x border-b border-t border-[#443118]/30 py-10" style={{ borderColor: 'rgba(212,160,23,0.12)' }}>
          {unitHighlights.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="font-cinzel text-3xl md:text-4xl font-bold text-gold-gradient">
                {stat.value}
              </div>
              <div className="font-inter text-stone-400 text-[10px] tracking-widest uppercase mt-1.5">{stat.label}</div>
              <div className="font-garamond text-stone-600 text-xs italic mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 4-Column Layout */}
      <div className="relative z-10 w-[94%] max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

        {/* Column 1: About the Museum */}
        <div>
          <div className="flex items-center gap-3.5 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border border-yellow-500/20"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(212,160,23,0.2) 0%, rgba(10,12,8,0.9) 70%)',
              }}
            >
              <span className="text-xl select-none">🦏</span>
            </div>
            <div>
              <div className="font-cinzel text-yellow-500/90 text-sm tracking-wider font-bold">Assam Regiment</div>
              <div className="text-stone-500 text-[9px] font-inter tracking-[0.25em] uppercase mt-0.5">Heritage Centre</div>
            </div>
          </div>

          <p className="text-stone-500 text-[13px] font-inter leading-relaxed mb-6">
            Preserving the living legacy of the Eastern frontier's finest military traditions since 15 June 1941. Happy Valley, Shillong, India.
          </p>

          <div className="inline-flex flex-col gap-1 px-4 py-3 bg-yellow-500/5 border border-yellow-500/15 rounded">
            <div className="font-cinzel text-yellow-500/80 text-xs tracking-widest uppercase">"Asam Vikram"</div>
            <div className="font-garamond text-stone-500 text-xs italic mt-0.5">Unique Valour</div>
          </div>
        </div>

        {/* Column 2: Navigation Exhibits */}
        <div>
          <h4 className="font-cinzel text-yellow-500/80 text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3 font-bold">
            <span className="w-4 h-0.5 bg-[#d4a017] rounded-full" />
            Museum Halls
          </h4>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center gap-3.5 text-stone-400 hover:text-yellow-400 transition-all duration-200 text-xs font-inter uppercase tracking-widest group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]/30 group-hover:bg-[#d4a017] transition-all" />
                <span className="group-hover:translate-x-1.5 transition-transform duration-200">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Visit Information */}
        <div>
          <h4 className="font-cinzel text-yellow-500/80 text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3 font-bold">
            <span className="w-4 h-0.5 bg-[#d4a017] rounded-full" />
            Visit Information
          </h4>
          <div className="space-y-4 text-stone-400 font-inter text-xs">
            <div>
              <div className="text-[10px] text-stone-600 uppercase tracking-widest mb-1 font-bold">Location</div>
              <div>Happy Valley, Shillong, Meghalaya</div>
              <div className="text-stone-500 mt-0.5">Regimental Headquarters Base</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-600 uppercase tracking-widest mb-1 font-bold">Exhibition Hours</div>
              <div>Monday – Saturday: 09:00 – 17:00 hrs</div>
              <div className="text-stone-500 mt-0.5">Sundays & Holidays: Closed</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-600 uppercase tracking-widest mb-1 font-bold">Entry Requirements</div>
              <div>Prior authorization required for civilian access.</div>
            </div>
          </div>
        </div>

        {/* Column 4: Closing Historical Quote */}
        <div>
          <h4 className="font-cinzel text-yellow-500/80 text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3 font-bold">
            <span className="w-4 h-0.5 bg-[#d4a017] rounded-full" />
            Exodus Plaque
          </h4>
          <div className="relative p-5 bg-[#0d120a] border border-[#2b1d0c] rounded">
            <span className="text-yellow-500/20 font-cinzel text-4xl absolute top-2 left-2">“</span>
            <p className="font-garamond text-stone-300 text-sm leading-relaxed italic pl-4 mb-4">
              "Their name and legacy are etched in the granite of Happy Valley, forever immortalized in our national memory."
            </p>
            <div className="text-[9px] text-[#d4a017] uppercase tracking-widest text-right font-cinzel font-semibold">
              — Regimental Chronicles
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 w-[94%] max-w-[1600px] mx-auto mt-20 pt-8 border-t border-[#443118]/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-stone-600 text-xs font-inter">
            © 2026 Assam Regimental Centre, Shillong. All Rights Reserved.
          </div>
          <div className="text-stone-700 text-xs font-inter italic text-center">
            Built with honour for the digital heritage archive of India's finest military traditions.
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-inter">
            <span>Eastern Command</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]/35" />
            <span>Indian Army</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
