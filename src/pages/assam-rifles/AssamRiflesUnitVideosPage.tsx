// src/pages/assam-rifles/AssamRiflesUnitVideosPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import VideosSection from '../../components/sections/VideosSection';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function AssamRiflesUnitVideosPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  const breadcrumbs = [
    { label: 'Assam Units', path: '/assam-rifles' },
    { label: unit.shortName, path: `/assam-rifles/${unit.id}` },
    { label: 'Regimental Cinema' },
  ];

  return (
    <SubPageLayout
      title={`${unit.shortName} Regimental Cinema`}
      subtitle="Exhibition Room V"
      metaTitle={`${unit.shortName} Videos | Assam Units`}
      metaDesc={`Watch video documentaries and history channels related to the ${unit.name} of the Assam Units.`}
      breadcrumbs={breadcrumbs}
      backPath={`/assam-rifles/${unit.id}`}
    >
      <VideosSection videos={(getMergedSubUnitData('assam-rifles', unitId || '')).videos} />
    </SubPageLayout>
  );
}
