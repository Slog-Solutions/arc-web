// src/pages/territorial-army/TerritorialArmyUnitPage.tsx — Viewport Constrained Layout
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/sections/HeroSection';
import RoomSelector from '../../components/sections/RoomSelector';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';

export default function TerritorialArmyUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/territorial-army" replace />;
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
        backgroundImage="/assami/Territorial Army/ta-parade-assam.jpg"
        backgroundImages={[
          "/assami/Territorial Army/ta-parade-assam.jpg",
          "/assami/Territorial Army/ta-annual-camp.jpg",
          "/assami/Territorial Army/ta-field-ops.jpg",
          "/assami/Territorial Army/ta-medical-camp.jpg"
        ]}
        badge={`${unit.shortName} Exhibition — Est. ${unit.established}`}
      />

      <RoomSelector basePath={`/territorial-army/${unit.id}`} unitName={unit.name} />
    </motion.div>
  );
}