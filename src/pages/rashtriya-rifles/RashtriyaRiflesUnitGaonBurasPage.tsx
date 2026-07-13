import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function RashtriyaRiflesUnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/rashtriya-rifles" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/rashtriya-rifles/${unit.id}` },
    { label: 'Gaon Buras' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras (Commanders)"
      breadcrumbs={breadcrumbs}
      backPath={`/rashtriya-rifles/${unit.id}`}
    >
      <CommandingOfficersSection officers={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).commandingOfficers || []} gaonBuras={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).gaonBuras || []} />
    </SubPageLayout>
  );
}