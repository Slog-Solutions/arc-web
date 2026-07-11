// src/pages/ARCPage.tsx — Premium Museum Plaque Redesign (Adaptive Viewport Layout)
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ARCHero from '../components/sections/heroes/ARCHero';
import RoomSelector from '../components/sections/RoomSelector';

export default function ARCPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex flex-col bg-transparent"
    >
      <Helmet>
        <title>Assam Regimental Centre | Home</title>
        <meta name="description" content="The official digital heritage museum of the Assam Regimental Centre, Shillong — India's premier Northeast military regiment established in 1941." />
      </Helmet>

      <ARCHero
        compact={true}
        title="Assam Regimental Centre"
        subtitle="Happy Valley, Shillong · Meghalaya"
        established="1941"
        backgroundImage="/assami/Assam Regimental Centre/arc-passing-out-parade.jpg"
        backgroundImages={[
          "/assami/Assam Regimental Centre/arc-passing-out-parade.jpg",
          "/assami/Assam Regimental Centre/arc-raising-day.jpg",
          "/assami/Assam Regimental Centre/arc-training-recruits.jpg",
          "/assami/Assam Regimental Centre/arc-museum-lobby.jpg",
          "/assami/Assam Regimental Centre/arc-regimental-flag.jpg"
        ]}
      />

      {/* Main Exhibition Halls Directory (5 Buttons Panel) */}
      <RoomSelector basePath="/arc" unitName="Assam Regimental Centre" />
    </motion.div>
  );
}
