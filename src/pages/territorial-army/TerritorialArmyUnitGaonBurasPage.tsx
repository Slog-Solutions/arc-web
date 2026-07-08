import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { TERRITORIAL_ARMY_UNITS } from '../TerritorialArmyPage';
import { territorialArmyData } from '../../data/territorial-army';

export default function TerritorialArmyUnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = TERRITORIAL_ARMY_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/territorial-army" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/territorial-army/${unit.id}` },
    { label: 'Gaon Buras' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras (Commanders)"
      breadcrumbs={breadcrumbs}
      backPath={`/territorial-army/${unit.id}`}
    >
      <CommandingOfficersSection officers={territorialArmyData.commandingOfficers || []} gaonBuras={territorialArmyData.gaonBuras || []} />
    </SubPageLayout>
  );
}