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
      <section className="relative py-24" style={{ background: '#0a0c08' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionHeader
            tag="The ARC Family"
            title="Affiliated Units"
            subtitle="Four distinguished forces operating under the stewardship of the Assam Regimental Centre."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {unitCards.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link to={unit.path} className="group block h-full">
                  <div className="heritage-card rounded-xl overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative img-zoom-container flex-shrink-0" style={{ height: '240px' }}>
                      <img src={unit.image} alt={unit.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 hero-overlay-dark" />
                      <div className="absolute top-4 left-4 text-3xl">{unit.icon}</div>
                      <div className="absolute bottom-4 left-4">
                        <div className="font-inter text-xs text-yellow-500/80 tracking-widest">Est. {unit.est}</div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-cinzel text-stone-100 text-lg mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                        {unit.title}
                      </h3>
                      <div className="font-inter text-xs text-stone-500 mb-2">{unit.role}</div>
                      <div className="font-garamond text-yellow-600/70 text-sm italic mb-3">{unit.motto}</div>
                      <p className="font-inter text-stone-400 text-xs leading-relaxed mb-4 flex-1">{unit.description}</p>
                      <div className="flex items-center gap-2 text-yellow-500/70 text-xs font-inter tracking-wider group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                        <span>Explore</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <HistorySection
        overview={arcData.history.overview}
        paragraphs={arcData.history.paragraphs}
        timeline={arcData.history.timeline}
        quotes={arcData.history.quotes}
        highlights={arcData.history.highlights}
        heroImage="/assami/Assam Regimental Centre/arc-raising-day.jpg"
      />

      <div className="divider-gold" />

      {/* CO Section */}
      <CommandingOfficersSection
        officers={arcData.commandingOfficers}
        gaonBuras={arcData.gaonBuras}
      />

      <div className="divider-gold" />

      {/* Achievements */}
      <AchievementsSection
        achievements={arcData.achievements}
        highlights={arcData.history.highlights}
      />

      <div className="divider-gold" />

      {/* Gallery */}
      <GallerySection gallery={arcData.gallery} />

      <div className="divider-gold" />

      {/* Videos */}
      <VideosSection videos={arcData.videos} />
    </motion.div>
  );
}
