// src/pages/arc/ARCAwardsPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { getUnitData } from '../../admin/store/adminStore';

export default function ARCAwardsPage() {
  const breadcrumbs = [
    { label: 'Assam Regimental Centre', path: '/arc' },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title="Awards & Achievements"
      subtitle="Exhibition Room II"
      metaTitle="Awards & Achievements | Assam Regimental Centre"
      metaDesc="Explore the medals, gallantry honors, battle honors, and historic trophies awarded to the Assam Regimental Centre."
      breadcrumbs={breadcrumbs}
      backPath="/arc"
    >
      <div className="w-full flex justify-center px-4" style={{ marginBottom: '40px' }}>
        <div className="text-center w-full max-w-4xl font-garamond text-stone-400 text-lg md:text-xl leading-relaxed italic">
          &ldquo;Throughout their service, the personnel of the Assam Regimental Centre have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below.&rdquo;
        </div>
      </div>
      <AchievementsSection achievements={getUnitData('arc').achievements} />
      <div style={{ height: '40px' }} />
    </SubPageLayout>
  );
}
