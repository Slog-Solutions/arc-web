// src/pages/ArunachalScoutsPage.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import SectionHeader from '../components/sections/SectionHeader';

export const ARUNACHAL_SCOUTS_UNITS = [
  { id: '1-as', name: '1st Battalion, Arunachal Scouts', shortName: '1 AS', established: '2010', location: 'Arunachal Pradesh' },
  { id: '2-as', name: '2nd Battalion, Arunachal Scouts', shortName: '2 AS', established: '2012', location: 'Arunachal Pradesh' },
];

export default function ArunachalScoutsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Arunachal Scouts | Home</title>
        <meta name="description" content="Explore the units and history of the Arunachal Scouts." />
      </Helmet>

      <HeroSection
        title="Arunachal Scouts"
        subtitle="Mountain Infantry Regiment"
        established="2010"
        backgroundImage="/assami/Arunachal Scouts/scouts-border-patrol.jpg"
        backgroundImages={[
          "/assami/Arunachal Scouts/scouts-border-patrol.jpg",
          "/assami/Arunachal Scouts/scouts-high-altitude.jpg",
          "/assami/Arunachal Scouts/scouts-raising-ceremony.jpg",
          "/assami/Arunachal Scouts/scouts-sons-of-soil.jpg"
        ]}
        badge="Mountain Infantry Regiment · Est. 2010"
      />

      {/* Battalion Showcase */}
      <section className="relative py-28 museum-room-wall spotlight-glow border-t border-[#2d2212]/30">
        <div className="museum-container">
          <SectionHeader
            tag="Regimental Directory"
            title="Arunachal Scouts Battalions"
            subtitle={
              <>
                Select an active battalion to inspect its 
                <br />
                individual history, achievements, and archives.
              </>
            }
          />

          <div className="flex justify-center mt-16">
  <div className="flex flex-wrap justify-center gap-8 w-fit">
    {ARUNACHAL_SCOUTS_UNITS.map((unit, i) => (
      <motion.div
        key={unit.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="w-[280px]"
      >
        <Link to={`/arunachal-scouts/${unit.id}`} className="group block h-full">
          <div className="museum-wood-frame brass-corners rounded-xl overflow-hidden p-6 h-full flex flex-col items-center justify-between text-center hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(212,160,23,0.2)] transition-all duration-300 transform hover:-translate-y-1.5">

            {/* Badge Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500/[0.08] border border-yellow-500/15 mb-5 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-all duration-300">
              <span className="text-2xl filter drop-shadow-md">🏔️</span>
            </div>

            {/* Battalion Short Name */}
            <div className="font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#ffd97d] to-[#d4a017] text-xl font-bold tracking-wide mb-2">
              {unit.shortName}
            </div>

            {/* Full Name */}
            <div className="font-inter text-stone-300 text-sm font-semibold uppercase leading-tight mb-3">
              {unit.name.replace(', Arunachal Scouts', '')}
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
        </div>
      </section>
    </motion.div>
  );
}

