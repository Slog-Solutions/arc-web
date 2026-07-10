// src/components/layout/SubPageLayout.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  metaTitle?: string;
  metaDesc?: string;
  breadcrumbs: Breadcrumb[];
  backPath: string;
  children: React.ReactNode;
}

export default function SubPageLayout({
  title,
  subtitle,
  metaTitle,
  metaDesc,
  breadcrumbs,
  backPath,
  children,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-32 relative overflow-hidden"
      style={{ background: '#0a0c08', paddingTop: '180px' }}
    >
      <Helmet>
        <title>{metaTitle || `${title} | Assam Regimental Centre`}</title>
        <meta name="description" content={metaDesc || `View ${title} in the Assam Regimental Centre digital museum.`} />
      </Helmet>

      {/* Decorative background grid/spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.06)_0%,_transparent_75%)] pointer-events-none z-0" />

      <div className="museum-container relative z-10">
        {/* Navigation & Breadcrumbs Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2212]/50 pb-8 mb-20">
          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-2 text-stone-500 font-inter text-xs tracking-wider uppercase">
            <Link to="/" className="hover:text-yellow-500 transition-colors duration-200">Home</Link>
            {breadcrumbs.map((bc, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="text-[#d4a017]/50">/</span>
                {bc.path ? (
                  <Link to={bc.path} className="hover:text-yellow-500 transition-colors duration-200">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-stone-300 font-medium">{bc.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Premium Back Button */}
          <Link to={backPath} className="group flex items-center gap-2.5 px-4 py-2 border border-[#8a6820]/40 rounded-lg bg-gradient-to-r from-[#141a0d] to-[#0a0c08] shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:border-yellow-500/80 transition-all duration-300">
            <svg
              className="w-4 h-4 text-yellow-500 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-cinzel text-xs text-yellow-500 group-hover:text-yellow-400 tracking-widest uppercase">
              Exit Exhibition
            </span>
          </Link>
        </div>

        {/* Section Title Ornament */}
        <div className="text-center mb-20">
          {subtitle && (
            <span className="font-cinzel text-[10px] text-yellow-600/80 tracking-[0.4em] uppercase block mb-6">
              {subtitle}
            </span>
          )}
          <h1 className="font-cinzel text-stone-100 text-3xl md:text-5xl font-bold tracking-wider mb-8">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a017]" />
            <div className="w-2.5 h-2.5 border border-yellow-500/60 rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-yellow-500" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a017]" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative mt-16">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
