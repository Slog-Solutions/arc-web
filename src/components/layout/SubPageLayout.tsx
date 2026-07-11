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
      style={{
        background: '#0a0c08',
        paddingTop: '180px',
      }}
    >
      <Helmet>
        <title>{metaTitle || `${title} | Assam Regimental Centre`}</title>
        <meta
          name="description"
          content={
            metaDesc ||
            `View ${title} in the Assam Regimental Centre digital museum.`
          }
        />
      </Helmet>

      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.06)_0%,_transparent_75%)] pointer-events-none z-0" />

      <div className="museum-container relative z-10">

        {/* ================= Breadcrumb & Back Button ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2212]/50 pb-8">

          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-2 md:gap-3 font-cinzel text-[11px] md:text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.12em' }}>
            <Link to="/" className="text-[#d4a017]/70 hover:text-[#f3cd69] transition-colors duration-300">
              Home
            </Link>
            {breadcrumbs.map((bc, idx) => (
              <span key={idx} className="flex items-center gap-2 md:gap-3">
                <span className="text-[#8a6820]/60">/</span>
                {bc.path ? (
                  <Link to={bc.path} className="text-[#d4a017]/70 hover:text-[#f3cd69] transition-colors duration-300">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-[#d4a017]/90 drop-shadow-[0_0_4px_rgba(212,160,23,0.3)]">
                    {bc.label}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Premium Back Button */}
          <Link 
            to={backPath} 
            className="group relative inline-flex items-center justify-center min-h-[44px] transition-colors duration-300"
          >
            {/* Outer Border (1px) */}
            <div 
              className="absolute inset-0 bg-[#8a6820]/40 group-hover:bg-[#d4a017]/80 transition-colors duration-300"
              style={{ clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)' }}
            />
            
            {/* Main Background */}
            <div 
              className="absolute inset-[1px] bg-[#0c0b08] group-hover:bg-[#110f0a] transition-colors duration-300"
              style={{ clipPath: 'polygon(5.5px 0, calc(100% - 5.5px) 0, 100% 5.5px, 100% calc(100% - 5.5px), calc(100% - 5.5px) 100%, 5.5px 100%, 0 calc(100% - 5.5px), 0 5.5px)' }}
            />

            {/* Inner Border (1px) */}
            <div 
              className="absolute inset-[3px] bg-[#8a6820]/20 group-hover:bg-[#d4a017]/40 transition-colors duration-300"
              style={{ clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}
            />
            
            {/* Inner Background */}
            <div 
              className="absolute inset-[4px] bg-[#0c0b08] group-hover:bg-[#110f0a] transition-colors duration-300"
              style={{ clipPath: 'polygon(3.5px 0, calc(100% - 3.5px) 0, 100% 3.5px, 100% calc(100% - 3.5px), calc(100% - 3.5px) 100%, 3.5px 100%, 0 calc(100% - 3.5px), 0 3.5px)' }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-2" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <span className="font-cinzel text-[13px] font-semibold text-[#d4a017]/90 group-hover:text-[#f3cd69] uppercase transition-colors duration-300 text-center whitespace-nowrap" style={{ letterSpacing: '0.12em', marginRight: '-0.12em' }}>
                Exit Exhibition
              </span>
            </div>
          </Link>
        </div>

        {/* ===================== SPACE BETWEEN BREADCRUMB & TITLE ===================== */}
        <div className="h-12 md:h-16"></div>

        {/* ================= Exhibition Heading ================= */}
        <div className="text-center mb-2">
          {subtitle && (
            <span className="font-cinzel text-[10px] text-yellow-600/80 tracking-[0.4em] uppercase block mb-6">
              {subtitle}
            </span>
          )}

          <h1 className="font-cinzel text-stone-100 text-3xl md:text-6xl font-bold tracking-wider mb-8">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a017]" />

            <div className="w-2.5 h-2.5 border border-yellow-500/60 rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-yellow-500"></div>
            </div>

            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a017]" />
          </div>
        </div>

        {/* ================= Page Content ================= */}
        <div className="relative mt-12">
          {children}
        </div>
      </div>
    </motion.div>
  );
}