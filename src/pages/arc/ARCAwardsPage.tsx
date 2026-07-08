// src/pages/arc/ARCAwardsPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { arcData } from '../../data/arc';

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
      <AchievementsSection achievements={arcData.achievements} />
    </SubPageLayout>
  );
}
