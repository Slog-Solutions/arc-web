// src/pages/AssamRiflesPage.tsx — Premium Museum Plaque Redesign (Adaptive Grid Layout)
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AssamUnitsHero from '../components/sections/heroes/AssamUnitsHero';

export const ASSAM_RIFLES_UNITS = [
  { id: '1-ar', name: '1st Unit, Assam Units', shortName: '1 AR', established: '1835', location: 'Lushai Hills', bgImage: '/assets/units/unit_1_bg.png' },
  { id: '2-ar', name: '2nd Unit, Assam Units', shortName: '2 AR', established: '1883', location: 'Shillong', bgImage: '/assets/units/unit_2_bg.png' },
  { id: '3-ar', name: '3rd Unit, Assam Units', shortName: '3 AR', established: '1891', location: 'Kohima', bgImage: '/assets/units/unit_3_bg.png' },
  { id: '4-ar', name: '4th Unit, Assam Units', shortName: '4 AR', established: '1913', location: 'Imphal', bgImage: '/assets/units/unit_4_bg.png' },
  { id: '5-ar', name: '5th Unit, Assam Units', shortName: '5 AR', established: '1920', location: 'Lokra', bgImage: '/assets/units/unit_5_bg.png' },
  { id: '6-ar', name: '6th Unit, Assam Units', shortName: '6 AR', established: '1924', location: 'Agartala', bgImage: '/assets/units/unit_6_bg.png' },
  { id: '7-ar', name: '7th Unit, Assam Units', shortName: '7 AR', established: '1930', location: 'Silchar', bgImage: '/assets/units/unit_7_bg.png' },
  { id: '8-ar', name: '8th Unit, Assam Units', shortName: '8 AR', established: '1938', location: 'Aizawl', bgImage: '/assets/units/unit_8_bg.png' },
  { id: '9-ar', name: '9th Unit, Assam Units', shortName: '9 AR', established: '1941', location: 'Itanagar', bgImage: '/assets/units/unit_9_bg.png' },
  { id: '10-ar', name: '10th Unit, Assam Units', shortName: '10 AR', established: '1943', location: 'Mokokchung', bgImage: '/assets/units/unit_10_bg.png' },
  { id: '11-ar', name: '11th Unit, Assam Units', shortName: '11 AR', established: '1945', location: 'Dibrugarh', bgImage: '/assets/units/unit_11_bg.png' },
  { id: '12-ar', name: '12th Unit, Assam Units', shortName: '12 AR', established: '1948', location: 'Tura', bgImage: '/assets/units/unit_1_bg.png' }, // Placeholder
  { id: '14-ar', name: '14th Unit, Assam Units', shortName: '14 AR', established: '1955', location: 'Dimapur', bgImage: '/assets/units/unit_2_bg.png' }, // Placeholder
  { id: '15-ar', name: '15th Unit, Assam Units', shortName: '15 AR', established: '1960', location: 'Lunglei', bgImage: '/assets/units/unit_3_bg.png' }, // Placeholder
  { id: '16-ar', name: '16th Unit, Assam Units', shortName: '16 AR', established: '1963', location: 'Ghaspani', bgImage: '/assets/units/unit_4_bg.png' }, // Placeholder
  { id: '17-ar', name: '17th Unit, Assam Units', shortName: '17 AR', established: '1965', location: 'Shillong', bgImage: '/assets/units/unit_5_bg.png' }, // Placeholder
  { id: '18-ar', name: '18th Unit, Assam Units', shortName: '18 AR', established: '1968', location: 'Agartala', bgImage: '/assets/units/unit_6_bg.png' }, // Placeholder
];

