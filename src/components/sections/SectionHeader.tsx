// src/components/sections/SectionHeader.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  tag?: string;
  title: string;
  subtitle?: ReactNode;
  centered?: boolean;
}

export default function SectionHeader({ tag, title, subtitle: _subtitle, centered = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`${centered ? 'text-center' : ''}`}
      style={{ textAlign: centered ? 'center' : 'left', marginBottom: '4.5rem' }}
    >
      {tag && (
        <div className={`flex items-center gap-3 mb-3 ${centered ? 'justify-center' : ''}`}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600/60" />
          <span className="font-inter text-xs text-yellow-600/80 tracking-[0.35em] uppercase">{tag}</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600/60" />
        </div>
      )}
      <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-stone-100 tracking-wide">
        <span className="text-gold-gradient">{title}</span>
      </h2>
      <div className={`mt-7 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-600/80 to-yellow-600/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent via-yellow-600/80 to-yellow-600/20" />
      </div>
    </motion.div>
  );
}
