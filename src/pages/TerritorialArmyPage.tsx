// src/pages/TerritorialArmyPage.tsx — Premium Museum Plaque Redesign (Adaptive Grid Layout)
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TerritorialArmyHero from '../components/sections/heroes/TerritorialArmyHero';

export const TERRITORIAL_ARMY_UNITS = [
  { id: '119-ta', name: '119 Infantry Battalion (TA)', shortName: '119 TA', established: '1948', location: 'Assam' },
  { id: '134-ta', name: '134 Infantry Battalion (TA) Eco', shortName: '134 TA (Eco)', established: '2007', location: 'Assam' },
  { id: '135-ta', name: '135 Infantry Battalion (TA) Eco', shortName: '135 TA (Eco)', established: '2008', location: 'Assam' },
  { id: '165-ta', name: '165 Infantry Battalion (TA) H&H', shortName: '165 TA (H&H)', established: '2010', location: 'Assam' },
  { id: '166-ta', name: '166 Infantry Battalion (TA) H&H', shortName: '166 TA (H&H)', established: '2011', location: 'Assam' },
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

export default function TerritorialArmyPage() {
  const cardCount = TERRITORIAL_ARMY_UNITS.length;

  // Define fixed card dimensions based on density to avoid percentage rounding errors
  let cardWidth = '270px';
  let cardHeight = '380px';

  if (cardCount <= 2) {
    cardWidth = '420px';
    cardHeight = '480px';
  } else if (cardCount <= 4) {
    cardWidth = '320px';
    cardHeight = '420px';
  } else if (cardCount <= 5) {
    cardWidth = '210px';
    cardHeight = '270px';
  } else if (cardCount <= 12) {
    cardWidth = '240px';
    cardHeight = '320px';
  } else {
    cardWidth = '220px';
    cardHeight = '280px';
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen overflow-hidden flex flex-col bg-[#0C120D]"
    >
      <Helmet>
        <title>Territorial Army | Home</title>
        <meta name="description" content="Explore the units and history of the Territorial Army." />
      </Helmet>

      <TerritorialArmyHero
        compact={true}
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
      />

      {/* Directory Section */}
      <section className="relative flex-1 min-h-0 flex flex-col justify-start py-4 px-8 select-none w-full bg-[#0C120D]">
        {/* Directory Title Section */}
        <div className="flex flex-col items-center text-center mb-5 flex-shrink-0">
          <h2 className="font-cinzel text-[#F4F0E8] text-2xl font-bold tracking-wider mb-2.5 mt-2">
            Territorial Army Battalions
          </h2>
        </div>

      {/* Directory Adaptive Flex Wrapper */}
      <div className="flex-grow min-h-0 w-full flex items-start justify-center overflow-y-auto overflow-x-hidden pb-4">
        
        {/* Desktop flex-wrap gallery (fully adaptive, perfectly centered with no empty strips) */}
        <div 
          className="hidden lg:flex flex-wrap justify-center items-start mx-auto"
          style={{
            gap: '20px',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          {TERRITORIAL_ARMY_UNITS.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
              className="overflow-hidden flex-shrink-0"
              style={{
                width: cardWidth,
                height: cardHeight,
              }}
            >
                <Link to={`/territorial-army/${unit.id}`} className="group block h-full w-full">
                  <div
                    className="relative overflow-hidden flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-[#C69B53]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(198,155,83,0.18)] hover:-translate-y-1 border border-[#C69B53]/25 h-full w-full rounded-xl"
                    style={{
                      padding: cardCount > 8 ? '12px' : (cardCount > 5 && cardCount <= 8) ? '16px' : '28px 24px',
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
                      <div className="absolute w-16 h-16 rounded-full bg-[#C69B53]/5 filter blur-md pointer-events-none" />
                      <img
                        src={`/assami/Territorial Army/${i + 1}-as-logo.png`}
                        alt={`${unit.shortName} Logo`}
                        className="w-[120px] h-[120px] object-contain group-hover:scale-110 transition-transform duration-500"
                        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.85))' }}
                      />
                    </div>

                    {/* Short title */}
                    <h3 className={`font-cinzel text-[#F4F0E8] font-bold tracking-wide transition-colors duration-300 group-hover:text-yellow-400 leading-tight mb-2 ${cardCount > 8 ? 'text-xs' : (cardCount > 5 && cardCount <= 8) ? 'text-sm' : 'text-xl'
                      }`}>
                      {unit.shortName}
                    </h3>

                    {/* Description / Full name */}
                    {cardCount <= 8 && (
                      <p className={`font-garamond text-[#C8C0B3] leading-relaxed text-center px-2 flex-grow flex items-center justify-center max-w-[78%] mb-4 ${(cardCount > 5 && cardCount <= 8) ? 'text-xs max-h-[38px] line-clamp-2' : 'text-sm max-h-[80px]'
                        }`}>
                        {unit.name.replace(' (TA)', '')}
                      </p>
                    )}

                    {/* Explore Button indicator */}
                    <div className="flex items-center justify-center gap-2 text-[#C69B53] text-[9.5px] font-inter tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-yellow-400 mt-auto w-full border-t border-[#C69B53]/15 pt-3.5 flex-shrink-0 relative overflow-hidden">
                      <span className="relative">
                        Explore Exhibit
                        <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#C69B53] transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
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
            {TERRITORIAL_ARMY_UNITS.map((unit, i) => (
              <Link to={`/territorial-army/${unit.id}`} key={unit.id} className="group block">
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
                    <img
                      src={`/assami/Territorial Army/${i + 1}-as-logo.png`}
                      alt={`${unit.shortName} Logo`}
                      className="w-[60px] h-[60px] object-contain filter drop-shadow-md mb-2 group-hover:scale-105 transition-transform duration-300"
                    />
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
            {TERRITORIAL_ARMY_UNITS.map((unit, i) => (
              <div key={unit.id} className="flex-shrink-0 w-[250px] snap-center">
                <Link to={`/territorial-army/${unit.id}`} className="group block">
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
                      <img
                        src={`/assami/Territorial Army/${i + 1}-as-logo.png`}
                        alt={`${unit.shortName} Logo`}
                        className="w-[70px] h-[70px] object-contain filter drop-shadow-lg mb-2 group-hover:scale-105 transition-transform duration-300"
                      />
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
