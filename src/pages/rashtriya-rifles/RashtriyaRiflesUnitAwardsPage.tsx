import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';
import { rashtriyaRiflesData } from '../../data/rashtriya-rifles';

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
      <AchievementsSection achievements={rashtriyaRiflesData.achievements || []} />
    </SubPageLayout>
  );
}