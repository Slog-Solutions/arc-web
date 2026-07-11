// src/pages/assam-rifles/AssamRiflesUnitPage.tsx — Viewport Constrained Layout
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/sections/HeroSection';
import RoomSelector from '../../components/sections/RoomSelector';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';

export default function AssamRiflesUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex flex-col bg-[#0C120D]"
    >
      <Helmet>
        <title>{unit.shortName} | Assam Units Digital Museum</title>
        <meta name="description" content={`Enter the digital archive of the ${unit.name} to view its history, awards, commanders, and galleries.`} />
      </Helmet>

      <HeroSection
        compact={true}
        title={unit.name}
        subtitle={`Established: ${unit.established} · Location: ${unit.location}`}
        backgroundImage="/assami/17 Assam Rifles/ar-patrol-green.jpg"
        backgroundImages={[
          "/assami/17 Assam Rifles/ar-patrol-green.jpg",
          "/assami/17 Assam Rifles/ar-border-patrol.jpg",
          "/assami/17 Assam Rifles/ar-heritage-sentinel.jpg",
          "/assami/17 Assam Rifles/ar-joint-training.jpg",
          "/assami/17 Assam Rifles/ar-community-friends.jpg"
        ]}
      />

      <RoomSelector basePath={`/assam-rifles/${unit.id}`} unitName={unit.name} />
    </motion.div>
  );
}
