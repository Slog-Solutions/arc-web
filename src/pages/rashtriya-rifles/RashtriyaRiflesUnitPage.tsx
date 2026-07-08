import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/sections/HeroSection';
import RoomSelector from '../../components/sections/RoomSelector';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';

export default function RashtriyaRiflesUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/rashtriya-rifles" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{unit.shortName} | Digital Museum</title>
      </Helmet>

      <HeroSection
        title={unit.name}
        subtitle={`Established: ${unit.established} · Location: ${unit.location}`}
        motto="Valour and Honor"
        established={unit.established}
        backgroundImage="/assami/Rashtriya Rifles/rr-ops-kashmir.jpg"
        backgroundImages={["/assami/Rashtriya Rifles/rr-ops-kashmir.jpg","/assami/Rashtriya Rifles/rr-terrain-valley.jpg","/assami/Rashtriya Rifles/rr-mountain-warriors.jpg","/assami/Rashtriya Rifles/rr-urban-warfare.jpg"]}
        badge={`${unit.shortName} Exhibition — Est. ${unit.established}`}
      />

      <RoomSelector basePath={`/rashtriya-rifles/${unit.id}`} unitName={unit.name} />
    </motion.div>
  );
}