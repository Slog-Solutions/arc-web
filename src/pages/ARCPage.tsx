// src/pages/ARCPage.tsx — Main Home page
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import HistorySection from '../components/sections/HistorySection';
import CommandingOfficersSection from '../components/sections/CommandingOfficersSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import GallerySection from '../components/sections/GallerySection';
import VideosSection from '../components/sections/VideosSection';
import SectionNav from '../components/layout/SectionNav';
import SectionHeader from '../components/sections/SectionHeader';
import { arcData } from '../data/arc';

const unitCards = [
  {
    id: 'assam-rifles',
    title: 'Assam Rifles',
    path: '/assam-rifles',
    est: '1835',
    role: 'Oldest Paramilitary Force',
    motto: '"Sentinels of the North East"',
    icon: '🦅',
    image: '/assami/17 Assam Rifles/ar-patrol-green.jpg',
    description: 'India\'s oldest paramilitary force, established in 1835, guarding 1,643 km of the Indo-Myanmar border and maintaining peace across the seven sister states of Northeast India.',
  },
  {
    id: 'arunachal-scouts',
    title: 'Arunachal Scouts',
    path: '/arunachal-scouts',
    est: '2010',
    role: 'Mountain Infantry Regiment',
    motto: '"Prabal Parakram"',
    icon: '⛰️',
    image: '/assami/Arunachal Scouts/scouts-border-patrol.jpg',
    description: 'Recruited from 26+ indigenous tribes of Arunachal Pradesh, these mountain warriors guard India\'s most sensitive border with China at altitudes exceeding 17,000 feet.',
  },
  {
    id: 'rashtriya-rifles',
    title: 'Rashtriya Rifles',
    path: '/rashtriya-rifles',
    est: '1990',
    role: "India's Premier COIN Force",
    motto: '"Duty, Integrity, Honour"',
    icon: '🛡️',
    image: '/assami/Rashtriya Rifles/rr-ops-kashmir.jpg',
    description: 'India\'s premier counter-insurgency force, with 65+ battalions deployed across Jammu & Kashmir, earning 1,500+ gallantry awards in three decades of operations.',
  },
  {
    id: 'territorial-army',
    title: 'Territorial Army',
    path: '/territorial-army',
    est: '1949',
    role: 'Citizen-Soldier Reserve Force',
    motto: '"Savdhani Va Shoorta"',
    icon: '🇮🇳',
    image: '/assami/Territorial Army/ta-parade-assam.jpg',
    description: 'Unique citizen-soldier reserve force where professionals — engineers, doctors, lawyers — train alongside their careers to defend the nation when called upon.',
  },
];

export default function ARCPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Assam Regimental Centre | Home</title>
        <meta name="description" content="The official digital heritage museum of the Assam Regimental Centre, Shillong — India's premier Northeast military regiment established in 1941." />
      </Helmet>

      <SectionNav />

      {/* Hero — use best ARC photo that complements dark bg */}
      <HeroSection
        title="Assam Regimental Centre"
        subtitle="Happy Valley, Shillong · Meghalaya"
        motto="Asam Vikram"
        mottoMeaning="Unique Valour"
        established="1941"
        badge="Est. 15 June 1941"
        backgroundImage="/assami/Assam Regimental Centre/arc-passing-out-parade.jpg"
      />

      {/* Affiliated Units Showcase */}
      <section className="relative py-32 museum-room-wall spotlight-glow">
        <div className="museum-container">
          <SectionHeader
            tag="Exhibition Rooms"
            title="Affiliated Units"
            subtitle="Explore the individual history, heritage, achievements and media files of our four affiliated commands."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {unitCards.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
              >
                <Link to={unit.path} className="group block h-full">
                  <div className="museum-wood-frame brass-corners rounded-2xl overflow-hidden h-full flex flex-col hover:border-yellow-500/40 hover:shadow-[0_0_40px_rgba(212,160,23,0.25)] transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image (occupies 70%) */}
                    <div className="relative img-zoom-container flex-shrink-0" style={{ height: '300px' }}>
                      <img src={unit.image} alt={unit.title} className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d120a] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 text-4xl filter drop-shadow-md">{unit.icon}</div>
                      
                      {/* Small museum badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="font-inter text-[9px] tracking-widest uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded">
                          Exhibit No. 0{i + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content (at bottom) */}
                    <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-[#141a0d] to-[#0a0c08] border-t border-[#443118]/50">
                      <div className="font-inter text-[10px] text-yellow-600/70 tracking-widest uppercase mb-1">Est. {unit.est}</div>
                      <h3 className="font-cinzel text-stone-100 text-lg md:text-xl mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                        {unit.title}
                      </h3>
                      <div className="font-inter text-[11px] text-stone-500 mb-3">{unit.role}</div>
                      <p className="font-garamond text-stone-400 text-sm leading-relaxed mb-6 flex-1">{unit.description}</p>
                      
                      <div className="flex items-center gap-2 text-yellow-500/70 text-xs font-inter tracking-widest uppercase group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                        <span>Enter Exhibit</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARC History Section */}
      <div className="room-divider">
        <div className="room-divider-line" />
        <div className="room-divider-flourish">
          <span>✦</span>
          <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Room I · Heritage & Chronology</span>
          <span>✦</span>
        </div>
        <div className="room-divider-line" />
      </div>

      <HistorySection
        overview={arcData.history.overview}
        paragraphs={arcData.history.paragraphs}
        timeline={arcData.history.timeline}
        quotes={arcData.history.quotes}
        highlights={arcData.history.highlights}
        heroImage="/assami/Assam Regimental Centre/arc-raising-day.jpg"
      />

      <div className="room-divider">
        <div className="room-divider-line" />
        <div className="room-divider-flourish">
          <span>✦</span>
          <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Room II · Portrait Gallery</span>
          <span>✦</span>
        </div>
        <div className="room-divider-line" />
      </div>

      {/* CO Section */}
      <CommandingOfficersSection
        officers={arcData.commandingOfficers}
        gaonBuras={arcData.gaonBuras}
      />

      <div className="room-divider">
        <div className="room-divider-line" />
        <div className="room-divider-flourish">
          <span>✦</span>
          <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Room III · Hall of Honour</span>
          <span>✦</span>
        </div>
        <div className="room-divider-line" />
      </div>

      {/* Achievements */}
      <AchievementsSection
        achievements={arcData.achievements}
        highlights={arcData.history.highlights}
      />

      <div className="room-divider">
        <div className="room-divider-line" />
        <div className="room-divider-flourish">
          <span>✦</span>
          <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Room IV · Photography Archives</span>
          <span>✦</span>
        </div>
        <div className="room-divider-line" />
      </div>

      {/* Gallery */}
      <GallerySection gallery={arcData.gallery} />

      <div className="room-divider">
        <div className="room-divider-line" />
        <div className="room-divider-flourish">
          <span>✦</span>
          <span className="font-cinzel text-xs tracking-[0.35em] uppercase">Exhibition Room V · Regimental Cinema</span>
          <span>✦</span>
        </div>
        <div className="room-divider-line" />
      </div>

      {/* Videos */}
      <VideosSection videos={arcData.videos} />
    </motion.div>
  );
}
