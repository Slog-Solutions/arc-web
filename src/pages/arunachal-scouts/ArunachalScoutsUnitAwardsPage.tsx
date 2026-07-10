import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import AchievementsSection from '../../components/sections/AchievementsSection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

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
      <div className="w-full flex justify-center px-4" style={{ marginBottom: '40px' }}>
        <div className="text-center w-full max-w-4xl font-garamond text-stone-400 text-lg md:text-xl leading-relaxed italic">
          &ldquo;Throughout their service in the Northeast border sectors, the personnel of the {unit.name} have maintained the highest standards of operational efficiency and combat readiness, contributing directly to the achievements listed below.&rdquo;
        </div>
      </div>
      <AchievementsSection achievements={(getMergedSubUnitData('arunachal-scouts', unitId || '')).achievements || []} />
      <div style={{ height: '40px' }} />
    </SubPageLayout>
  );
}