// src/components/sections/RoomSelector.tsx — Premium Museum Plaque Redesign (Adaptive Grid Layout)
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  basePath: string;
  unitName: string;
}

const EXHIBIT_ROOMS = [
  {
    id: 'history',
    room: 'Exhibition Room I',
    title: 'History & Heritage',
    icon: '📜',
    path: '/history',
    desc: 'Explore the origins, major campaigns, battles, and chronological history of the unit.',
  },
  {
    id: 'awards',
    room: 'Exhibition Room II',
    title: 'Awards & Achievements',
    icon: '🎖️',
    path: '/awards',
    desc: 'A legacy of valor. Review the gallantry medals, battle honours, and historic trophies.',
  },
  {
    id: 'gaon-buras',
    room: 'Exhibition Room III',
    title: 'Gaon Buras & Officers',
    icon: '👥',
    path: '/gaon-buras',
    desc: 'Meet the commanding officers who led the unit and the village chieftains who bound them to the land.',
  },
  {
    id: 'gallery',
    room: 'Exhibition Room IV',
    title: 'Photography Archives',
    icon: '🖼️',
    path: '/gallery',
    desc: 'Step into the visual archives detailing passing out parades, training camps, and historical events.',
  },
  {
    id: 'videos',
    room: 'Exhibition Room V',
    title: 'Regimental Cinema',
    icon: '🎬',
    path: '/videos',
    desc: 'Watch documentary films, historical retrospectives, and training footage of the unit.',
  },
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

export default function RoomSelector({ basePath, unitName }: Props) {
  const cardCount = EXHIBIT_ROOMS.length;

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
    cardWidth = '270px';
    cardHeight = '380px';
  } else if (cardCount <= 12) {
    cardWidth = '240px';
    cardHeight = '320px';
  } else {
    cardWidth = '220px';
    cardHeight = '280px';
  }

  return (
    <section className="relative w-full flex flex-col justify-center py-12 px-8 select-none bg-[#0C120D]">
      {/* Directory Title Section */}
      <div className="flex flex-col items-center text-center mb-16 flex-shrink-0">
        <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[6px] uppercase font-bold mb-4">
          EXHIBITION DIRECTORY
        </span>
        <h2 className="font-cinzel text-[#F4F0E8] text-2xl font-bold tracking-wider mb-6">
          {unitName} Exhibition Rooms
        </h2>
        {/* Decorative engraved divider */}
        <img
          src="/assets/navbar/logo-divider.svg"
          className="w-[120px] h-[12px] opacity-75 mt-0.5 pointer-events-none"
          alt=""
        />
      </div>

      {/* Directory Adaptive Flex Wrapper */}
      <div className="w-full flex items-center justify-center pb-4" style={{ marginTop: '48px' }}>

        {/* Desktop flex-wrap gallery (fully adaptive, perfectly centered with no empty strips) */}
        <div
          className="hidden lg:flex flex-wrap justify-center items-center mx-auto"
          style={{
            gap: '32px',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          {EXHIBIT_ROOMS.map((room, i) => {
            const fullPath = `${basePath}${room.path}`;

            // Smart split of Titles by '&' to make them align beautifully on separate lines
            const titleParts = room.title.split('&');
            const titleElement = titleParts.length === 2 ? (
              <>
                {titleParts[0].trim()}
                <br />
                <span className="text-[#C69B53]">&</span> {titleParts[1].trim()}
              </>
            ) : room.title;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                className="flex-shrink-0"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                }}
              >
                <Link to={fullPath} className="group block h-full w-full">
                  <div
                    className="relative overflow-hidden flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-[#C69B53]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(198,155,83,0.18)] hover:-translate-y-2 border border-[#C69B53]/25 h-full w-full rounded-xl"
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
                    <div className="relative flex items-center justify-center mb-4">
                      <div className="absolute w-16 h-16 rounded-full bg-[#C69B53]/5 filter blur-md pointer-events-none" />
                      <span
                        className="text-5xl select-none filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(198, 155, 83, 0.3))',
                        }}
                      >
                        {room.icon}
                      </span>
                    </div>

                    {/* Engraved Bronze Capsule Label */}
                    <div
                      className="border rounded-full px-3 py-1 bg-[#162218]/45 flex items-center justify-center mb-3 transition-colors duration-300 group-hover:border-[#C69B53]/50"
                      style={{ borderColor: 'rgba(198, 155, 83, 0.25)' }}
                    >
                      <span className="font-cinzel text-[#C69B53] text-[9px] tracking-[0.25em] font-bold uppercase select-none leading-none">
                        {room.room}
                      </span>
                    </div>

                    {/* Room title */}
                    <h3 className={`font-cinzel text-[#F4F0E8] font-bold tracking-wide transition-colors duration-300 group-hover:text-yellow-400 leading-tight mb-4 ${cardCount > 8 ? 'text-xs' : (cardCount > 5 && cardCount <= 8) ? 'text-sm' : 'text-xl'
                      }`}>
                      {titleElement}
                    </h3>

                    {/* Description - Hides completely for dense rows to prevent vertical layout leaks */}
                    {cardCount <= 8 && (
                      <p className={`font-garamond text-[#C8C0B3] leading-relaxed text-center px-2 flex-grow flex items-center justify-center max-w-[78%] mb-4 ${(cardCount > 5 && cardCount <= 8) ? 'text-xs max-h-[38px] line-clamp-2' : 'text-sm max-h-[80px]'
                        }`}>
                        {room.desc}
                      </p>
                    )}

                    {/* Explore Button indicator */}
                    <div className="flex items-center justify-center gap-2 text-[#C69B53] text-[9.5px] font-inter tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-yellow-400 mt-auto w-full border-t border-[#C69B53]/15 pt-3.5 flex-shrink-0 relative overflow-hidden">
                      <span className="relative">
                        Explore Exhibit
                        {/* Slide-in underline */}
                        <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#C69B53] transition-all duration-300 group-hover:w-full" />
                      </span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                        →
                      </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Tablet view (2-column scrollable grid) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 w-full h-fit max-h-[440px] overflow-y-auto px-4 py-2 scrollbar-none">
          {EXHIBIT_ROOMS.map((room) => {
            const fullPath = `${basePath}${room.path}`;
            return (
              <Link to={fullPath} key={room.id} className="group block">
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
                    <span className="text-3xl filter drop-shadow-md mb-3">{room.icon}</span>
                    <div className="border border-[#C69B53]/25 rounded-full px-2 py-0.5 bg-[#162218]/45">
                      <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">{room.room}</span>
                    </div>
                  </div>
                  <h3 className="font-cinzel text-[#F4F0E8] text-sm font-bold tracking-wide mt-3">{room.title}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[9px] font-inter tracking-widest uppercase mt-3 w-full border-t border-[#C69B53]/15 pt-3">
                    <span>Explore Exhibit →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View (Horizontally swipeable flex slider) */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-5 w-full py-3 px-4 scrollbar-none">
          {EXHIBIT_ROOMS.map((room) => {
            const fullPath = `${basePath}${room.path}`;
            return (
              <div key={room.id} className="flex-shrink-0 w-[250px] snap-center">
                <Link to={fullPath} className="group block">
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
                      <span className="text-4xl filter drop-shadow-md mb-3">{room.icon}</span>
                      <div className="border border-[#C69B53]/25 rounded-full px-2.5 py-0.5 bg-[#162218]/45">
                        <span className="font-cinzel text-[#C69B53] text-[8px] tracking-[0.2em] font-bold uppercase">{room.room}</span>
                      </div>
                    </div>
                    <h3 className="font-cinzel text-[#F4F0E8] text-sm font-bold tracking-wide mt-3">{room.title}</h3>
                    <div className="flex items-center justify-center gap-1.5 text-[#C69B53] text-[9px] font-inter tracking-widest uppercase mt-3 w-full border-t border-[#C69B53]/15 pt-3">
                      <span>Explore Exhibit →</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
