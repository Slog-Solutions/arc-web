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
    bgImage: '/assets/rooms/history_bg.png',
    path: '/history',
    desc: 'Explore the origins, major campaigns, battles, and chronological history of the unit.',
  },
  {
    id: 'awards',
    room: 'Exhibition Room II',
    title: 'Awards & Achievements',
    bgImage: '/assets/rooms/awards_bg.png',
    path: '/awards',
    desc: 'A legacy of valor. Review the gallantry medals, battle honours, and historic recognitions.',
  },
  {
    id: 'gaon-buras',
    room: 'Exhibition Room III',
    title: 'Gaon Buras Commanding Officer & Officers',
    bgImage: '/assets/rooms/gaon_buras_bg.png',
    path: '/gaon-buras',
    desc: 'Meet the commanding officers who led the unit and the village chieftains who bound them to the land.',
  },
  {
    id: 'gallery',
    room: 'Exhibition Room IV',
    title: 'Photography Archives',
    bgImage: '/assets/rooms/gallery_bg.png',
    path: '/gallery',
    desc: 'Step into the visual archives detailing moving moments, training camps, and historical events.',
  },
  {
    id: 'videos',
    room: 'Exhibition Room V',
    title: 'Regimental Cinema',
    bgImage: '/assets/rooms/videos_bg.png',
    path: '/videos',
    desc: 'Watch documentary films, historical reenactments, and training footages of the unit.',
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
      className={`absolute pointer-events-none opacity-45 group-hover:opacity-90 transition-opacity duration-300 z-20 ${isTop ? 'top-2.5' : 'bottom-2.5'
        } ${isLeft ? 'left-2.5' : 'right-2.5'
        }`}
      style={{
        transform: `${isTop ? '' : 'scaleY(-1)'} ${isLeft ? '' : 'scaleX(-1)'}`
      }}
    >
      <path d="M 0,14 L 0,0 L 14,0 M 4,4 L 0,0" stroke="#C69B53" strokeWidth="1.2" fill="none" />
    </svg>
  );
};

