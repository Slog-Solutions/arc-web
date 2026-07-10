// src/pages/ArunachalScoutsPage.tsx — Premium Museum Plaque Redesign (Adaptive Grid Layout)
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArunachalScoutsHero from '../components/sections/heroes/ArunachalScoutsHero';

export const ARUNACHAL_SCOUTS_UNITS = [
  { id: '1-as', name: '1st Battalion, Arunachal Scouts', shortName: '1 AS', established: '2010', location: 'Arunachal Pradesh' },
  { id: '2-as', name: '2nd Battalion, Arunachal Scouts', shortName: '2 AS', established: '2012', location: 'Arunachal Pradesh' },
];

// Ornate L-shaped corner notches matching visual language exactly
const CardCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position.startsWith('t');
  const isLeft = position.endsWith('l');
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`absolute pointer-events-none opacity-45 group-hover:opacity-90 transition-opacity duration-300 ${isTop ? 'top-3' : 'bottom-3'
        } ${isLeft ? 'left-3' : 'right-3'
        }`}
      style={{
        transform: `${isTop ? '' : 'scaleY(-1)'} ${isLeft ? '' : 'scaleX(-1)'}`
      }}
    >
      <path d="M 0,14 L 0,0 L 14,0 M 4,4 L 0,0" stroke="#C69B53" strokeWidth="1.2" fill="none" />
    </svg>
  );
};

