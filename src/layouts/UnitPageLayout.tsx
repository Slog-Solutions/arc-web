// src/layouts/UnitPageLayout.tsx — REFINED (Museum Room Transitions)
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import HistorySection from '../components/sections/HistorySection';
import CommandingOfficersSection from '../components/sections/CommandingOfficersSection';
import GallerySection from '../components/sections/GallerySection';
import VideosSection from '../components/sections/VideosSection';
import SectionNav from '../components/layout/SectionNav';
import type { UnitData } from '../types';

interface Props {
  data: UnitData;
  heroImage?: string;
  heroImages?: string[];
  badge?: string;
  historyImage?: string;
}

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

// Premium Room Divider to transition between museum halls
function RoomDivider({ title }: { title: string }) {
  return (
    <div className="room-divider">
      <div className="room-divider-line" />
      <div className="room-divider-flourish">
        <span>✦</span>
        <span className="font-cinzel text-xs tracking-[0.35em] uppercase">{title}</span>
        <span>✦</span>
      </div>
      <div className="room-divider-line" />
    </div>
  );
}

export default function UnitPageLayout({ data, heroImage, heroImages, badge, historyImage }: Props) {
  const { meta, history, commandingOfficers, gaonBuras, gallery, videos } = data;

  const title = typeof meta.name === 'string' ? meta.name : '';
  const motto = typeof meta.motto === 'string' ? meta.motto : undefined;
  const mottoMeaning = typeof meta.mottoMeaning === 'string' ? meta.mottoMeaning : undefined;
  const established = typeof meta.established === 'string' ? meta.established : undefined;
  const location = typeof meta.location === 'string' ? meta.location : typeof meta.headquarters === 'string' ? meta.headquarters : undefined;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>{title} | Assam Regimental Centre</title>
        <meta name="description" content={`Learn about the ${title} — history, commanding officers, achievements, gallery and videos.`} />
      </Helmet>

      <SectionNav />

      {/* Hero entrance hall */}
      <HeroSection
        title={title}
        subtitle={location}
        motto={motto}
        mottoMeaning={mottoMeaning}
        established={established?.replace('15 June ', '').replace('October 1, ', '').replace('October 9, ', '').replace('9 November ', '')}
        backgroundImage={heroImage}
        backgroundImages={heroImages}
        badge={badge}
      />

      <RoomDivider title="Exhibition Room I · Heritage & Chronology" />

      <HistorySection
        overview={history.overview}
        paragraphs={history.paragraphs}
        timeline={history.timeline}
        quotes={history.quotes}
        highlights={history.highlights}
        heroImage={historyImage}
      />

      <RoomDivider title="Exhibition Room II · Portrait Gallery" />

      <CommandingOfficersSection
        officers={commandingOfficers}
        gaonBuras={gaonBuras}
      />

      <RoomDivider title="Exhibition Room III · Photography Archives" />

      <GallerySection gallery={gallery} />

      <RoomDivider title="Exhibition Room IV · Regimental Cinema" />

      <VideosSection videos={videos} />
    </motion.div>
  );
}
