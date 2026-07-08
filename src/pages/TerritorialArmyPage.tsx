// src/pages/TerritorialArmyPage.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import SectionHeader from '../components/sections/SectionHeader';

export const TERRITORIAL_ARMY_UNITS = [
  { id: '119-ta', name: '119 Infantry Battalion (TA)', shortName: '119 TA', established: '1948', location: 'Assam' },
  { id: '134-ta', name: '134 Infantry Battalion (TA) Eco', shortName: '134 TA (Eco)', established: '2007', location: 'Assam' },
  { id: '135-ta', name: '135 Infantry Battalion (TA) Eco', shortName: '135 TA (Eco)', established: '2008', location: 'Assam' },
  { id: '165-ta', name: '165 Infantry Battalion (TA) H&H', shortName: '165 TA (H&H)', established: '2010', location: 'Assam' },
  { id: '166-ta', name: '166 Infantry Battalion (TA) H&H', shortName: '166 TA (H&H)', established: '2011', location: 'Assam' },
];

export default function TerritorialArmyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Territorial Army | Home</title>
        <meta name="description" content="Explore the units and history of the Territorial Army." />
      </Helmet>

      <HeroSection
        title="Territorial Army"
        subtitle="Citizen Soldiers' Force"
        established="1948"
        backgroundImage="/assami/Territorial Army/ta-parade-assam.jpg"
        backgroundImages={[
          "/assami/Territorial Army/ta-parade-assam.jpg",
          "/assami/Territorial Army/ta-annual-camp.jpg",
          "/assami/Territorial Army/ta-field-ops.jpg",
          "/assami/Territorial Army/ta-medical-camp.jpg"
        ]}
        badge="Citizen Soldiers' Force · Est. 1948"
      />

      {/* Battalion Showcase */}
      <section className="relative py-28 museum-room-wall spotlight-glow border-t border-[#2d2212]/30">
        <div className="museum-container">
          <SectionHeader
            tag="Regimental Directory"
            title="Territorial Army Battalions"
            subtitle={
              <>
                Select an active battalion to inspect its 
                <br />
                individual history, achievements, and archives.
              </>
            }
          />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16 w-full max-w-[1500px] mx-auto justify-items-center">
  {TERRITORIAL_ARMY_UNITS.map((unit, i) => (
    <motion.div
      key={unit.id}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="w-full max-w-[280px]"
    >
      <Link
        to={`/territorial-army/${unit.id}`}
        className="group block h-full"
      >
        <div className="museum-wood-frame brass-corners rounded-xl overflow-hidden p-6 h-full flex flex-col items-center justify-between text-center hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.2)] transition-all duration-300 transform hover:-translate-y-1.5">

          {/* Badge Icon */}
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500/[0.08] border border-yellow-500/15 mb-5 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-all duration-300">
            <span className="text-2xl filter drop-shadow-md">🛡️</span>
          </div>

          {/* Battalion Short Name */}
          <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#ffd97d] to-[#d4a017] text-xl font-bold tracking-wide mb-2">
            {unit.shortName}
          </div>

          {/* Full Name */}
          <div className="font-inter text-stone-300 text-sm font-semibold uppercase leading-tight mb-3">
            {unit.name.replace(' (TA)', '')}
          </div>

          {/* Button */}
          <div className="mt-auto border-t border-[#8a6820]/20 pt-3 pb-3 w-full">
            <div className="text-[9px] font-inter tracking-widest text-[#d4a017]/70 uppercase group-hover:text-yellow-400 transition-colors duration-200 text-center">
              Enter Exhibit
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  ))}
</div>
        </div>
      </section>
    </motion.div>
  );
}
