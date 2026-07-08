// src/pages/ARCPage.tsx
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import RoomSelector from '../components/sections/RoomSelector';

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

      <HeroSection
        title={
          <>
            Assam Regimental Centre
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#d4a017] font-cinzel tracking-wider mt-4 block">BISHNU MUSEUM</span>
          </>
        }
        subtitle="Happy Valley, Shillong · Meghalaya"
        motto="Asam Vikram"
        mottoMeaning="Unique Valour"
        established="1941"
        badge="Est. 15 June 1941"
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
