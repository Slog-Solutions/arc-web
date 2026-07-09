// src/pages/assam-rifles/AssamRiflesUnitAwardsPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function AssamRiflesUnitAwardsPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  const breadcrumbs = [
    { label: 'Assam Units', path: '/assam-rifles' },
    { label: unit.shortName, path: `/assam-rifles/${unit.id}` },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title={`${unit.shortName} Awards & Achievements`}
      subtitle="Exhibition Room II"
      metaTitle={`${unit.shortName} Awards | Assam Units`}
      metaDesc={`Inspect the medals, gallantry honors, and border security awards associated with ${unit.name}.`}
      breadcrumbs={breadcrumbs}
      backPath={`/assam-rifles/${unit.id}`}
    >
      <div className="mb-10 text-center max-w-2xl mx-auto font-garamond text-stone-400 text-lg leading-relaxed italic">
        "Throughout their service in the Northeast border sectors, the personnel of the {unit.name} have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below."
      </div>
      <AchievementsSection achievements={(getMergedSubUnitData('assam-rifles', unitId || '')).achievements} />
    </SubPageLayout>
  );
}