// Ornate L-shaped corner notches matching visual language exactly
const CardCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position.startsWith('t');
  const isLeft = position.endsWith('l');
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 14 14"
      fill="none"
      className={`absolute pointer-events-none opacity-45 group-hover:opacity-90 transition-opacity duration-300 z-20 ${isTop ? 'top-2' : 'bottom-2'} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{
        transform: `${isTop ? '' : 'scaleY(-1)'} ${isLeft ? '' : 'scaleX(-1)'}`
      }}
    >
      <path d="M 0,14 L 0,0 L 14,0 M 4,4 L 0,0" stroke="#C69B53" strokeWidth="1.2" fill="none" />
    </svg>
  );
};

const UnitCard = ({ unit, index }: { unit: typeof ASSAM_RIFLES_UNITS[0], index: number }) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX'];
  const romanNumber = romanNumerals[parseInt(unit.shortName.split(' ')[0]) - 1] || (index + 1);

  return (
    <Link to={`/assam-rifles/${unit.id}`} className="group block h-[205px] w-[130px]">
      <div className="relative overflow-hidden flex flex-col items-center justify-end transition-all duration-700 hover:border-[#C69B53]/60 hover:-translate-y-1.5 border border-[#C69B53]/30 h-full w-full rounded-xl bg-[#0B0B09] ring-1 ring-inset ring-[#C69B53]/10 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
           style={{ padding: '8px 4px 10px' }}>
        
        {/* Background Artwork (100% of card) */}
        <div className="absolute inset-0 overflow-hidden z-0 rounded-xl">
          <div className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
               style={{ backgroundImage: `url("${unit.bgImage}")` }} />
          {/* Exact overlay requested by user to allow artwork visibility while ensuring text readability */}
          <div className="absolute inset-0 z-10"
               style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.70) 100%)' }} />
        </div>
        
        {/* Subtle global glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,160,23,0.15)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none mix-blend-screen" />

        {/* Ornamental Corners */}
        <CardCorner position="tl" />
        <CardCorner position="tr" />
        <CardCorner position="bl" />
        <CardCorner position="br" />

        <div className="relative z-20 w-full h-full flex flex-col items-center justify-between py-1">
          {/* Top Label */}
          <div className="flex flex-col items-center">
            <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[0.2em] font-bold uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              UNIT {romanNumber}
            </span>
          </div>

          {/* Unit Name (Title) */}
          <h3 className="font-cinzel text-white text-[18px] font-bold tracking-widest leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-center my-auto px-1">
            {unit.shortName}
          </h3>

          {/* Explore Button */}
          <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[11px] font-cinzel font-semibold tracking-[0.1em] uppercase transition-all duration-500 group-hover:text-[#F4D068] group-hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.5)] w-full pt-2 pb-1 relative overflow-hidden z-10">
            {/* Divider line */}
            <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C69B53]/60 to-transparent transition-all duration-500 group-hover:via-[#F4D068]/90" />
            
            <span className="relative">EXPLORE</span>
            <span className="transform transition-transform duration-500 group-hover:translate-x-1 font-bold">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function AssamRiflesPage() {
  const row1Units = ASSAM_RIFLES_UNITS.slice(0, 9);
  const row2Units = ASSAM_RIFLES_UNITS.slice(9, 17);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex flex-col bg-transparent"
    >
      <Helmet>
        <title>Assam Units | Home</title>
        <meta name="description" content="Explore the units and history of the Assam Units." />
      </Helmet>

      <AssamUnitsHero
        compact={true}
        title="Assam Units"
        subtitle="Laitumkhrah, Shillong · Meghalaya"
        established="1835"
        backgroundImage="/assami/17 Assam Rifles/ar-patrol-green.jpg"
        backgroundImages={[
          "/assami/17 Assam Rifles/ar-patrol-green.jpg",
          "/assami/17 Assam Rifles/ar-border-patrol.jpg",
          "/assami/17 Assam Rifles/ar-heritage-sentinel.jpg",
          "/assami/17 Assam Rifles/ar-joint-training.jpg",
          "/assami/17 Assam Rifles/ar-community-friends.jpg"
        ]}
      />

      {/* Directory Section */}
      <section className="relative w-full flex-1 flex flex-col justify-start pb-[40px] px-8 select-none bg-transparent" style={{ marginTop: '-25px' }}>
        {/* Directory Title Section */}
        <div className="flex flex-col items-center text-center flex-shrink-0 mt-0 mb-4">
          <div className="flex items-center justify-center mb-3 opacity-60">
             <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C69B53]" />
             <div className="mx-3 w-1 h-1 rotate-45 bg-[#C69B53]" />
             <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C69B53]" />
          </div>
          <h2 className="font-cinzel text-[#C69B53] text-[13px] font-bold tracking-[0.3em] uppercase drop-shadow-md">
            Assam Units Battalions
          </h2>
          <div className="flex items-center justify-center mt-3 opacity-60">
             <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C69B53]" />
             <div className="mx-3 w-1 h-1 rotate-45 bg-[#C69B53]" />
             <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C69B53]" />
          </div>
        </div>

        {/* Directory Flex Wrapper (Non-Scrollable Layout) */}
        <div className="w-full flex flex-col items-center justify-center max-w-[1600px] mx-auto" style={{ gap: '18px' }}>
          
          {/* Row 1 (9 Cards) */}
          <div className="flex flex-nowrap justify-center items-center w-full" style={{ gap: '16px' }}>
            {row1Units.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <UnitCard unit={unit} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Row 2 (8 Cards) */}
          <div className="flex flex-nowrap justify-center items-center w-full" style={{ gap: '16px' }}>
            {row2Units.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 9) * 0.04, duration: 0.5, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <UnitCard unit={unit} index={i + 9} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </motion.div>
  );
}
