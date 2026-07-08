import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { territorialArmyData } from '../../data/territorial-army';

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
      <AchievementsSection achievements={territorialArmyData.achievements || []} />
    </SubPageLayout>
  );
}