// src/components/layout/ScrollProgress.tsx
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left h-0.5"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #d4a017, #f0ca50, #c8820a)',
      }}
    />
  );
}
