// src/pages/assam-rifles/AssamRiflesUnitGaonBurasPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function AssamRiflesUnitGaonBurasPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  const breadcrumbs = [
    { label: 'Assam Units', path: '/assam-rifles' },
    { label: unit.shortName, path: `/assam-rifles/${unit.id}` },
    { label: 'Gaon Buras & Officers' },
  ];

  return (
    <SubPageLayout
      title={`${unit.shortName} Gaon Buras & Officers`}
      subtitle="Exhibition Room III"
      metaTitle={`${unit.shortName} Commanders & Elders | Assam Units`}
      metaDesc={`Read profiles of commanding officers and community leaders who liaised with the ${unit.name}.`}
      breadcrumbs={breadcrumbs}
      backPath={`/assam-rifles/${unit.id}`}
    >
      <CommandingOfficersSection
        officers={(getMergedSubUnitData('assam-rifles', unitId || '')).commandingOfficers}
        gaonBuras={(getMergedSubUnitData('assam-rifles', unitId || '')).gaonBuras}
      />
    </SubPageLayout>
  );
}
