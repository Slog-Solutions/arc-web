// src/pages/AssamRiflesPage.tsx — Premium Museum Plaque Redesign (Adaptive Grid Layout)
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';

export const ASSAM_RIFLES_UNITS = [
  { id: '1-ar', name: '1st Unit, Assam Units', shortName: '1 AR', established: '1835', location: 'Lushai Hills' },
  { id: '2-ar', name: '2nd Unit, Assam Units', shortName: '2 AR', established: '1883', location: 'Shillong' },
  { id: '3-ar', name: '3rd Unit, Assam Units', shortName: '3 AR', established: '1891', location: 'Kohima' },
  { id: '4-ar', name: '4th Unit, Assam Units', shortName: '4 AR', established: '1913', location: 'Imphal' },
  { id: '5-ar', name: '5th Unit, Assam Units', shortName: '5 AR', established: '1920', location: 'Lokra' },
  { id: '6-ar', name: '6th Unit, Assam Units', shortName: '6 AR', established: '1924', location: 'Agartala' },
  { id: '7-ar', name: '7th Unit, Assam Units', shortName: '7 AR', established: '1930', location: 'Silchar' },
  { id: '8-ar', name: '8th Unit, Assam Units', shortName: '8 AR', established: '1938', location: 'Aizawl' },
  { id: '9-ar', name: '9th Unit, Assam Units', shortName: '9 AR', established: '1941', location: 'Itanagar' },
  { id: '10-ar', name: '10th Unit, Assam Units', shortName: '10 AR', established: '1943', location: 'Mokokchung' },
  { id: '12-ar', name: '12th Unit, Assam Units', shortName: '12 AR', established: '1948', location: 'Tura' },
  { id: '14-ar', name: '14th Unit, Assam Units', shortName: '14 AR', established: '1955', location: 'Dimapur' },
  { id: '15-ar', name: '15th Unit, Assam Units', shortName: '15 AR', established: '1960', location: 'Lunglei' },
  { id: '16-ar', name: '16th Unit, Assam Units', shortName: '16 AR', established: '1963', location: 'Ghaspani' },
  { id: '17-ar', name: '17th Unit, Assam Units', shortName: '17 AR', established: '1965', location: 'Shillong' },
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
      className={`absolute pointer-events-none opacity-45 group-hover:opacity-90 transition-opacity duration-300 ${
        isTop ? 'top-3' : 'bottom-3'
      } ${
        isLeft ? 'left-3' : 'right-3'
      }`}
      style={{
        transform: `${isTop ? '' : 'scaleY(-1)'} ${isLeft ? '' : 'scaleX(-1)'}`
      }}
    >
      <path d="M 0,14 L 0,0 L 14,0 M 4,4 L 0,0" stroke="#C69B53" strokeWidth="1.2" fill="none" />
    </svg>
  );
};

