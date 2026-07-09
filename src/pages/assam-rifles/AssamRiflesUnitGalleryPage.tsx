// src/pages/assam-rifles/AssamRiflesUnitGalleryPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { ASSAM_RIFLES_UNITS } from '../AssamRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function AssamRiflesUnitGalleryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = ASSAM_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) {
    return <Navigate to="/assam-rifles" replace />;
  }

  const breadcrumbs = [
    { label: 'Assam Units', path: '/assam-rifles' },
    { label: unit.shortName, path: `/assam-rifles/${unit.id}` },
    { label: 'Photography Archives' },
  ];

  return (
    <SubPageLayout
      title={`${unit.shortName} Photography Archives`}
      subtitle="Exhibition Room IV"
      metaTitle={`${unit.shortName} Gallery | Assam Units`}
      metaDesc={`Browse the image archives of the ${unit.name} including field ops, patrols, and community work.`}
      breadcrumbs={breadcrumbs}
      backPath={`/assam-rifles/${unit.id}`}
    >
      <GallerySection gallery={(getMergedSubUnitData('assam-rifles', unitId || '')).gallery} />
    </SubPageLayout>
  );
}
