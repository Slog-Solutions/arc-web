import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { arunachalScoutsData } from '../../data/arunachal-scouts';

export default function ArunachalScoutsUnitAwardsPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/arunachal-scouts" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/arunachal-scouts/${unit.id}` },
    { label: 'Awards & Achievements' },
  ];

  return (
    <SubPageLayout
      title="Honours & Awards"
      breadcrumbs={breadcrumbs}
      backPath={`/arunachal-scouts/${unit.id}`}
    >
      <AchievementsSection achievements={arunachalScoutsData.achievements || []} />
    </SubPageLayout>
  );
}