export default function AssamRiflesPage() {
  const cardCount = ASSAM_RIFLES_UNITS.length;
  
  // Dynamic Grid configurations based on card count
  let cols = 5;
  let rows = 1;

  if (cardCount <= 5) {
    cols = cardCount;
    rows = 1;
  } else if (cardCount <= 8) {
    cols = 4;
    rows = 2;
  } else if (cardCount <= 12) {
    cols = 4;
    rows = 3;
  } else if (cardCount <= 16) {
    cols = 5;
    rows = 3;
  } else {
    cols = 6;
    rows = Math.ceil(cardCount / 6);
  }

  // Adjust height of directory grid based on rows
  const gridHeight = rows === 1 ? '380px' : rows === 2 ? '480px' : '520px';

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
        <title>Assam Units | Home</title>
        <meta name="description" content="Explore the units and history of the Assam Units." />
      </Helmet>

      <HeroSection
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
        badge="India's Oldest Paramilitary Force — Est. 1835"
      />

      {/* Directory Section */}
      <section className="relative flex-1 min-h-0 flex flex-col justify-between py-5 px-8 select-none w-full bg-[#0C120D]">
        {/* Directory Title Section */}
        <div className="flex flex-col items-center text-center mb-3 flex-shrink-0">
          <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[6px] uppercase font-bold mb-1">
            REGIMENTAL DIRECTORY
          </span>
          <h2 className="font-cinzel text-[#F4F0E8] text-2xl font-bold tracking-wider mb-2">
            Assam Units Battalions
          </h2>
          {/* Decorative engraved divider */}
          <img 
            src="/assets/navbar/logo-divider.svg" 
            className="w-[120px] h-[12px] opacity-75 mt-0.5 pointer-events-none" 
            alt="" 
          />
        </div>

      {/* Directory Adaptive Grid */}
      <div className="flex-grow min-h-0 w-full max-w-[1400px] mx-auto flex items-center justify-center">
        
        {/* Desktop flex-wrap grid (fully adaptive, centers last row automatically, and height constrained to viewport) */}
        <div 
          className="hidden lg:flex flex-wrap justify-center content-center w-full"
          style={{
            gap: '16px',
            height: gridHeight,
          }}
        >
          {ASSAM_RIFLES_UNITS.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % cols) * 0.04, duration: 0.4, ease: 'easeOut' }}
              className="min-h-0 overflow-hidden"
              style={{
                width: `calc((100% - ${(cols - 1) * 16}px) / ${cols})`,
                height: rows === 1 ? '100%' : `calc((100% - ${(rows - 1) * 16}px) / ${rows})`
              }}
            >
                <Link to={`/assam-rifles/${unit.id}`} className="group block h-full w-full">
                  <div 
                    className="relative overflow-hidden flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-[#C69B53]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(198,155,83,0.18)] hover:-translate-y-1 border border-[#C69B53]/25 h-full w-full rounded-xl"
                    style={{
                      padding: rows >= 3 ? '8px 12px' : rows === 2 ? '14px' : '20px',
                      backgroundColor: '#111A12',
                      backgroundImage: `radial-gradient(circle at center, rgba(22, 34, 24, 0.45) 0%, rgba(13, 20, 14, 0.85) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.05 0 0 0 0 0.08 0 0 0 0 0.06 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leather)'/%3E%3C/svg%3E")`,
                      boxShadow: 'inset 0 0 24px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {/* Ornamental Corners */}
                    <CardCorner position="tl" />
                    <CardCorner position="tr" />
                    <CardCorner position="bl" />
                    <CardCorner position="br" />

                    {/* Large Premium Medallion Icon */}
                    <div className="relative flex items-center justify-center mb-1">
                      <div className="absolute w-12 h-12 rounded-full bg-[#C69B53]/5 filter blur-md pointer-events-none" />
                      <span 
                        className="select-none filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                        style={{
                          fontSize: rows >= 3 ? '1.8rem' : '2.5rem',
                          filter: 'drop-shadow(0 0 8px rgba(198, 155, 83, 0.3))',
                        }}
                      >
                        🦅
                      </span>
                    </div>

                    {/* Engraved Bronze Capsule Label */}
                    <div 
                      className="border rounded-full px-2.5 py-0.5 bg-[#162218]/45 flex items-center justify-center mb-1 transition-colors duration-300 group-hover:border-[#C69B53]/50"
                      style={{ borderColor: 'rgba(198, 155, 83, 0.25)' }}
                    >
                      <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase select-none leading-none">
                        Unit {romanNumerals[i] || (i + 1)}
                      </span>
                    </div>

                    {/* Short title */}
                    <h3 className={`font-cinzel text-[#F4F0E8] font-bold tracking-wide transition-colors duration-300 group-hover:text-yellow-400 leading-tight mb-1.5 ${
                      rows >= 3 ? 'text-xs' : rows === 2 ? 'text-sm' : 'text-base'
                    }`}>
                      {unit.shortName}
                    </h3>

                    {/* Description / Full name */}
                    {rows < 3 && (
                      <p className={`font-garamond text-[#C8C0B3] leading-relaxed text-center px-2 flex-grow flex items-center justify-center max-w-[78%] mb-4 ${
                        rows === 2 ? 'text-xs max-h-[38px] line-clamp-2' : 'text-sm max-h-[80px]'
                      }`}>
                        {unit.name.replace(', Assam Units', '')}
                      </p>
                    )}

                    {/* Explore Button indicator */}
                    <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[9px] font-inter tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-yellow-400 mt-auto w-full border-t border-[#C69B53]/15 pt-2 flex-shrink-0 relative overflow-hidden">
                      <span className="relative">
                        Explore Exhibit
                        <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#C69B53] transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1 font-bold">
                        →
                      </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Tablet view (2-column scrollable grid) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 w-full h-fit max-h-[440px] overflow-y-auto px-4 scrollbar-none">
            {ASSAM_RIFLES_UNITS.map((unit, i) => (
              <Link to={`/assam-rifles/${unit.id}`} key={unit.id} className="group block">
                <div 
                  className="relative rounded-xl p-5 border border-[#C69B53]/25 flex flex-col justify-between items-center text-center h-[180px] overflow-hidden"
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
                    <span className="text-2xl filter drop-shadow-md mb-2">🦅</span>
                    <div className="border border-[#C69B53]/25 rounded-full px-2 py-0.5 bg-[#162218]/45">
                      <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">Unit {romanNumerals[i] || (i + 1)}</span>
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
            {ASSAM_RIFLES_UNITS.map((unit, i) => (
              <div key={unit.id} className="flex-shrink-0 w-[250px] snap-center">
                <Link to={`/assam-rifles/${unit.id}`} className="group block">
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
                      <span className="text-4xl filter drop-shadow-md mb-2">🦅</span>
                      <div className="border border-[#C69B53]/25 rounded-full px-2.5 py-0.5 bg-[#162218]/45">
                        <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">Unit {romanNumerals[i] || (i + 1)}</span>
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
