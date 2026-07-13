import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function TerritorialArmyUnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'Gaon Buras Commanding Officer' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras Commanding Officer (Commanders)"
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <CommandingOfficersSection officers={(getMergedSubUnitData('territorial-army', unitId || '')).commandingOfficers || []} gaonBuras={(getMergedSubUnitData('territorial-army', unitId || '')).gaonBuras || []} />
    </SubPageLayout>
  );
}