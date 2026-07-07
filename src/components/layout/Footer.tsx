// src/components/layout/Footer.tsx
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
    <footer className="relative" style={{ background: '#060806', borderTop: '1px solid rgba(212,160,23,0.1)' }}>
      {/* Top gold divider with glow */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, #d4a017 30%, #f0ca50 50%, #d4a017 70%, transparent 100%)' }} />

      {/* Stats row */}
      <div style={{ background: 'rgba(212,160,23,0.04)', borderBottom: '1px solid rgba(212,160,23,0.08)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x" style={{ borderColor: 'rgba(212,160,23,0.1)' }}>
            {unitHighlights.map((stat) => (
              <div key={stat.label} className="text-center px-4 md:px-8">
                <div className="font-cinzel text-3xl md:text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #d4a017, #f0ca50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {stat.value}
                </div>
                <div className="font-inter text-stone-400 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
                <div className="font-garamond text-stone-600 text-xs italic mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand — wide column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'radial-gradient(circle at 40% 40%, rgba(212,160,23,0.2) 0%, rgba(10,12,8,0.95) 70%)',
                  border: '1.5px solid rgba(212,160,23,0.4)',
                  boxShadow: '0 0 30px rgba(212,160,23,0.08)',
                }}
              >
                <span className="text-2xl select-none">🦏</span>
              </div>
              <div>
                <div className="font-cinzel text-yellow-500/90 tracking-wider text-base">Assam Regimental Centre</div>
                <div className="text-stone-500 text-xs font-inter tracking-[0.3em] uppercase mt-0.5">Happy Valley · Shillong</div>
              </div>
            </div>
            
            <p className="text-stone-500 text-sm font-inter leading-relaxed mb-6">
              The premier military heritage and training centre of Northeast India — preserving the living legacy of valour, sacrifice, and duty since 15 June 1941.
            </p>

            {/* Motto Block */}
            <div
              className="inline-flex flex-col gap-1 px-5 py-4 rounded-xl"
              style={{
                background: 'rgba(212,160,23,0.05)',
                border: '1px solid rgba(212,160,23,0.15)',
              }}
            >
              <div className="font-cinzel text-yellow-500/80 text-sm tracking-[0.3em] uppercase">"Asam Vikram"</div>
              <div className="font-garamond text-stone-500 text-sm italic">Unique Valour</div>
              <div className="font-inter text-stone-600 text-[10px] tracking-widest uppercase mt-1">Motto · Assam Regimental Centre</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span
                className="font-cinzel text-yellow-600/60 text-xs tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)' }}
              >
                🔰 Rhino Charge!
              </span>
              <span
                className="font-cinzel text-yellow-600/60 text-xs tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)' }}
              >
                Tagra Raho
              </span>
            </div>
          </div>

          {/* Navigation — 2 columns */}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="font-cinzel text-yellow-600/70 text-xs tracking-[0.35em] uppercase mb-6 flex items-center gap-3">
              <span className="w-5 h-px" style={{ background: '#d4a017' }} />
              Units & Pages
            </h4>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center gap-3 text-stone-400 hover:text-yellow-400 transition-all duration-200 text-sm font-inter group"
                >
                  <span
                    className="w-5 h-px flex-shrink-0 transition-all duration-300"
                    style={{ background: 'rgba(212,160,23,0.3)' }}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact/Info column */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="font-cinzel text-yellow-600/70 text-xs tracking-[0.35em] uppercase mb-6 flex items-center gap-3">
              <span className="w-5 h-px" style={{ background: '#d4a017' }} />
              Regimental Centre
            </h4>
            <div className="space-y-5">
              <div>
                <div className="font-inter text-[10px] text-stone-600 uppercase tracking-widest mb-1">Location</div>
                <div className="font-inter text-stone-300 text-sm">Happy Valley, Shillong</div>
                <div className="font-inter text-stone-600 text-xs mt-0.5">Meghalaya — 793 003</div>
                <div className="font-inter text-stone-600 text-xs">India</div>
              </div>
              <div>
                <div className="font-inter text-[10px] text-stone-600 uppercase tracking-widest mb-1">Established</div>
                <div className="font-inter text-stone-300 text-sm">15 June 1941</div>
                <div className="font-inter text-stone-600 text-xs mt-0.5">83+ years of continuous service</div>
              </div>
              <div>
                <div className="font-inter text-[10px] text-stone-600 uppercase tracking-widest mb-1">Affiliation</div>
                <div className="font-inter text-stone-300 text-sm">Indian Army</div>
                <div className="font-inter text-stone-600 text-xs mt-0.5">Eastern Command · Kolkata</div>
              </div>
              <div>
                <div className="font-inter text-[10px] text-stone-600 uppercase tracking-widest mb-1">Regimental Symbol</div>
                <div className="font-inter text-stone-300 text-sm">One-Horned Rhinoceros</div>
                <div className="font-inter text-stone-600 text-xs mt-0.5">The Rhinos of the Northeast</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(212,160,23,0.1)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-600 text-xs font-inter">
              <span className="text-yellow-700/40">©</span>
              <span>2024 Assam Regimental Centre, Shillong. All Rights Reserved.</span>
            </div>
            <div className="text-stone-700 text-xs font-inter italic text-center">
              Built with honour for the digital heritage archive of India's finest military traditions.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-800/40 text-xs font-inter">Eastern Command</span>
              <span className="w-1 h-1 rounded-full bg-yellow-800/30" />
              <span className="text-yellow-800/40 text-xs font-inter">Indian Army</span>
            </div>
          </div>
        </div>
      </div>

      {/* Very subtle bottom gradient */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.1), transparent)' }} />
    </footer>
  );
}
