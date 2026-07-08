// src/pages/RashtriyaRiflesPage.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import SectionHeader from '../components/sections/SectionHeader';

export const RASHTRIYA_RIFLES_UNITS = [
  { id: '3-rr', name: '3rd Battalion, Rashtriya Rifles', shortName: '3 RR', established: '1990', location: 'Jammu & Kashmir' },
  { id: '35-rr', name: '35th Battalion, Rashtriya Rifles', shortName: '35 RR', established: '1994', location: 'Jammu & Kashmir' },
  { id: '42-rr', name: '42nd Battalion, Rashtriya Rifles', shortName: '42 RR', established: '2000', location: 'Jammu & Kashmir' },
  { id: '59-rr', name: '59th Battalion, Rashtriya Rifles', shortName: '59 RR', established: '2004', location: 'Jammu & Kashmir' },
];

export default function RashtriyaRiflesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Rashtriya Rifles | Home</title>
        <meta name="description" content="Explore the units and history of the Rashtriya Rifles." />
      </Helmet>

      <HeroSection
        title="Rashtriya Rifles"
        subtitle="India's Premier Counter-Insurgency Force"
        established="1990"
        backgroundImage="/assami/Rashtriya Rifles/rr-ops-kashmir.jpg"
        backgroundImages={[
          "/assami/Rashtriya Rifles/rr-ops-kashmir.jpg",
          "/assami/Rashtriya Rifles/rr-terrain-valley.jpg",
          "/assami/Rashtriya Rifles/rr-mountain-warriors.jpg",
          "/assami/Rashtriya Rifles/rr-urban-warfare.jpg"
        ]}
        badge="Counter-Insurgency Force · Est. 1990"
      />

      {/* Battalion Showcase */}
      <section className="relative py-28 museum-room-wall spotlight-glow border-t border-[#2d2212]/30">
        <div className="museum-container">
          <SectionHeader
            tag="Regimental Directory"
            title="Rashtriya Rifles Battalions"
            subtitle={
              <>
                Select an active battalion to inspect its 
                <br />
                individual history, achievements, and archives.
              </>
            }
          />

  <div className="flex justify-center mt-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-fit">
    {RASHTRIYA_RIFLES_UNITS.map((unit, i) => (
      <motion.div
        key={unit.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="w-[280px]"
      >
        <Link
          to={`/rashtriya-rifles/${unit.id}`}
          className="group block h-full"
        >
          <div className="museum-wood-frame brass-corners rounded-xl overflow-hidden p-6 h-full flex flex-col items-center justify-between text-center hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.2)] transition-all duration-300 transform hover:-translate-y-1.5">

            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500/[0.08] border border-yellow-500/15 mb-5 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-all duration-300">
              <span className="text-2xl filter drop-shadow-md">⚔️</span>
            </div>

            <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#ffd97d] to-[#d4a017] text-xl font-bold tracking-wide mb-2">
              {unit.shortName}
            </div>

            <div className="font-inter text-stone-300 text-sm font-semibold uppercase leading-tight mb-3">
              {unit.name.replace(', Rashtriya Rifles', '')}
            </div>

            <div className="mt-auto border-t border-[#8a6820]/20 pt-3 pb-3 w-full">
              <div className="text-[9px] font-inter tracking-widest text-[#d4a017]/70 uppercase group-hover:text-yellow-400 transition-colors duration-200">
                Enter Exhibit
              </div>
            </div>

          </div>
        </Link>
      </motion.div>
    ))}
  </div>
</div>
        </div>
      </section>
    </motion.div>
  );
}