// Reusable card component
const ExhibitionCard = ({ room, fullPath, cardCount, isCompact = false }: { room: any, fullPath: string, cardCount: number, isCompact?: boolean }) => {
  const titleParts = room.title.split('&');
  const titleElement = titleParts.length === 2 ? (
    <>
      {titleParts[0].trim()}
      <br />
      <span className="text-[#C69B53]">&</span> {titleParts[1].trim()}
    </>
  ) : room.title;

  return (
    <Link to={fullPath} className="group block h-full w-full">
      <div
        className="relative overflow-hidden flex flex-col items-center text-center transition-all duration-700 hover:border-[#C69B53]/60 hover:-translate-y-2 border border-[#C69B53]/30 h-full w-full rounded-xl bg-[#0B0B09] ring-1 ring-inset ring-[#C69B53]/10 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        style={{
          padding: isCompact ? '16px 14px' : (cardCount > 8 ? '12px' : (cardCount > 5 && cardCount <= 8) ? '16px' : '16px 20px 16px'),
        }}
      >
        {/* Background Artwork */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110 z-0"
          style={{ backgroundImage: `url("${room.bgImage}")` }}
        />
        
        {/* Dark Overlays to ensure text readability */}
        <div className="absolute inset-0 bg-[#0a0f05]/55 z-0 transition-opacity duration-700 group-hover:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0B09_100%)] opacity-80 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,160,23,0.2)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none mix-blend-screen" />

        {/* Ornamental Corners */}
        <CardCorner position="tl" />
        <CardCorner position="tr" />
        <CardCorner position="bl" />
        <CardCorner position="br" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
          {/* Top Label */}
          <div className="flex flex-col items-center pt-2">
            <span className="font-cinzel text-[#C69B53] text-[10px] tracking-[0.25em] font-bold uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {room.room}
            </span>
            <div className="flex justify-center mt-2 opacity-80">
              <div className="w-1.5 h-1.5 rotate-45 bg-[#C69B53] shadow-[0_0_5px_rgba(198,155,83,0.5)]" />
            </div>
          </div>

          {/* Room Title */}
          <h3 className={`font-cinzel text-white font-bold tracking-widest leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-auto mb-auto ${isCompact ? 'text-[17px]' : (cardCount > 8 ? 'text-sm' : (cardCount > 5 && cardCount <= 8) ? 'text-[15px]' : 'text-[19px]')
            }`}>
            {titleElement}
          </h3>

          {/* Description */}
          {(!isCompact && cardCount <= 8) && (
            <div className="w-full mb-4">
              <p className={`font-garamond text-[#D4D0C5] leading-relaxed text-center px-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${(cardCount > 5 && cardCount <= 8) ? 'text-[12px] line-clamp-3' : 'text-[14px] line-clamp-3'} overflow-hidden display-webkit-box webkit-box-orient-vertical`}
                 style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {room.desc}
              </p>
            </div>
          )}

          {/* Explore Button indicator */}
          <div className="flex items-center justify-center gap-2 text-[#C69B53] text-[15px] font-cinzel font-semibold tracking-[0.15em] uppercase transition-all duration-500 group-hover:text-[#F4D068] group-hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.5)] w-full pt-4 pb-1 relative overflow-hidden drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-10">
            {/* Divider line above explore button */}
            <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C69B53]/60 to-transparent transition-all duration-500 group-hover:via-[#F4D068]/90" />
            
            <span className="relative">
              Explore Exhibit
            </span>
            <span className="transform transition-transform duration-500 group-hover:translate-x-1 font-bold">
              →
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default function RoomSelector({ basePath, unitName }: Props) {
  const cardCount = EXHIBIT_ROOMS.length;

  // Define fixed card dimensions based on density to avoid percentage rounding errors
  let cardWidth = '290px';
  let cardHeight = '420px';

  if (cardCount <= 2) {
    cardWidth = '400px';
    cardHeight = '460px';
  } else if (cardCount <= 4) {
    cardWidth = '320px';
    cardHeight = '400px';
  } else if (cardCount <= 5) {
    cardWidth = '275px';
    cardHeight = '320px';
  } else if (cardCount <= 12) {
    cardWidth = '260px';
    cardHeight = '360px';
  } else {
    cardWidth = '240px';
    cardHeight = '320px';
  }

  return (
    <section className="relative flex-1 min-h-0 flex flex-col justify-center py-4 px-8 select-none w-full bg-transparent z-10">
      {/* Directory Title Section */}
      <div className="flex flex-col items-center text-center mb-6 flex-shrink-0 -mt-8">
        <span className="font-cinzel text-[#C69B53] text-[13px] tracking-[6px] uppercase font-bold mb-4 drop-shadow-sm">
          EXHIBITION DIRECTORY
        </span>
        <h2 className="font-cinzel text-white text-3xl font-bold tracking-wider mb-6 drop-shadow-lg">
          {unitName} Exhibition Rooms
        </h2>
        {/* Decorative engraved divider */}
        <img
          src="/assets/navbar/logo-divider.svg"
          className="w-[120px] h-[12px] opacity-75 mt-0.5 pointer-events-none drop-shadow-sm"
          alt=""
        />
      </div>

      {/* Directory Adaptive Flex Wrapper */}
      <div className="w-full flex items-center justify-center pb-4" style={{ marginTop: '48px' }}>

        {/* Desktop flex-nowrap gallery to prevent wrapping (force 5 cards in 1 row) */}
        <div
          className="hidden lg:flex flex-nowrap justify-center items-stretch mx-auto"
          style={{
            gap: '24px',
            width: '100%',
          }}
        >
          {EXHIBIT_ROOMS.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: 'easeOut' }}
              className="flex-shrink-0"
              style={{
                width: cardWidth,
                height: cardHeight,
              }}
            >
              <ExhibitionCard room={room} fullPath={`${basePath}${room.path}`} cardCount={cardCount} />
            </motion.div>
          ))}
        </div>

        {/* Tablet view (2-column scrollable grid) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 w-full h-fit max-h-[480px] overflow-y-auto px-4 py-2 scrollbar-none">
          {EXHIBIT_ROOMS.map((room) => (
            <div key={room.id} className="h-[280px]">
              <ExhibitionCard room={room} fullPath={`${basePath}${room.path}`} cardCount={cardCount} isCompact={true} />
            </div>
          ))}
        </div>

        {/* Mobile View (Horizontally swipeable flex slider) */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-5 w-full py-4 px-4 scrollbar-none">
          {EXHIBIT_ROOMS.map((room) => (
            <div key={room.id} className="flex-shrink-0 w-[260px] h-[340px] snap-center">
              <ExhibitionCard room={room} fullPath={`${basePath}${room.path}`} cardCount={cardCount} isCompact={false} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