export default function ArunachalScoutsPage() {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen overflow-hidden flex flex-col bg-[#0C120D]"
    >
      <Helmet>
        <title>Arunachal Scouts | Home</title>
        <meta name="description" content="Explore the units and history of the Arunachal Scouts." />
      </Helmet>

      <ArunachalScoutsHero
        compact={true}
        title="Arunachal Scouts"
        subtitle="Mountain Infantry Regiment"
        backgroundImage="/assami/Arunachal Scouts/scouts-border-patrol.jpg"
        backgroundImages={[
          "/assami/Arunachal Scouts/scouts-border-patrol.jpg",
          "/assami/Arunachal Scouts/scouts-high-altitude.jpg",
          "/assami/Arunachal Scouts/scouts-raising-ceremony.jpg",
          "/assami/Arunachal Scouts/scouts-sons-of-soil.jpg"
        ]}
        badge="Mountain Infantry Regiment · Est. 2010"
        showDividerBelowSubtitle={true}
      />

      {/* Directory Section */}
      <section className="relative flex-1 min-h-0 flex flex-col justify-start gap-12 pt-8 pb-4 px-8 select-none w-full bg-[#0C120D]">
        {/* Directory Title Section */}
        <div className="flex flex-col items-center text-center flex-shrink-0 mt-4 mb-4">
          <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[0.4em] uppercase font-bold mb-2">
            REGIMENTAL DIRECTORY
          </span>
          <h2 className="font-cinzel text-[#F4F0E8] text-[26px] font-bold tracking-widest uppercase mb-4">
            Arunachal Scouts Battalions
          </h2>
          <img
            src="/assets/navbar/logo-divider.svg"
            className="w-[140px] h-[14px] opacity-80 pointer-events-none"
            alt=""
          />
        </div>

        {/* Directory Adaptive Flex Wrapper */}
        <div className="flex-grow min-h-0 w-full flex items-center justify-center overflow-y-auto overflow-x-hidden pb-4">

          {/* Desktop flex-wrap gallery (fully adaptive, perfectly centered with no empty strips) */}
          <div
            className="hidden lg:flex justify-center items-center mx-auto w-full"
            style={{
              gap: '80px',
              maxWidth: '1200px',
            }}
          >
            {ARUNACHAL_SCOUTS_UNITS.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                className="overflow-hidden flex-shrink-0"
                style={{
                  width: '380px', // Roughly 28-30% of viewport
                  height: '460px', // As requested
                }}
              >
                <Link to={`/arunachal-scouts/${unit.id}`} className="group block h-full w-full">
                  <div
                    className="relative overflow-hidden flex flex-col items-center text-center transition-all duration-500 hover:border-[#C69B53]/80 hover:shadow-[0_0_30px_rgba(198,155,83,0.25),0_20px_40px_rgba(0,0,0,0.9)] hover:-translate-y-1.5 border border-[#C69B53]/40 h-full w-full rounded-sm"
                    style={{
                      padding: '40px 24px 32px',
                      backgroundColor: '#0A0E0A',
                      backgroundImage: `radial-gradient(circle at center, rgba(22, 34, 24, 0.7) 0%, rgba(8, 12, 8, 0.95) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.05 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leather)'/%3E%3C/svg%3E")`,
                      boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.95), 0 0 15px rgba(198, 155, 83, 0.1)',
                    }}
                  >
                    {/* Subtle Inner Frame */}
                    <div className="absolute inset-[6px] border border-[#C69B53]/20 rounded-sm pointer-events-none" />

                    {/* Ornamental Corners */}
                    <CardCorner position="tl" />
                    <CardCorner position="tr" />
                    <CardCorner position="bl" />
                    <CardCorner position="br" />

                    {/* Large Premium Medallion Icon */}
                    <div className="relative flex items-center justify-center mb-7">
                      <div className="absolute w-24 h-24 rounded-full bg-[#C69B53]/15 filter blur-xl pointer-events-none" />
                      <span
                        className="select-none filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                        style={{
                          fontSize: '4.5rem',
                          filter: 'drop-shadow(0 0 16px rgba(198, 155, 83, 0.45))',
                        }}
                      >
                        🏔️
                      </span>
                    </div>

                    {/* Elegant Bracket Label */}
                    <div className="flex items-center justify-center gap-3 mb-5 w-full px-12">
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#C69B53]/60" />
                      <div className="border border-[#C69B53]/40 rounded-full px-6 py-1 bg-[#162218]/80 backdrop-blur-md shadow-[0_0_10px_rgba(198,155,83,0.1)]">
                        <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[0.3em] font-bold uppercase select-none leading-none">
                          BATTALION {romanNumerals[i] || (i + 1)}
                        </span>
                      </div>
                      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#C69B53]/60" />
                    </div>

                    {/* Main title */}
                    <h3 className="font-cinzel text-[#F4F0E8] font-bold tracking-widest text-[42px] leading-none mb-3 group-hover:text-yellow-400 transition-colors duration-300" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
                      {unit.shortName}
                    </h3>

                    {/* Star Separator */}
                    <div className="text-[#C69B53] text-[11px] mb-3 filter drop-shadow-[0_0_5px_rgba(198,155,83,0.5)]">★</div>

                    {/* Description / Full name */}
                    <p className="font-garamond text-[#C8C0B3] italic text-lg mb-6 max-w-[85%] text-center">
                      {unit.name.replace(', Arunachal Scouts', '')}
                    </p>

                    {/* Crest Icon (Swords/Shield) */}
                    <div className="text-[#C69B53]/60 text-3xl mb-auto flex-grow flex flex-col justify-center">
                      <span className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] opacity-80">⚔️</span>
                    </div>

                    {/* Explore Button indicator */}
                    <div className="flex items-center justify-center gap-3 text-[#C69B53] text-[10px] font-inter tracking-[0.3em] uppercase transition-all duration-300 group-hover:text-yellow-300 group-hover:border-[#C69B53]/50 group-hover:bg-[#C69B53]/10 border border-[#C69B53]/30 px-10 py-3 rounded-sm mt-8 w-11/12 shadow-[0_4px_12px_rgba(0,0,0,0.6)] backdrop-blur-sm relative overflow-hidden">
                      <span className="text-[#C69B53] text-[8px] filter drop-shadow-[0_0_2px_rgba(198,155,83,0.8)]">♦</span>
                      <span className="font-bold tracking-widest relative z-10">EXPLORE EXHIBIT &rarr;</span>
                      <span className="text-[#C69B53] text-[8px] filter drop-shadow-[0_0_2px_rgba(198,155,83,0.8)]">♦</span>
                      {/* Subtle hover glow inside button */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C69B53]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Tablet view (2-column scrollable grid) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 w-full h-fit max-h-[440px] overflow-y-auto px-4 scrollbar-none">
            {ARUNACHAL_SCOUTS_UNITS.map((unit, i) => (
              <Link to={`/arunachal-scouts/${unit.id}`} key={unit.id} className="group block">
                <div
                  className="relative rounded-xl p-5 border border-[#C69B53]/25 flex flex-col justify-between items-center text-center h-[190px] overflow-hidden"
                  style={{
                    backgroundColor: '#111A12',
                    backgroundImage: `radial-gradient(circle at center, rgba(22, 34, 24, 0.45) 0%, rgba(13, 20, 14, 0.85) 100%)`,
                  }}
                >
                  <CardCorner position="tl" />
                  <CardCorner position="tr" />
                  <CardCorner position="bl" />
                  <CardCorner position="br" />
                  <div className="flex flex-col items-center">
                    <span className="text-2xl filter drop-shadow-md mb-2">🏔️</span>
                    <div className="border border-[#C69B53]/25 rounded-full px-2 py-0.5 bg-[#162218]/45">
                      <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">Battalion {romanNumerals[i] || (i + 1)}</span>
                    </div>
                  </div>
                  <h3 className="font-cinzel text-[#F4F0E8] text-sm font-bold tracking-wide mt-2">{unit.shortName}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[9px] font-inter tracking-widest uppercase mt-2 w-full border-t border-[#C69B53]/15 pt-2">
                    <span>Explore Exhibit →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View (Horizontally swipeable flex slider) */}
          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 w-full py-2 px-4 scrollbar-none">
            {ARUNACHAL_SCOUTS_UNITS.map((unit, i) => (
              <div key={unit.id} className="flex-shrink-0 w-[250px] snap-center">
                <Link to={`/arunachal-scouts/${unit.id}`} className="group block">
                  <div
                    className="relative rounded-xl p-6 border border-[#C69B53]/25 flex flex-col justify-between items-center text-center h-[210px] overflow-hidden"
                    style={{
                      backgroundColor: '#111A12',
                      backgroundImage: `radial-gradient(circle at center, rgba(22, 34, 24, 0.45) 0%, rgba(13, 20, 14, 0.85) 100%)`,
                    }}
                  >
                    <CardCorner position="tl" />
                    <CardCorner position="tr" />
                    <CardCorner position="bl" />
                    <CardCorner position="br" />
                    <div className="flex flex-col items-center">
                      <span className="text-4xl filter drop-shadow-md mb-2">🏔️</span>
                      <div className="border border-[#C69B53]/25 rounded-full px-2.5 py-0.5 bg-[#162218]/45">
                        <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">Battalion {romanNumerals[i] || (i + 1)}</span>
                      </div>
                    </div>
                    <h3 className="font-cinzel text-[#F4F0E8] text-sm font-bold tracking-wide mt-2">{unit.shortName}</h3>
                    <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[9px] font-inter tracking-widest uppercase mt-3 w-full border-t border-[#C69B53]/15 pt-2">
                      <span>Explore Exhibit →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </motion.div>
  );
}
