import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { ARUNACHAL_SCOUTS_UNITS } from '../ArunachalScoutsPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

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
      <CommandingOfficersSection officers={(getMergedSubUnitData('arunachal-scouts', unitId || '')).commandingOfficers || []} gaonBuras={(getMergedSubUnitData('arunachal-scouts', unitId || '')).gaonBuras || []} />
    </SubPageLayout>
  );
}