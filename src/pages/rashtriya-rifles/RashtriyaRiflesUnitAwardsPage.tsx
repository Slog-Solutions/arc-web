import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function RashtriyaRiflesUnitAwardsPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/rashtriya-rifles" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/rashtriya-rifles/${unit.id}` },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title="Honours & Awards"
      breadcrumbs={breadcrumbs}
      backPath={`/rashtriya-rifles/${unit.id}`}
    >
      <div className="w-full flex justify-center px-4" style={{ marginBottom: '40px' }}>
        <div className="text-center w-full max-w-4xl font-garamond text-stone-400 text-lg md:text-xl leading-relaxed italic">
          &ldquo;Throughout their service in the Northeast border sectors, the personnel of the {unit.name} have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below.&rdquo;
        </div>
      </div>
      <AchievementsSection achievements={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).achievements || []} />
      <div style={{ height: '40px' }} />
    </SubPageLayout>
  );
}