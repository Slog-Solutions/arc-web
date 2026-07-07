// src/pages/HomeScreen.tsx
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function HomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-full relative overflow-hidden"
    >
      <Helmet>
        <title>Assam Regiment | Digital Museum</title>
        <meta name="description" content="Welcome to the Assam Regiment Digital Museum." />
      </Helmet>

      {/* Background Image: the image is set to cover the top area exactly so the navbar fits */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: 'url("/assami/home screen.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center -40px',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </motion.div>
  );
}
