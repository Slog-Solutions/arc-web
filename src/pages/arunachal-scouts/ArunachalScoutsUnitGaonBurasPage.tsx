import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { arunachalScoutsData } from '../../data/arunachal-scouts';

export default function ArunachalScoutsUnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ARUNACHAL_SCOUTS_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/arunachal-scouts" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/arunachal-scouts/${unit.id}` },
    { label: 'Gaon Buras' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras (Commanders)"
      breadcrumbs={breadcrumbs}
      backPath={`/arunachal-scouts/${unit.id}`}
    >
      <CommandingOfficersSection officers={arunachalScoutsData.commandingOfficers || []} gaonBuras={arunachalScoutsData.gaonBuras || []} />
    </SubPageLayout>
  );
}