import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function TerritorialArmyUnitAwardsPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title="Honours & Awards"
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <div className="w-full flex justify-center px-4" style={{ marginBottom: '40px' }}>
        <div className="text-center w-full max-w-4xl font-garamond text-stone-400 text-lg md:text-xl leading-relaxed italic">
          &ldquo;Throughout their service, the personnel of the {unit.name} have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below.&rdquo;
        </div>
      </div>
      <AchievementsSection achievements={(getMergedSubUnitData('territorial-army', unitId || '')).achievements || []} />
      <div style={{ height: '40px' }} />
    </SubPageLayout>
  );
}