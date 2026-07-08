// src/components/sections/RoomSelector.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

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
    desc: 'Explore the origins, major campaigns, battles, and chronological history of the regiment.',
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

export default function RoomSelector({ basePath, unitName }: Props) {
  return (
    <section className="relative pt-20 pb-40 section-pattern">
      <div className="museum-container">
        <SectionHeader
          tag="Exhibits Directory"
          title="Exhibition Halls"
          subtitle={
            <>
              Explore the rich history and heritage of
              <br />
              {unitName} through five dedicated galleries.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 justify-center">
          {EXHIBIT_ROOMS.map((room, i) => {
            const fullPath = `${basePath}${room.path}`;
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={i === 4 && EXHIBIT_ROOMS.length % 3 !== 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Link to={fullPath} className="group block h-full">
                  <div className="museum-wood-frame brass-corners rounded-2xl overflow-hidden p-8 h-full flex flex-col hover:border-yellow-500/40 hover:shadow-[0_0_40px_rgba(212,160,23,0.25)] transition-all duration-500 transform hover:-translate-y-2">
                    
                    {/* Top row: Icon and Room Label */}
                    <div className="flex flex-col items-center justify-center mb-6 gap-3">
                      <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                        {room.icon}
                      </span>
                      <div className="font-cinzel text-[#d4a017] text-[10px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 border border-[#8a6820]/30 rounded bg-[#1a1200]">
                        {room.room}
                      </div>
                    </div>

                    {/* Room title */}
                    <h3 className="font-cinzel text-stone-100 text-xl font-bold tracking-wide mb-3 group-hover:text-yellow-400 transition-colors duration-300 text-center">
                      {room.title}
                    </h3>

                    {/* Room description */}
                    <p className="font-garamond text-stone-400 text-sm leading-relaxed mb-8 flex-grow text-center">
                      {room.desc}
                    </p>

                    {/* Action trigger */}
                    <div className="flex items-center justify-center gap-2 text-yellow-500/70 text-xs font-inter tracking-widest uppercase group-hover:text-yellow-400 transition-colors duration-300 mt-auto pb-2 w-full">
                      <span>Enter Exhibit</span>
                      <svg
                        className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
