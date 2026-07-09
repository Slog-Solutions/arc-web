import { useParams, Navigate } from 'react-router-dom';
import SubPageLayout from '../../components/layout/SubPageLayout';
import GallerySection from '../../components/sections/GallerySection';
import { RASHTRIYA_RIFLES_UNITS } from '../RashtriyaRiflesPage';
import { getMergedSubUnitData } from '../../admin/store/adminStore';

export default function RashtriyaRiflesUnitGalleryPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = RASHTRIYA_RIFLES_UNITS.find((u) => u.id === unitId);

  if (!unit) return <Navigate to="/rashtriya-rifles" replace />;

  const breadcrumbs = [
    { label: unit.shortName, path: `/rashtriya-rifles/${unit.id}` },
    { label: 'Photo Gallery' },
  ];

  return (
    <SubPageLayout
      title="Photo Gallery"
      breadcrumbs={breadcrumbs}
      backPath={`/rashtriya-rifles/${unit.id}`}
    >
      <GallerySection gallery={(getMergedSubUnitData('rashtriya-rifles', unitId || '')).gallery || []} />
    </SubPageLayout>
  );
}