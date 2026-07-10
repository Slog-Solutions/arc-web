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
      <div className="w-full flex justify-center px-4" style={{ marginBottom: '40px' }}>
        <div className="text-center w-full max-w-4xl font-garamond text-stone-400 text-lg md:text-xl leading-relaxed italic">
          &ldquo;Throughout their service in the Northeast border sectors, the personnel of the {unit.name} have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below.&rdquo;
        </div>
      </div>
      <AchievementsSection achievements={(getMergedSubUnitData('assam-rifles', unitId || '')).achievements} />
      <div style={{ height: '40px' }} />
    </SubPageLayout>
  );
}
