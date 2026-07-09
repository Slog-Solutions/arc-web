// src/pages/arunachal-scouts/ArunachalScoutsUnitPage.tsx — Viewport Constrained Layout
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/sections/HeroSection';
import RoomSelector from '../../components/sections/RoomSelector';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';

export default function ArunachalScoutsUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/arunachal-scouts" replace />;
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
        <title>{unit.shortName} | Digital Museum</title>
      </Helmet>

      <HeroSection
        compact={true}
        title={unit.name}
        subtitle={`Established: ${unit.established} · Location: ${unit.location}`}
        motto="Valour and Honor"
        established={unit.established}
        backgroundImage="/assami/Arunachal Scouts/scouts-border-patrol.jpg"
        backgroundImages={[
          "/assami/Arunachal Scouts/scouts-border-patrol.jpg",
          "/assami/Arunachal Scouts/scouts-high-altitude.jpg",
          "/assami/Arunachal Scouts/scouts-raising-ceremony.jpg",
          "/assami/Arunachal Scouts/scouts-sons-of-soil.jpg"
        ]}
        badge={`${unit.shortName} Exhibition — Est. ${unit.established}`}
      />

      <RoomSelector basePath={`/arunachal-scouts/${unit.id}`} unitName={unit.name} />
    </motion.div>
  );
}