// src/pages/arc/ARCGaonBurasPage.tsx
import SubPageLayout from '../../components/layout/SubPageLayout';
import CommandingOfficersSection from '../../components/sections/CommandingOfficersSection';
import { getUnitData } from '../../admin/store/adminStore';

export default function ARCGaonBurasPage() {
  const breadcrumbs = [
    { label: 'Assam Regimental Centre', path: '/arc' },
    { label: 'Gaon Buras Commanding Officer & Officers' },
  ];

  return (
    <SubPageLayout
      title="Gaon Buras Commanding Officer"
      subtitle="Exhibition Room III"
      metaTitle="Gaon Buras Commanding Officer & Officers | Assam Regimental Centre"
      metaDesc="Meet the commanding officers and traditional community elders (Gaon Buras Commanding Officer) who built and sustained the legacy of the Assam Regimental Centre."
      breadcrumbs={breadcrumbs}
      backPath="/arc"
    >
      <CommandingOfficersSection
        officers={getUnitData('arc').commandingOfficers}
        gaonBuras={getUnitData('arc').gaonBuras}
      />
    </SubPageLayout>
  );
}
